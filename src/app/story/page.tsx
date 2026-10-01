import Image from "next/image";
import { playfair, poppins } from "@/lib/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story — Lovique Studio",
  description:
    "Discover how Lovique Studio was born from a passion for preserving love through handcrafted forever flowers.",
};

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-white animate-fade-up">
      {/* Header Section */}
      <section className="bg-[#fffafa] pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <span
              className={`${poppins.className} text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c]`}
            >
              Est. 2025
            </span>
            <h1
              className={`${playfair.className} italic text-5xl md:text-7xl lg:text-9xl text-[#2a1b1b] leading-tight`}
            >
              Our Story
            </h1>
          </div>

          <div className="w-16 h-px bg-[#ee2b8c]/30" />

          <p
            className={`${playfair.className} text-xl md:text-2xl lg:text-3xl text-gray-500 italic max-w-3xl leading-relaxed`}
          >
            {
              '"Where flowers meet forever, wrapped in grace and sealed with love."'
            }
          </p>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <div className="relative w-full aspect-square">
            <Image
              src="/florist-animate.svg"
              alt="Lovique Studio Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-3xl mx-auto px-6 py-32 space-y-24">
        {/* Philosophy */}
        <div className="space-y-8">
          <h2
            className={`${playfair.className} text-3xl md:text-4xl text-[#2a1b1b]`}
          >
            A Vision of Minimalist Artistry
          </h2>
          <div className="space-y-6">
            <p
              className={`${poppins.className} text-sm md:text-base text-gray-500 leading-relaxed font-light`}
            >
              {
                "Lovique Studio was born on 7th September, founded by a passionate young artist with a simple yet powerful idea—to let love last forever. What began as a creative dream soon transformed into a space where emotions are preserved through forever flowers. Each piece is thoughtfully handcrafted, not just as a bouquet, but as a symbol of timeless love, memories, and moments that deserve to never fade. At Lovique Studio, we don’t just create flowers—we help people feel love, forever."
              }
            </p>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-[#ee2b8c]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#ee2b8c]/30" />
          <div className="w-16 h-px bg-[#ee2b8c]/20" />
        </div>

        {/* The Studio */}
        <div className="space-y-8">
          <h2
            className={`${playfair.className} text-3xl md:text-4xl text-[#2a1b1b]`}
          >
            Creativity behind our Flowers
          </h2>
          <ul
            className={`${poppins.className} text-sm md:text-base text-gray-500 leading-relaxed font-light space-y-3 list-none`}
          >
            <li className="flex items-start gap-3">
              <span className="text-[#ee2b8c] mt-1.5 text-[6px]">●</span>
              <span>Rooted in passion, imagination, and emotional expression</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ee2b8c] mt-1.5 text-[6px]">●</span>
              <span>Crafted with a strong sense of luxury, elegance, and premium detailing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ee2b8c] mt-1.5 text-[6px]">●</span>
              <span>Designed using rich textures, refined color palettes, and graceful compositions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ee2b8c] mt-1.5 text-[6px]">●</span>
              <span>Created with timeless forever flowers that retain their beauty and richness forever</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
