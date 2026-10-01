"use client";

import Image from "next/image";
import { playfair, poppins } from "@/lib/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INSTAGRAM_URL } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-white">
      {/* 🌸 Studio / Pre-Footer Section (Homepage Only) */}
      {pathname === "/" && (
        <section className="bg-blush py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left: Illustration */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <Image
                  src="/florist-animate.svg"
                  alt="Lovique Florist Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <span
                  className={`${poppins.className} text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-brand`}
                >
                  Luxury Minimalism
                </span>
                <h2
                  className={`${playfair.className} italic text-4xl md:text-5xl lg:text-6xl text-ink leading-tight`}
                >
                  Crafted with <br className="hidden md:block" /> Intention
                </h2>
              </div>

              <p
                className={`${poppins.className} text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0`}
              >
                Our studio specializes in monochromatic palettes and soft
                textures. We believe that simplicity is the ultimate form of
                elegance, letting the beauty of each handcrafted piece speak
                for itself.
              </p>

              <Link
                href="/story"
                className="bg-ink-soft text-white px-10 py-4 rounded-full text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md hover:shadow-lg hover:text-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 🏛️ Ultra-Minimalist Footer Section */}
      <section className="py-8 px-6 border-t border-gray-50 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3
            className={`${playfair.className} text-2xl md:text-3xl text-ink`}
          >
            Lovique Studio
          </h3>
          <p
            className={`${poppins.className} text-xs md:text-sm text-gray-500 leading-relaxed`}
          >
            A minimalist studio for high end floristry{" "}
            <br className="hidden md:block" />
            Based on forever life stories.
          </p>
        </div>
      </section>

      {/* 📜 Compact Bottom Bar */}
      <section className="py-8 px-6 border-t border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <p
              className={`${poppins.className} text-[11px] font-medium tracking-widest uppercase text-gray-500`}
            >
              © {new Date().getFullYear()} Lovique Studio.
            </p>
            <a
              href="https://storyset.com/people"
              target="_blank"
              rel="noopener noreferrer"
              className={`${poppins.className} text-[11px] tracking-widest uppercase text-gray-500 hover:text-brand transition-colors`}
            >
              Illustrations by Storyset
            </a>
          </div>
          <nav aria-label="Legal" className="flex gap-6 md:gap-8">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Contact", href: INSTAGRAM_URL, external: true },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`${poppins.className} text-[11px] font-bold tracking-widest uppercase text-gray-500 hover:text-ink transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </footer>
  );
}
