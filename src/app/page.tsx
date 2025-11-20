import { client } from "@/sanity/client";
import { PRODUCTS_GRID } from "@/sanity/queries";
import { ProductCard } from "@/components/product-card";
import HeroSection from "@/components/hero-section";

export const revalidate = 60;

export default async function HomePage() {
  const products = await client.fetch(PRODUCTS_GRID);

  return (
    <main className="relative">
      {/* HERO (client component) */}
      <HeroSection />

      {/* PRODUCT GRID */}
      <section
        id="bouquets"
        className="mx-auto max-w-7xl px-6 pb-32 scroll-mt-28 md:scroll-mt-28"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p: any) => (
            <ProductCard
              key={p._id}
              slug={p.slug.current}
              name={p.name}
              theme={p.theme}
              coverUrl={p.cover?.url}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
