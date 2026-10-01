"use client";

import { playfair, poppins } from "@/lib/fonts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";

type Product = {
  _id: string;
  name: string;
  theme?: string;
  slug: { current: string };
  cover?: { url?: string; lqip?: string };
  price?: number;
  instagramLink?: string;
  category?: string;
  isNew?: boolean;
};

interface SignatureCollectionProps {
  products: Product[]; // already limited to 3 new arrivals by NEW_ARRIVALS
}

export default function SignatureCollection({
  products,
}: SignatureCollectionProps) {
  // No product flagged "new" in Sanity — skip the section instead of an empty grid
  if (products.length === 0) return null;

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span
              className={`${poppins.className} text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c]`}
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
            className={`${poppins.className} group flex items-center gap-2 text-[14px] md:text-sm font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-[#ee2b8c] transition-colors pb-1`}
          >
            See All{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
