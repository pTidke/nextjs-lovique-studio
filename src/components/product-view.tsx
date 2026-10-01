"use client";

import { ProductCard } from "@/components/product-card";
import { playfair, poppins } from "@/lib/fonts";
import Carousel from "@/components/carousel";
import {
  Instagram,
  ChevronLeft,
  Share2,
  Check,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BrandBackground from "@/components/brand-background";
import { EMOJI_REGEX, formatPrice } from "@/lib/utils";
import { INSTAGRAM_DM_URL } from "@/lib/site";

type ProductImage = {
  asset: {
    _ref: string;
    _type: string;
  };
  _key: string;
  url?: string;
  lqip?: string;
};

type RelatedProduct = {
  _id: string;
  name: string;
  theme?: string;
  slug: { current: string };
  cover?: { url?: string; lqip?: string };
  price?: number;
  category?: string;
  isNew?: boolean;
  instagramLink?: string;
};

type Product = {
  name: string;
  description: string;
  theme: string;
  price?: number;
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

  const { name, description, theme, images, instagramLink, price } = product;

  // Enquire: Instagram DMs can't be prefilled, so copy a ready-made message
  // (product + link) to the clipboard while the link opens the DM thread.
  const [enquireCopied, setEnquireCopied] = useState(false);
  const handleEnquire = useCallback(() => {
    const message = `Hi Lovique Studio! I'd love to order "${name}"${
      price ? ` (${formatPrice(price)})` : ""
    }. ${window.location.href}`;
    navigator.clipboard
      ?.writeText(message)
      .then(() => {
        setEnquireCopied(true);
        setTimeout(() => setEnquireCopied(false), 5000);
      })
      .catch(() => {});
  }, [name, price]);

  // Mobile sticky "Enquire" bar: visible while the main button is off-screen,
  // hidden again once the end of the product content (footer) is reached.
  const ctaRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [ctaVisible, setCtaVisible] = useState(true);
  const [endReached, setEndReached] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === ctaRef.current) setCtaVisible(entry.isIntersecting);
        if (entry.target === endRef.current)
          setEndReached(entry.isIntersecting || entry.boundingClientRect.top < 0);
      }
    });
    if (ctaRef.current) observer.observe(ctaRef.current);
    if (endRef.current) observer.observe(endRef.current);
    return () => observer.disconnect();
  }, []);
  const showStickyCta = !ctaVisible && !endReached;

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
            className={`${poppins.className} inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase text-gray-500 hover:text-[#ee2b8c] transition-colors`}
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
                  className={`${poppins.className} inline-block bg-[#fff5f8] text-[#ee2b8c] text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-[#ee2b8c]/10`}
                >
                  {theme}
                </span>
              )}
              <h1
                className={`${playfair.className} italic text-5xl md:text-6xl lg:text-7xl text-[#2a1b1b] leading-tight`}
              >
                {name}
              </h1>
              {!!price && (
                <p className={`${poppins.className} text-2xl font-medium text-[#ee2b8c] mt-2`}>
                  {formatPrice(price)}
                </p>
              )}
              <div className="w-20 h-[1px] bg-[#ee2b8c]/20 mx-auto lg:mx-0" />
            </div>

            <div
              className={`${poppins.className} text-gray-500 leading-relaxed text-sm md:text-base font-light max-w-xl text-center lg:text-left space-y-4`}
            >
              {description
                ?.replace(EMOJI_REGEX, "")
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

            {/* Primary CTA */}
            <div
              ref={ctaRef}
              className="flex flex-col gap-3 pt-4 items-center lg:items-start"
            >
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleEnquire}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#ee2b8c] text-white px-10 py-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#d41b76] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enquire to Order</span>
              </a>
              <p
                aria-live="polite"
                className={`${poppins.className} text-xs text-gray-500 text-center lg:text-left`}
              >
                {enquireCopied
                  ? "Message copied — just paste it in the Instagram chat."
                  : "Opens a chat with the studio on Instagram."}
              </p>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

            {/* Ordering note (from Terms: 4–5 days lead time, UPI advance) */}
            <div className="flex items-start gap-3 justify-center lg:justify-start border-t border-[#2a1b1b]/5 pt-6 max-w-xl">
              <Clock className="w-4 h-4 mt-1 shrink-0 text-[#ee2b8c]" />
              <p
                className={`${poppins.className} text-sm text-gray-600 leading-relaxed text-left`}
              >
                Handcrafted to order — please order 4–5 days in advance. An
                advance UPI payment confirms your order.
              </p>
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
                <ProductCard
                  key={item._id}
                  slug={item.slug.current}
                  name={item.name}
                  theme={item.theme}
                  price={item.price}
                  coverUrl={item.cover?.url}
                  coverLqip={item.cover?.lqip}
                  category={item.category}
                  instagramLink={item.instagramLink}
                  isNew={item.isNew}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* End-of-content marker for the sticky bar */}
      <div ref={endRef} aria-hidden className="h-px" />

      {/* Mobile sticky Enquire bar */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-pink-100 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-4 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]"
          >
            <div className="min-w-0 flex-1">
              <p
                className={`${playfair.className} truncate text-base text-[#2a1b1b] leading-tight`}
              >
                {name}
              </p>
              {!!price && (
                <p
                  className={`${poppins.className} text-sm font-medium text-[#ee2b8c] leading-tight`}
                >
                  {formatPrice(price)}
                </p>
              )}
            </div>
            <a
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEnquire}
              className="shrink-0 flex items-center gap-2 bg-[#ee2b8c] text-white px-5 py-3 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#d41b76] transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Enquire
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
