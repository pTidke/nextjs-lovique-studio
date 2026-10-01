import { client } from "@/sanity/client";
import type { ProductSummary } from "@/sanity/types";
import { PRODUCTS_GRID } from "@/sanity/queries";
import CollectionView from "@/components/collection-view";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Catalogue — Lovique Studio",
  description:
    "Every handmade forever-flower piece from Lovique Studio — bouquets, baskets, pots, wall art and keepsakes, made to order and customisable for your person.",
  path: "/catalogue",
});

export const revalidate = 60;

export default async function CataloguePage() {
  const products = await client.fetch<ProductSummary[]>(PRODUCTS_GRID);

  return (
    <CollectionView
      title="The Collection"
      description="Every piece is handmade to order — and almost anything can be customised for your person."
      products={products}
    />
  );
}
