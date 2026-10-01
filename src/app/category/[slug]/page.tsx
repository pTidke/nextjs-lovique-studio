import { client } from "@/sanity/client";
import type { ProductSummary } from "@/sanity/types";
import { PRODUCTS_BY_CATEGORY } from "@/sanity/queries";
import CollectionView from "@/components/collection-view";
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
  const categoryDescription =
    category?.description ||
    "Handmade forever-flower pieces, made to order and customisable for your person.";

  return (
    <CollectionView
      title={categoryTitle}
      description={categoryDescription}
      products={products}
      activeCategory={slug}
    />
  );
}
