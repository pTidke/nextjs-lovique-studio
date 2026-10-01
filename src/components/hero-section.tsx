import { playfair, poppins } from "@/lib/fonts";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import AmbientBlob from "@/components/ambient-blob";

export default function HeroSection() {
  return (
    <section className="relative w-full h-svh min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* 🌸 Animated Blobs Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blob 1: Accent Pink (Top Left) */}
        <AmbientBlob
          size={600}
          color="rgb(238 43 140 / 0.4)"
          core={33}
          className="top-[calc(-5%-100px)] left-[calc(-5%-100px)]"
          dx={50}
          dy={60}
          scale={1.2}
          duration={6}
        />
        {/* Blob 2: Soft Purple (Bottom Right) */}
        <AmbientBlob
          size={690}
          color="rgb(216 180 254 / 0.4)"
          core={30}
          className="bottom-[calc(-5%-120px)] right-[calc(-5%-120px)]"
          dx={-60}
          dy={-50}
          scale={1.3}
          duration={7.5}
        />
        {/* Blob 3: Warm Peach (Center Left) */}
        <AmbientBlob
          size={450}
          color="rgb(254 215 170 / 0.4)"
          core={33}
          className="top-[calc(20%-50px)] left-[calc(10%-50px)]"
          wander
          duration={18}
        />
        {/* Blob 4: Soft Teal (Top Right) */}
        <AmbientBlob
          size={380}
          color="rgb(153 246 228 / 0.3)"
          core={37}
          className="top-[calc(5%-40px)] right-[calc(10%-40px)]"
          dx={-30}
          dy={40}
          scale={1.1}
          duration={10}
        />
        {/* Blob 5: Deep Rose (Bottom Left) */}
        <AmbientBlob
          size={430}
          color="rgb(253 164 175 / 0.3)"
          core={16}
          className="bottom-[calc(10%-90px)] left-[calc(20%-90px)]"
          dx={60}
          dy={-30}
          duration={7}
        />
      </div>

      {/* 🌫️ Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-2 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-8">
        {/* Title */}
        <h1
          className={`${playfair.className} italic text-6xl md:text-8xl lg:text-9xl text-ink tracking-tight drop-shadow-sm`}
        >
          Lovique <span className="text-brand">Studio</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`${poppins.className} text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-gray-600 max-w-xl leading-loose`}
        >
          Wrapped in grace, sealed with love <br className="hidden sm:block" />
          <span className="italic normal-case tracking-normal text-gray-500 font-serif text-lg ml-1">
            where flowers meet forever
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <Link
            href="/catalogue"
            className="bg-brand text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Collection
          </Link>
          <Link
            href="/story"
            className="bg-transparent border border-ink/20 text-ink px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/50 transition-all hover:border-black"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 animate-bounce opacity-60 z-10">
        <span className="text-[11px] tracking-[0.3em] uppercase text-gray-500 font-medium">
          Discover
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </section>
  );
}
