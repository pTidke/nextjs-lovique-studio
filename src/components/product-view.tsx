"use client";

import { ProductCard } from "@/components/product-card";
import type { Product, ProductSummary, Testimonial } from "@/sanity/types";
import { playfair, poppins } from "@/lib/fonts";
import Carousel from "@/components/carousel";
import HowItWorks from "@/components/how-it-works";
import KindWords from "@/components/kind-words";
import { Instagram, ChevronLeft, Share2, Check, MessageCircle } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BrandBackground from "@/components/brand-background";
import { EMOJI_REGEX, formatPrice } from "@/lib/utils";
import { INSTAGRAM_DM_URL } from "@/lib/site";
import { categoryMap } from "@/lib/categories";

type Block =
  | { kind: "para"; text: string }
  | { kind: "label"; text: string }
  | { kind: "list"; items: string[] };

// Lines that start with an emoji, •, -, * or "1." are list items. The check runs
// on the raw line, before emoji are stripped, so emoji-bulleted copy keeps its bullets.
const BULLET_START = new RegExp("^(?:[\\p{Extended_Pictographic}•*\\-]|\\d+\\.)", "u");

function parseDescription(raw?: string): Block[] {
  const blocks: Block[] = [];
  for (const line of (raw ?? "").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const isBullet = BULLET_START.test(trimmed);
    const text = trimmed
      .replace(EMOJI_REGEX, "")
      .replace(/^\s*(?:[•*\-]|\d+\.)\s*/, "")
      .trim();
    if (!text) continue;

    if (isBullet) {
      const last = blocks[blocks.length - 1];
      if (last?.kind === "list") last.items.push(text);
      else blocks.push({ kind: "list", items: [text] });
    } else if (text.endsWith(":") && text.length < 40) {
      blocks.push({ kind: "label", text: text.slice(0, -1) });
    } else {
      blocks.push({ kind: "para", text });
    }
  }
  return blocks;
}

export default function ProductView({
  product,
  relatedProducts = [],
  testimonials = [],
}: {
  product: Product;
  relatedProducts?: ProductSummary[];
  testimonials?: Testimonial[];
}) {
  const [backInfo, setBackInfo] = useState({ href: "/catalogue", label: "Back to the collection" });

  useEffect(() => {
    // Contextual back link: return to the category the visitor came from
    const lastPath = sessionStorage.getItem("lastCollectionPath");
    if (lastPath?.includes("/category/")) {
      const slug = lastPath.split("/category/")[1];
      const title = categoryMap[slug]?.title;
      requestAnimationFrame(() =>
        setBackInfo({ href: lastPath, label: title ? `Back to ${title}` : "Back to the collection" }),
      );
    }
  }, []);

  const { name: rawName, description, theme, images, instagramLink, price } = product;
  const name = rawName.trim();
  const blocks = parseDescription(description);

  const [shared, setShared] = useState(false);
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: `${name} from Lovique Studio`, url });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Clipboard blocked — nothing sensible left to do
    }
  }, [name]);

  // Enquire: Instagram DMs can't be prefilled, so copy a ready-made message
  // (product + link) to the clipboard while the link opens the DM thread.
  // If copying fails, show the message so it can be copied by hand.
  const [enquire, setEnquire] = useState<{ state: "idle" | "copied" | "failed"; message: string }>({
    state: "idle",
    message: "",
  });
  const handleEnquire = useCallback(() => {
    const message = `Hi Lovique Studio! I'd love to order "${name}"${
      price ? ` (${formatPrice(price)})` : ""
    }. ${window.location.href}`;
    const fail = () => setEnquire({ state: "failed", message });
    if (!navigator.clipboard) return fail();
    navigator.clipboard
      .writeText(message)
      .then(() => {
        setEnquire({ state: "copied", message });
        setTimeout(() => setEnquire((e) => (e.state === "copied" ? { ...e, state: "idle" } : e)), 6000);
      })
      .catch(fail);
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

  const priceLabel = price ? formatPrice(price) : "Price on enquiry";

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white pb-24 pt-20 md:pt-24">
      <BrandBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
        <Link
          href={backInfo.href}
          className={`${poppins.className} -ml-1 mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand md:mb-8`}
        >
          <ChevronLeft className="h-4 w-4" /> {backInfo.label}
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-16">
          {/* Photos */}
          <div className="mx-auto w-full max-w-[560px]">
            <Carousel images={images} name={name} />
          </div>

          {/* Info */}
          <div className="flex max-w-xl flex-col">
            <h1
              className={`${playfair.className} text-4xl italic leading-[1.1] text-ink [text-wrap:balance] md:text-5xl lg:text-6xl`}
            >
              {name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p
                className={`${poppins.className} ${price ? "text-2xl font-semibold text-brand md:text-3xl" : "text-lg font-medium text-ink"}`}
              >
                {priceLabel}
              </p>
              {theme && (
                <span
                  className={`${poppins.className} rounded-full bg-blush-deep px-3 py-1 text-sm text-brand`}
                >
                  {theme}
                </span>
              )}
            </div>
            {!price && (
              <p className={`${poppins.className} mt-1 text-sm text-gray-600`}>
                Message us and we&apos;ll quote it for your exact design.
              </p>
            )}

            {blocks.length > 0 && (
              <div className={`${poppins.className} mt-8 space-y-3 text-[15px] leading-relaxed text-gray-700 md:text-base`}>
                {blocks.map((b, i) =>
                  b.kind === "list" ? (
                    <ul key={i} className="space-y-2">
                      {b.items.map((item, j) => (
                        <li key={j} className="flex gap-3">
                          <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : b.kind === "label" ? (
                    <p key={i} className="pt-2 text-sm font-semibold text-ink">
                      {b.text}
                    </p>
                  ) : (
                    <p key={i}>{b.text}</p>
                  ),
                )}
              </div>
            )}

            {/* Primary action */}
            <div ref={ctaRef} className="mt-9">
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleEnquire}
                className={`${poppins.className} flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-brand px-8 text-base font-semibold text-white shadow-[0_12px_28px_-12px_rgba(212,27,118,0.65)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:text-white sm:w-auto`}
              >
                <MessageCircle className="h-5 w-5" />
                Enquire to order
              </a>
              <div aria-live="polite" className={`${poppins.className} mt-3 text-sm text-gray-600`}>
                {enquire.state === "copied" && "Message copied — just paste it in the Instagram chat."}
                {enquire.state === "idle" && "Opens a chat with the studio on Instagram."}
                {enquire.state === "failed" && (
                  <>
                    <p>Couldn&apos;t copy automatically — paste this in the chat:</p>
                    <p className="mt-2 select-all rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink">
                      {enquire.message}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Secondary actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${poppins.className} inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-5 text-sm font-medium text-ink transition-colors hover:border-ink hover:text-ink`}
                >
                  <Instagram className="h-4 w-4" />
                  See it on Instagram
                </a>
              )}
              <button
                type="button"
                onClick={handleShare}
                className={`${poppins.className} inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 px-5 text-sm font-medium text-ink transition-colors hover:border-ink`}
              >
                {shared ? <Check className="h-4 w-4 text-brand" /> : <Share2 className="h-4 w-4" />}
                {shared ? "Link copied" : "Share"}
              </button>
            </div>

            {testimonials.length > 0 && (
              <div className="mt-10">
                <KindWords testimonials={testimonials} compact />
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <HowItWorks compact />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="relative z-10 mx-auto mt-20 max-w-7xl px-4 md:mt-28 md:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 px-1 md:mb-12 md:px-0">
            <h2 className={`${playfair.className} text-3xl text-ink md:text-4xl`}>You may also love</h2>
            <Link
              href="/catalogue"
              className={`${poppins.className} inline-flex min-h-11 items-center text-sm font-semibold text-ink hover:text-brand`}
            >
              See the full collection
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:grid-cols-3">
            {relatedProducts.map((item, i) => (
              <div key={item._id} className={i === 2 ? "hidden lg:block" : undefined}>
                <ProductCard
                  slug={item.slug.current}
                  name={item.name}
                  theme={item.theme}
                  price={item.price}
                  coverUrl={item.cover?.url}
                  coverLqip={item.cover?.lqip}
                  category={item.category}
                  isNew={item.isNew}
                />
              </div>
            ))}
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-ink/10 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_rgba(42,27,27,0.06)] backdrop-blur-md lg:hidden"
          >
            <div className="min-w-0 flex-1">
              <p className={`${playfair.className} truncate text-base leading-tight text-ink`}>{name}</p>
              <p
                className={`${poppins.className} text-sm leading-tight ${price ? "font-semibold text-brand" : "text-gray-600"}`}
              >
                {priceLabel}
              </p>
            </div>
            <a
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEnquire}
              className={`${poppins.className} flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark hover:text-white`}
            >
              <MessageCircle className="h-4 w-4" />
              Enquire
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
