import { client } from "@/sanity/client";
import { NEW_ARRIVALS } from "@/sanity/queries";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import SignatureCollection from "@/components/signature-collection";

export const revalidate = 60;

export default async function HomePage() {
  const products = await client.fetch(NEW_ARRIVALS);

  return (
    <main className="relative animate-fade-up">
      {/* HERO (client component) */}
      <HeroSection />

      {/* FEATURES */}
      <FeaturesSection />

      {/* SIGNATURE COLLECTION */}
      <SignatureCollection products={products} />

      {/* PRODUCT GRID */}
      {/* <section
        id="bouquets"
        className="mx-auto max-w-7xl px-6 pb-32 scroll-mt-28 md:scroll-mt-28"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p: Product) => (
            <ProductCard
              key={p._id}
              slug={p.slug.current}
              name={p.name}
              theme={p.theme}
              coverUrl={p.cover?.url}
              description={p.description}
              instagramLink={p.instagramLink}
              isNew={p.isNew}
            />
          ))}
        </div>
      </section> */}
    </main>
  );
}
