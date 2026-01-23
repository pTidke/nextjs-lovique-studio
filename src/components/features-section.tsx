"use client";

import { Flower2, PartyPopper, Gift } from "lucide-react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const features = [
  {
    icon: Flower2,
    title: "Freshly Curated",
    description:
      "Seasonal blooms selected for their unique form and delicate fragrance.",
  },
  {
    icon: PartyPopper,
    title: "Signature Style",
    description:
      "A distinct aesthetic blending modern minimalism with timeless romance.",
  },
  {
    icon: Gift,
    title: "Artisan Packaging",
    description:
      "Wrapped in eco-friendly silk paper and our signature baby pink ribbon.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-[#ee2b8c] mb-2">
                <feature.icon strokeWidth={1.5} className="w-10 h-10" />
              </div>
              <h3
                className={`${poppins.className} text-xs font-bold tracking-[0.25em] uppercase text-gray-800`}
              >
                {feature.title}
              </h3>
              <p
                className={`${poppins.className} text-sm text-gray-500 leading-relaxed font-light max-w-xs`}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
