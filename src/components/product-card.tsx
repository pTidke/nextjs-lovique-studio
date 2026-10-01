"use client";

import SanityImage from "@/components/sanity-image";
import { playfair, poppins } from "@/lib/fonts";
import { Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

type Props = {
  slug: string;
  name: string;
  theme?: string;
  price?: number;
  coverUrl?: string;
  coverLqip?: string;
  instagramLink?: string;
  category?: string;
  isNew?: boolean;
};

export function ProductCard({
  slug,
  name,
  theme,
  price,
  coverUrl,
  coverLqip,
  instagramLink,
  category,
  isNew,
}: Props) {
  const router = useRouter();

  const categoryDisplayMap: Record<string, string> = {
    singles: "Singles",
    flower_basket: "Flower Basket",
    bouquets: "Bouquet",
    flower_pots: "Flower pot",
    magazine: "Magazine",
    wall_art: "Wall Art",
  };

  return (
    <div
      onClick={() => router.push(`/product/${slug}`)}
      className="group block overflow-hidden rounded-[1.5rem] bg-[#fffafa] bg-gradient-to-b from-white via-[#fff5f8] to-[#fffafa] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 relative cursor-pointer"
    >
      {/* Gaussian Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(238,43,140,0.05)_0%,_transparent_50%)] pointer-events-none" />

      {/* Image Area */}
      <div className="relative aspect-[3/4] w-full bg-[#fffafa] overflow-hidden rounded-t-[1.5rem]">
        {/* Main Image with Studio Styling */}
        {coverUrl ? (
          <SanityImage
            src={coverUrl}
            lqip={coverLqip}
            alt={name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-[0.98] mix-blend-multiply"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-rose-50 text-gray-400">
            No image
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
              instagramLink || "https://instagram.com/lovique._studio",
              "_blank",
              "noopener,noreferrer",
            );
          }}
          className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-300 z-10 text-gray-400 hover:text-[#ee2b8c] md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
        >
          <Instagram className="w-5 h-5" />
        </button>

        {/* NEW Badge - Refined with glow */}
        {isNew && (
          <div className="absolute top-6 left-6 z-20">
            <div className="relative bg-[#ee2b8c] text-white text-[9px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm border border-white/20">
              New
            </div>
          </div>
        )}

        {/* Category Pill - Bottom Right */}
        {category && (
          <div className="absolute bottom-6 right-6 z-20">
            <div className="bg-white/40 backdrop-blur-md text-[#2a1b1b] text-[8px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/30 shadow-sm">
              {categoryDisplayMap[category] || category}
            </div>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-4 space-y-1">
        <h3
          className={`${playfair.className} text-xl md:text-2xl font-bold text-[#2a1b1b] leading-tight`}
        >
          {name}
        </h3>
        {!!price && (
          <p className={`${poppins.className} text-lg font-medium text-[#ee2b8c]`}>
            {formatPrice(price)}
          </p>
        )}
        <p
          className={`${poppins.className} text-sm text-gray-500 leading-relaxed line-clamp-3`}
        >
          {theme || "Lovique Studio Special"}
        </p>
      </div>
    </div>
  );
}
