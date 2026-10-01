import { client } from "@/sanity/client";
import { PRODUCT_BY_SLUG, RELATED_PRODUCTS } from "@/sanity/queries";
import ProductView from "@/components/product-view";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProduct(slug: string) {
  return client.fetch(PRODUCT_BY_SLUG, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return { title: "Product Not Found — Lovique Studio" };
  }
  return {
    title: `${product.name} — Lovique Studio`,
    description:
      product.description?.slice(0, 160) ||
      `${product.name} — handcrafted forever flower arrangement by Lovique Studio.`,
  };
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

  const relatedProducts = product.category
    ? await client.fetch(RELATED_PRODUCTS, {
        category: product.category,
        slug,
      })
    : [];

  return <ProductView product={product} relatedProducts={relatedProducts} />;
}
