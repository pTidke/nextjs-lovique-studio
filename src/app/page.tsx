import { client } from "@/sanity/client";
import type { ProductSummary } from "@/sanity/types";
import { NEW_ARRIVALS } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import SignatureCollection from "@/components/signature-collection";
import type { Metadata } from "next";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Lovique Studio — Handcrafted Forever Flowers",
  description: SITE_DESCRIPTION,
  path: "/",
});

export const revalidate = 60;

export default async function HomePage() {
  const products = await client.fetch<ProductSummary[]>(NEW_ARRIVALS);

  return (
    <main className="relative animate-fade-up">
      {/* HERO (client component) */}
      <HeroSection />

      {/* FEATURES */}
      <FeaturesSection />

      {/* SIGNATURE COLLECTION */}
      <SignatureCollection products={products} />
    </main>
  );
}
