import { client } from "@/sanity/client";
import type { Product, ProductSummary, Testimonial } from "@/sanity/types";
import {
  FEATURED_TESTIMONIALS,
  MORE_PRODUCTS,
  PRODUCT_BY_SLUG,
  RELATED_PRODUCTS,
} from "@/sanity/queries";
import { ogImageUrl } from "@/sanity/image";
import ProductView from "@/components/product-view";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/site";
import { summarize } from "@/lib/utils";

export const revalidate = 60;

// cache() dedupes the call shared by generateMetadata and the page
const getProduct = cache(async (slug: string) =>
  client.fetch<Product | null>(PRODUCT_BY_SLUG, { slug }),
);

// Prebuild every product page; new products still render on first visit, then cache
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(
    `*[_type == "product" && defined(slug.current)].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}

function productDescription(product: { name: string; description?: string }) {
  return (
    summarize(product.description) ||
    `${product.name} — handcrafted forever flower arrangement by ${SITE_NAME}.`
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return { title: `Product Not Found — ${SITE_NAME}` };
  }

  const cover = product.images?.[0];
  return pageMetadata({
    title: `${product.name.trim()} — ${SITE_NAME}`,
    description: productDescription(product),
    path: `/product/${slug}`,
    // Link previews (Instagram, WhatsApp, etc.) show the product photo
    image: cover?.asset
      ? { url: ogImageUrl(cover), width: 1200, height: 630, alt: product.name.trim() }
      : undefined,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const [sameCategory, testimonials] = await Promise.all([
    product.category
      ? client.fetch<ProductSummary[]>(RELATED_PRODUCTS, { category: product.category, slug })
      : Promise.resolve([] as ProductSummary[]),
    client.fetch<Testimonial[]>(FEATURED_TESTIMONIALS),
  ]);

  // Small categories would end the page in a dead end — top up with recent pieces
  const relatedProducts =
    sameCategory.length >= 3
      ? sameCategory
      : [
          ...sameCategory,
          ...(await client.fetch<ProductSummary[]>(MORE_PRODUCTS, {
            slug,
            exclude: sameCategory.map((p) => p._id),
            limit: 3 - sameCategory.length,
          })),
        ];

  const url = `${SITE_URL}/product/${slug}`;
  // Structured data so search engines understand the product (and its INR price)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name.trim(),
    description: productDescription(product),
    image: (product.images ?? [])
      .map((img) => img.url)
      .filter(Boolean),
    brand: { "@type": "Brand", name: SITE_NAME },
    url,
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductView
        product={product}
        relatedProducts={relatedProducts}
        testimonials={testimonials.slice(0, 1)}
      />
    </>
  );
}
