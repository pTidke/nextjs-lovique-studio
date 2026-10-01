import { client } from "@/sanity/client";
import type { ProductSummary, Testimonial } from "@/sanity/types";
import { FEATURED_TESTIMONIALS, HOME_PRODUCTS } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import SignatureCollection from "@/components/signature-collection";
import CustomGifts from "@/components/custom-gifts";
import HowItWorks from "@/components/how-it-works";
import KindWords from "@/components/kind-words";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Lovique Studio — Handmade Forever Flowers, Made for Your Person",
  description:
    "Handmade satin-ribbon, crochet and paper bouquets that never wilt — personalised with themes, photos and names, made to order and shipped across India.",
  path: "/",
});

export const revalidate = 60;

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([
    client.fetch<ProductSummary[]>(HOME_PRODUCTS),
    client.fetch<Testimonial[]>(FEATURED_TESTIMONIALS),
  ]);

  // First three photos lead the hero; the next three open the collection row
  const heroProducts = products.slice(0, 3);
  const studioProducts = products.slice(3, 6);

  return (
    <main className="relative">
      <HeroSection products={heroProducts} />
      <SignatureCollection products={studioProducts} />
      <CustomGifts />
      <HowItWorks />
      <KindWords testimonials={testimonials} />
    </main>
  );
}
