import { client } from "@/sanity/client";
import { PRODUCTS_BY_CATEGORY } from "@/sanity/queries";
import { ProductCard } from "@/components/product-card";
import { Playfair_Display, Poppins } from "next/font/google";
import BrandBackground from "@/components/brand-background";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

type Product = {
  _id: string;
  name: string;
  theme?: string;
  price?: number;
  instagramLink?: string;
  category?: string;
  isNew?: boolean;
  slug: { current: string };
  cover?: { url?: string };
};

const categoryMap: Record<string, string> = {
  flower_bags: "Flower Bags",
  bouquets: "Bouquets",
  flower_pots: "Flower Pots",
  magazine: "Magazine",
  wall_art: "Wall Art",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await client.fetch(PRODUCTS_BY_CATEGORY, { category: slug });
  const categoryTitle = categoryMap[slug] || "Collection";

  return (
    <main className="relative min-h-screen bg-white pb-24 overflow-hidden">
      <BrandBackground />

      {/* Header Section */}
      <section className="relative z-10 pt-32 md:pt-40 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <span
            className={`${poppins.className} text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c]`}
          >
            Category
          </span>
          <h1
            className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl text-[#2a1b1b] animate-fade-in`}
          >
            {categoryTitle}
          </h1>
          <p
            className={`${poppins.className} text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed opacity-80`}
          >
            Explore our curated selection of {categoryTitle.toLowerCase()}, each
            designed with a touch of luxury and minimalism.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mt-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product: Product) => (
              <ProductCard
                key={product._id}
                slug={product.slug.current}
                name={product.name}
                theme={product.theme}
                coverUrl={product.cover?.url}
                category={product.category}
                instagramLink={product.instagramLink}
                isNew={product.isNew}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className={`${poppins.className} text-gray-400`}>
              No products found in this category yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
