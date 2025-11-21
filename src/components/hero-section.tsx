"use client";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Herosection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[var(--baby-pink-50)]/40 via-white/70 to-white min-h-[85vh] flex items-center">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        {/* LEFT — brand name + tagline */}
        <div className="text-center md:text-left space-y-6">
          <h1
            className={`${playfair.className} text-5xl sm:text-6xl font-medium tracking-tight text-gray-900`}
          >
            Lovique <span className="text-[var(--baby-pink-500)]">Studio</span>
          </h1>
          <p className="text-lg sm:text-xl italic text-gray-600 max-w-md mx-auto md:mx-0">
            Wrapped in grace, sealed with love — where flowers meet forever.
          </p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#bouquets"
            className="inline-block mt-4 rounded-full bg-[var(--baby-pink-500)] text-black px-10 py-3 text-sm font-medium tracking-wide hover:bg-[var(--baby-pink-600)] transition-colors shadow-sm"
          >
            Explore Our Bouquets
          </a>
        </div>

        {/* RIGHT — animated illustration */}
        <div className="flex justify-center md:justify-end">
          <object
            type="image/svg+xml"
            data="/florist-animate.svg"
            className="w-80 h-80 md:w-150 md:h-150"
            aria-label="Animated florist illustration"
          />
        </div>
      </div>
    </section>
  );
}
