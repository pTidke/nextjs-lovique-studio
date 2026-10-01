import { client } from "@/sanity/client";
import type { ProductSummary } from "@/sanity/types";
import { playfair, poppins } from "@/lib/fonts";
import { PRODUCTS_GRID } from "@/sanity/queries";
import { ProductCard } from "@/components/product-card";
import BrandBackground from "@/components/brand-background";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Catalogue — Lovique Studio",
  description:
    "Browse the full collection of handcrafted forever flower arrangements from Lovique Studio.",
  path: "/catalogue",
});

export const revalidate = 60;

export default async function CataloguePage() {
  const products = await client.fetch<ProductSummary[]>(PRODUCTS_GRID);

  return (
    <main className="relative min-h-screen bg-white pb-32 overflow-hidden">
      <BrandBackground />

      {/* Header Section */}
      <section className="relative z-10 pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <span
            className={`${poppins.className} text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-brand`}
          >
            Explore Our Studio
          </span>
          <h1
            className={`${playfair.className} italic text-5xl md:text-7xl lg:text-8xl text-ink leading-tight`}
          >
            The Full Catalogue
          </h1>
          <p
            className={`${poppins.className} text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-80`}
          >
            Browse our entire collection of handcrafted forever flower arrangements,
            each designed to bring a touch of luxury and artistry into your space.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mt-12">
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

        {products.length === 0 && (
          <div className="text-center py-40">
            <p
              className={`${playfair.className} text-2xl text-gray-500 italic`}
            >
              The studio is currently preparing new arrangements...
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
