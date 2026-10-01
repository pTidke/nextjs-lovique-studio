import { client } from "@/sanity/client";
import type { ProductSummary } from "@/sanity/types";
import { playfair, poppins } from "@/lib/fonts";
import { PRODUCTS_BY_CATEGORY } from "@/sanity/queries";
import { ProductCard } from "@/components/product-card";
import BrandBackground from "@/components/brand-background";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { categoryMap } from "@/lib/categories";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryMap[slug];
  const title = category?.title || "Collection";
  return pageMetadata({
    title: `${title} — Lovique Studio`,
    description:
      category?.description ||
      "Explore our curated forever flower collection at Lovique Studio.",
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await client.fetch<ProductSummary[]>(PRODUCTS_BY_CATEGORY, { category: slug });
  const category = categoryMap[slug];

  // Unknown slug with nothing in it — real 404 instead of an empty "Collection" page
  if (!category && products.length === 0) {
    notFound();
  }

  const categoryTitle = category?.title || "Collection";
  const categoryDescription = category?.description || "Explore our curated selection, each designed with a touch of luxury and minimalism.";

  return (
    <main className="relative min-h-screen bg-white pb-24 overflow-hidden">
      <BrandBackground />

      {/* Header Section */}
      <section className="relative z-10 pt-32 md:pt-40 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <span
            className={`${poppins.className} text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-brand`}
          >
            Category
          </span>
          <h1
            className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl text-ink`}
          >
            {categoryTitle}
          </h1>
          <p
            className={`${poppins.className} text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed opacity-80`}
          >
            {categoryDescription}
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mt-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                slug={product.slug.current}
                name={product.name}
                theme={product.theme}
                price={product.price}
                coverUrl={product.cover?.url}
                coverLqip={product.cover?.lqip}
                category={product.category}
                instagramLink={product.instagramLink}
                isNew={product.isNew}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className={`${poppins.className} text-gray-500`}>
              No products found in this category yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
