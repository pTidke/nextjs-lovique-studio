"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { urlFor } from "@/sanity/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ImageType = {
  asset?: { _ref?: string; url?: string };
  url?: string;
};

const getImageUrl = (img: ImageType) =>
  img?.asset?.url ||
  (img?.asset?._ref ? urlFor(img.asset) : img?.url) ||
  "";

export default function Carousel({
  images: rawImages,
  name,
}: {
  images?: ImageType[] | null;
  name: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Drop images with no resolvable URL so we never render a broken src
  const images = (rawImages ?? []).filter((img) => getImageUrl(img));

  // Auto-slide every 4 seconds
  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false });

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
  }, [emblaApi, thumbsApi]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  if (images.length === 0) {
    return (
      <div className="w-full max-w-[480px] lg:max-w-[560px] aspect-[6/8] rounded-2xl border border-pink-100 bg-rose-50 flex items-center justify-center text-rose-400">
        No image
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[480px] lg:max-w-[560px]">
      {/* Main Carousel */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md border border-pink-100 shadow-sm"
        ref={emblaRef}
        style={{ maxHeight: "75vh" }}
      >
        <div className="flex relative">
          {images?.map((img, idx) => {
            const imageUrl = getImageUrl(img);

            return (
              <div
                key={idx}
                onClick={() => setLightboxOpen(true)}
                className={`flex-[0_0_100%] relative aspect-[6/8] transition-opacity duration-1000 cursor-zoom-in ${
                  idx === selectedIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`${name} - image ${idx + 1}`}
                  fill
                  className="object-cover object-center rounded-2xl"
                  priority={idx === 0}
                />
              </div>
            );
          })}
        </div>

        {/* Zoom hint */}
        <div className="absolute top-3 right-3 z-20 bg-white/70 backdrop-blur-sm rounded-full p-2 pointer-events-none opacity-60">
          <ZoomIn className="w-4 h-4 text-gray-500" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md border border-pink-100/50 text-[#ee2b8c] rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-white hover:scale-110 transition-all shadow-sm"
          aria-label="Previous image"
        >
          ‹
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md border border-pink-100/50 text-[#ee2b8c] rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-white hover:scale-110 transition-all shadow-sm"
          aria-label="Next image"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === selectedIndex
                  ? "bg-pink-500 scale-125 shadow-[0_0_6px_rgba(255,115,161,0.6)]"
                  : "bg-pink-200 hover:bg-pink-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="w-full mt-4 overflow-hidden" ref={thumbsRef}>
        <div className="flex gap-2 justify-center">
          {images?.map((img, idx) => {
            const thumbUrl = getImageUrl(img);

            return (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg my-4 mx-1 overflow-hidden border-2 transition-all duration-200
                  ${
                    idx === selectedIndex
                      ? "border-pink-500 scale-105 shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const prev =
                  selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
                scrollTo(prev);
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl transition-colors z-10"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const next =
                  selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
                scrollTo(next);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl transition-colors z-10"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl aspect-[3/4] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageUrl(images[selectedIndex])}
                alt={`${name} - image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
