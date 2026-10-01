"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { SanityImage as SanityImageData } from "@/sanity/types";
import Autoplay from "embla-carousel-autoplay";
import SanityImage from "@/components/sanity-image";
import { useCallback, useState, useEffect, useRef } from "react";
import { useDialog } from "@/lib/use-dialog";
import { urlFor } from "@/sanity/image";
import { X, ZoomIn, ChevronLeft, ChevronRight, Flower2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getImageUrl = (img: SanityImageData) =>
  img?.url || (img?.asset?._ref ? urlFor(img) : "");

export default function Carousel({
  images: rawImages,
  name,
}: {
  images?: SanityImageData[] | null;
  name: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Drop images with no resolvable URL so we never render a broken src
  const images = (rawImages ?? []).filter((img) => getImageUrl(img));

  // Auto-slide every 4 seconds
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", duration: 20 },
    [autoplay],
  );

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !thumbsApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      thumbsApi.scrollTo(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, thumbsApi]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  useDialog(lightboxRef, lightboxOpen, closeLightbox);

  // Pause autoplay behind the lightbox; arrow keys page through images
  useEffect(() => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (!lightboxOpen) {
      autoplayPlugin?.play();
      return;
    }
    autoplayPlugin?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen, emblaApi]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[6/8] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-blush-deep text-brand/70">
        <Flower2 className="h-10 w-10" strokeWidth={1.25} />
        <span className="text-sm">Photos coming soon</span>
      </div>
    );
  }

  const multiple = images.length > 1;
  const arrowClass =
    "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-[0_4px_14px_rgba(42,27,27,0.12)] transition-colors hover:bg-white hover:text-brand";

  return (
    <div className="flex w-full flex-col items-center">
      {/* Main Carousel */}
      <div
        className="relative max-h-[62svh] w-full overflow-hidden rounded-2xl bg-blush-deep lg:max-h-[75vh]"
        ref={emblaRef}
      >
        <div className="flex relative">
          {images.map((img, idx) => {
            const imageUrl = getImageUrl(img);

            return (
              <div
                key={idx}
                className="relative aspect-[6/8] flex-[0_0_100%]"
              >
                <SanityImage
                  src={imageUrl}
                  alt={`${name} — photo ${idx + 1} of ${images.length}`}
                  fill
                  lqip={img.lqip}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-center"
                  priority={idx === 0}
                />
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  tabIndex={idx === selectedIndex ? 0 : -1}
                  aria-label={`View photo ${idx + 1} of ${images.length} full screen`}
                  className="absolute inset-0 cursor-zoom-in rounded-2xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand"
                />
              </div>
            );
          })}
        </div>

        {/* Zoom hint */}
        <div className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-white/80 p-2">
          <ZoomIn className="h-4 w-4 text-ink-soft" />
        </div>

        {multiple && (
          <>
            <button type="button" onClick={scrollPrev} className={`${arrowClass} left-3`} aria-label="Previous photo">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={scrollNext} className={`${arrowClass} right-3`} aria-label="Next photo">
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Position indicator (thumbnails below handle navigation) */}
            <div aria-hidden className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === selectedIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {multiple && (
        <div className="mt-3 w-full overflow-hidden" ref={thumbsRef}>
          <div className="flex justify-center gap-2 py-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Show photo ${idx + 1}`}
                aria-current={idx === selectedIndex ? "true" : undefined}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-[border-color,opacity] duration-200 md:h-20 md:w-20 ${
                  idx === selectedIndex ? "border-brand" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <SanityImage src={getImageUrl(img)} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} photos`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 outline-none"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white md:right-6 md:top-6"
              aria-label="Close"
            >
              <X className="h-7 w-7" />
            </button>

            {multiple && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
                  }}
                  className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white md:left-6"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
                  }}
                  className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white md:right-6"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-[3/4] max-h-[85vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SanityImage
                src={getImageUrl(images[selectedIndex])}
                alt={`${name} — photo ${selectedIndex + 1} of ${images.length}`}
                fill
                className="object-contain"
                sizes="(min-width: 768px) 768px, 100vw"
                priority
              />
            </motion.div>

            {multiple && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
