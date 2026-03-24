"use client";

import { Playfair_Display, Poppins } from "next/font/google";
import Image from "next/image";
import Carousel from "@/components/carousel";
import { MessageCircle, Instagram, ChevronLeft, Share2, Check } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BrandBackground from "@/components/brand-background";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

type ProductImage = {
  asset: {
    _ref: string;
    _type: string;
  };
  _key: string;
};

type RelatedProduct = {
  _id: string;
  name: string;
  theme?: string;
  slug: { current: string };
  cover?: { url?: string };
  category?: string;
  isNew?: boolean;
  instagramLink?: string;
};

type Product = {
  name: string;
  description: string;
  theme: string;
  images: ProductImage[];
  whatsappLink?: string;
  instagramLink?: string;
  category?: string;
};

export default function ProductView({
  product,
  relatedProducts = [],
}: {
  product: Product;
  relatedProducts?: RelatedProduct[];
}) {
  const [backInfo, setBackInfo] = useState({
    href: "/",
    label: "Back to Collection",
  });

  useEffect(() => {
    // Contextual back button logic
    if (typeof window !== "undefined") {
      const lastPath = sessionStorage.getItem("lastCollectionPath");

      if (lastPath) {
        requestAnimationFrame(() => {
          if (lastPath.includes("/catalogue")) {
            setBackInfo((prev) => ({
              ...prev,
              href: "/catalogue",
              label: "Back to Catalogue",
            }));
          } else if (lastPath.includes("/category/")) {
            setBackInfo((prev) => ({
              ...prev,
              href: lastPath,
              label: "Back to Category",
            }));
          }
        });
      }
    }
  }, []);

  const [shared, setShared] = useState(false);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = `Check out ${product.name} from Lovique Studio!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }, [product.name]);

  const { name, description, theme, images, instagramLink } = product;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white pt-20 pb-32">
      <BrandBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full">
        {/* Breadcrumb / Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 lg:mb-12 lg:mt-6"
        >
          <Link
            href={backInfo.href}
            className={`${poppins.className} inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-[#ee2b8c] transition-colors`}
          >
            <ChevronLeft className="w-4 h-4" /> {backInfo.label}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-start">
          {/* LEFT — Product Image Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Soft Glow behind Carousel */}
            <div className="absolute -inset-10 bg-[#ee2b8c]/5 blur-[60px] rounded-full pointer-events-none" />
            <Carousel images={images} name={name} />
          </motion.div>

          {/* RIGHT — Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-4 text-center lg:text-left">
              {theme && (
                <span
                  className={`${poppins.className} inline-block bg-[#fff5f8] text-[#ee2b8c] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-[#ee2b8c]/10`}
                >
                  {theme}
                </span>
              )}
              <h1
                className={`${playfair.className} italic text-5xl md:text-6xl lg:text-7xl text-[#2a1b1b] leading-tight`}
              >
                {name}
              </h1>
              <div className="w-20 h-[1px] bg-[#ee2b8c]/20 mx-auto lg:mx-0" />
            </div>

            <div
              className={`${poppins.className} text-gray-500 leading-relaxed text-sm md:text-base font-light max-w-xl text-center lg:text-left space-y-4`}
            >
              {description
                ?.replace(
                  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDDFF])/g,
                  "",
                )
                .trim()
                .split("\n")
                .map((line, idx) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine) return null;

                  // Check if line starts with common bullet indicators
                  if (
                    trimmedLine.startsWith("•") ||
                    trimmedLine.startsWith("-") ||
                    trimmedLine.startsWith("*") ||
                    /^[0-9]+\./.test(trimmedLine)
                  ) {
                    const content = trimmedLine
                      .replace(/^[•\-\*]/, "")
                      .replace(/^[0-9]+\./, "")
                      .trim();
                    return (
                      <div
                        key={idx}
                        className="flex gap-3 items-start justify-center lg:justify-start"
                      >
                        <span className="text-[#ee2b8c] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ee2b8c] shrink-0" />
                        <span className="text-left">{content}</span>
                      </div>
                    );
                  }

                  return (
                    <p key={idx} className="mb-2">
                      {trimmedLine}
                    </p>
                  );
                })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <a
                href={`https://wa.me/917016171941?text=${encodeURIComponent(
                  `Hi Lovique Studio! \n\nI'm interested in your *${name}* bouquet.\n\nHere’s the Instagram link: ${
                    instagramLink || "https://instagram.com/lovique.studio"
                  }\n\nCould you please share more details?`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 bg-transparent border border-emerald-500/20 text-[#2a1b1b] px-8 py-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-emerald-50 hover:border-emerald-500 transition-all shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-emerald-500" />
                <span>Enquire on WhatsApp</span>
              </a>

              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-transparent border border-[#2a1b1b]/10 text-[#2a1b1b] px-8 py-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:border-[#2a1b1b] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                  <span>View on Instagram</span>
                </a>
              )}

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-3 bg-transparent border border-[#2a1b1b]/10 text-[#2a1b1b] px-8 py-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:border-[#2a1b1b] transition-all"
              >
                {shared ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            {/* Features (Mini Version) */}
            <div className="pt-12 grid grid-cols-2 gap-8 border-t border-[#2a1b1b]/5">
              <div className="space-y-2">
                <p
                  className={`${poppins.className} text-[10px] font-bold tracking-[0.2em] uppercase text-[#ee2b8c]`}
                >
                  Curation
                </p>
                <p className="text-xs text-gray-400 font-light">
                  Handcrafted forever flowers
                </p>
              </div>
              <div className="space-y-2">
                <p
                  className={`${poppins.className} text-[10px] font-bold tracking-[0.2em] uppercase text-[#ee2b8c]`}
                >
                  Packaging
                </p>
                <p className="text-xs text-gray-400 font-light">
                  Premium tailored packaging
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
          <div className="border-t border-[#2a1b1b]/5 pt-16">
            <h2
              className={`${playfair.className} italic text-3xl md:text-4xl text-[#2a1b1b] text-center mb-12`}
            >
              You May Also Love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  href={`/product/${item.slug.current}`}
                  className="group block overflow-hidden rounded-[1.5rem] bg-[#fffafa] bg-gradient-to-b from-white via-[#fff5f8] to-[#fffafa] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-[1.5rem] bg-[#fffafa]">
                    {item.cover?.url ? (
                      <Image
                        src={item.cover.url}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-1">
                    <h3
                      className={`${playfair.className} text-xl md:text-2xl font-bold text-[#2a1b1b] leading-tight`}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`${poppins.className} text-sm text-gray-500 leading-relaxed`}
                    >
                      {item.theme || "Lovique Studio Special"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
