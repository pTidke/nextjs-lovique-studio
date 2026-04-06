"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

type Product = {
  _id: string;
  name: string;
  theme?: string;
  slug: { current: string };
  cover?: { url?: string };
  price?: number;
  description?: string;
  instagramLink?: string;
  category?: string;
  isNew?: boolean;
};

interface SignatureCollectionProps {
  products: Product[];
}

export default function SignatureCollection({
  products,
}: SignatureCollectionProps) {
  const router = useRouter();
  // Show only products tagged as "New Arrival", limit to 3
  const displayedProducts = products.filter((p) => p.isNew).slice(0, 3);

  const categoryDisplayMap: Record<string, string> = {
    singles: "Singles",
    flower_basket: "Flower Basket",
    bouquets: "Bouquet",
    flower_pots: "Flower pot",
    magazine: "Magazine",
    wall_art: "Wall Art",
  };

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span
              className={`${poppins.className} text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c]`}
            >
              New Arrivals
            </span>
            <h2
              className={`${playfair.className} italic text-4xl md:text-5xl lg:text-6xl text-[#2a1b1b]`}
            >
              Our Collection
            </h2>
          </div>
          <Link
            href="/catalogue"
            className={`${poppins.className} group flex items-center gap-2 text-[14px] md:text-sm font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-[#ee2b8c] transition-colors pb-1`}
          >
            See All{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => router.push(`/product/${product.slug.current}`)}
              className="group cursor-pointer rounded-[1.5rem] bg-[#fffafa] bg-gradient-to-b from-white via-[#fff5f8] to-[#fffafa] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 relative"
            >
              {/* Gaussian Glow Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(238,43,140,0.05)_0%,_transparent_50%)] pointer-events-none" />

              {/* Image Container with Studio Styling */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#fffafa] rounded-t-[1.5rem]">
                {product.cover?.url ? (
                  <Image
                    src={product.cover.url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-[0.98] mix-blend-multiply"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    No Image Available
                  </div>
                )}

                {/* Studio Refinements: Light unification & Depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ee2b8c]/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.03)] pointer-events-none" />

                {/* Instagram Icon Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      product.instagramLink ||
                        "https://instagram.com/lovique._studio",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 z-10 text-gray-400 hover:text-[#ee2b8c] md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                >
                  <Instagram className="w-5 h-5" />
                </button>

                {/* NEW Badge - Refined with glow */}
                {product.isNew && (
                  <div className="absolute top-6 left-6 z-20">
                    <div className="relative bg-[#ee2b8c] text-white text-[9px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm border border-white/20">
                      New
                    </div>
                  </div>
                )}

                {/* Category Pill - Bottom Right */}
                {product.category && (
                  <div className="absolute bottom-6 right-6 z-20">
                    <div className="bg-white/40 backdrop-blur-md text-[#2a1b1b] text-[8px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/30 shadow-sm">
                      {categoryDisplayMap[product.category] || product.category}
                    </div>
                  </div>
                )}
              </div>

              {/* Info Container Area */}
              <div className="p-4 space-y-1">
                <h3
                  className={`${playfair.className} text-xl md:text-2xl font-bold text-[#2a1b1b] leading-tight`}
                >
                  {product.name}
                </h3>
                <p
                  className={`${poppins.className} text-sm text-gray-500 leading-relaxed line-clamp-3`}
                >
                  {product.theme || "Lovique Studio Special"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
