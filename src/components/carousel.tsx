"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";

export default function Carousel({
  images,
  name,
}: {
  images: any[];
  name: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-slide every 4 seconds
  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", duration: 20 },
    [autoplay]
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

  return (
    <div className="flex flex-col items-center w-full max-w-[600px]">
      {/* Main Carousel */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md border border-pink-100 shadow-sm"
        ref={emblaRef}
        style={{ maxHeight: "80vh" }}
      >
        <div className="flex relative">
          {images?.map((img: any, idx: number) => (
            <div
              key={idx}
              className={`flex-[0_0_100%] relative aspect-[5/7] transition-opacity duration-1000 ${
                idx === selectedIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={img.asset.url}
                alt={`${name} - image ${idx + 1}`}
                fill
                className="object-cover object-center rounded-2xl"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md border border-pink-100 text-pink-600 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold hover:bg-pink-50 hover:scale-105 transition-all shadow-md" aria-label="Previous image"
        >
          ‹
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md border border-pink-100 text-pink-600 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold hover:bg-pink-50 hover:scale-105 transition-all shadow-md"
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
          {images?.map((img: any, idx: number) => (
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
                src={img.asset.url}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
