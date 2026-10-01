import Link from "next/link";
import { playfair, poppins } from "@/lib/fonts";
import { ProductCard } from "@/components/product-card";
import CategoryChips from "@/components/category-chips";
import BrandBackground from "@/components/brand-background";
import { INSTAGRAM_DM_URL } from "@/lib/site";
import type { ProductSummary } from "@/sanity/types";

// Shared layout for /catalogue and /category/[slug]: compact header so products
// reach the first screen, category chips, then a 2-up (mobile) / 3-up grid.
export default function CollectionView({
  title,
  description,
  products,
  activeCategory,
}: {
  title: string;
  description: string;
  products: ProductSummary[];
  activeCategory?: string;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white pb-28">
      <BrandBackground />

      <header className="relative z-10 px-6 pb-8 pt-28 text-center md:pb-12 md:pt-36">
        <h1
          className={`${playfair.className} text-4xl italic leading-tight text-ink md:text-6xl`}
        >
          {title}
        </h1>
        <p
          className={`${poppins.className} mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base`}
        >
          {description}
        </p>
        <div className="mx-auto mt-8 max-w-4xl">
          <CategoryChips active={activeCategory} />
        </div>
      </header>

      <section aria-label={`${title} products`} className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14 lg:grid-cols-3">
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
                isNew={product.isNew}
                showCategory={!activeCategory}
                headingLevel={2}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-24 text-center">
            <p className={`${playfair.className} text-2xl italic text-ink`}>
              Nothing here just yet.
            </p>
            <p className={`${poppins.className} mt-3 text-sm leading-relaxed text-gray-600`}>
              New pieces are on the way — or tell us what you have in mind and
              we&apos;ll make it for you.
            </p>
            <Link
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${poppins.className} mt-6 inline-flex min-h-11 items-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark hover:text-white`}
            >
              Ask for a custom piece
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
