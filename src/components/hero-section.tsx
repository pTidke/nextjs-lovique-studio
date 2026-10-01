import Link from "next/link";
import type { CSSProperties } from "react";
import { playfair, poppins } from "@/lib/fonts";
import AmbientBlob from "@/components/ambient-blob";
import GlobalPetals from "@/components/global-petals";
import SanityImage from "@/components/sanity-image";
import { INSTAGRAM_DM_URL } from "@/lib/site";
import type { ProductSummary } from "@/sanity/types";

// Fan positions for up to three photos: left, centre (front), right
const FAN = [
  { r: "-9deg", x: "-58%", y: "6%", z: 1 },
  { r: "1.5deg", x: "0%", y: "0%", z: 3 },
  { r: "8deg", x: "58%", y: "8%", z: 2 },
];

export default function HeroSection({ products }: { products: ProductSummary[] }) {
  const photos = products.filter((p) => p.cover?.url).slice(0, 3);
  // With fewer than 3 photos keep the front slot filled first
  const slots = photos.length === 3 ? [0, 1, 2] : photos.length === 2 ? [0, 2] : [1];

  return (
    <section className="relative w-full overflow-hidden bg-white lg:min-h-svh">
      {/* Soft brand glows + a few drifting petals */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <AmbientBlob
          size={640}
          color="rgb(238 43 140 / 0.22)"
          core={30}
          className="top-[calc(-8%-120px)] left-[calc(-6%-120px)]"
          dx={40}
          dy={50}
          scale={1.12}
          duration={8}
        />
        <AmbientBlob
          size={720}
          color="rgb(253 228 238 / 0.9)"
          core={30}
          className="bottom-[calc(-8%-140px)] right-[calc(-6%-140px)]"
          dx={-50}
          dy={-40}
          scale={1.15}
          duration={10}
        />
        <GlobalPetals />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-28 md:pt-32 lg:min-h-svh lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-20">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <h1
            className={`${playfair.className} text-[2.6rem] leading-[1.05] tracking-[-0.01em] text-ink [text-wrap:balance] sm:text-6xl lg:text-[5.25rem]`}
          >
            Handmade flowers,{" "}
            <em className="text-brand">made for your person.</em>
          </h1>
          <p
            className={`${poppins.className} mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-gray-600 md:text-lg lg:mx-0 lg:max-w-lg`}
          >
            Satin-ribbon, crochet and paper bouquets that never wilt — themed
            around the people you love, made to order and shipped across India.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="/catalogue"
              className={`${poppins.className} inline-flex min-h-12 items-center rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(212,27,118,0.6)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:text-white`}
            >
              Explore the collection
            </Link>
            <Link
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${poppins.className} inline-flex min-h-12 items-center rounded-full border border-ink/20 bg-white/60 px-7 text-sm font-semibold text-ink transition-colors hover:border-ink hover:text-ink`}
            >
              Plan a custom gift
            </Link>
          </div>
        </div>

        {/* Photo fan — real pieces from the studio */}
        {photos.length > 0 && (
          <figure className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-lg">
            <div className="relative mx-auto aspect-[4/5] w-[58%]">
              {photos.map((p, i) => {
                const pos = FAN[slots[i]];
                return (
                  <Link
                    key={p._id}
                    href={`/product/${p.slug.current}`}
                    className="hero-fan-card absolute inset-0 block rounded-[1.25rem] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(42,27,27,0.45)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-16px_rgba(42,27,27,0.5)] md:p-2"
                    style={
                      {
                        "--r": pos.r,
                        "--x": pos.x,
                        "--y": pos.y,
                        zIndex: pos.z,
                        animationDelay: `${120 + i * 90}ms`,
                      } as CSSProperties
                    }
                  >
                    <span className="relative block h-full w-full overflow-hidden rounded-2xl bg-blush-deep">
                      <SanityImage
                        src={p.cover!.url!}
                        lqip={p.cover?.lqip}
                        alt={p.name.trim()}
                        fill
                        priority
                        sizes="(min-width: 1024px) 300px, 45vw"
                        className="object-cover"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
            <figcaption
              className={`${playfair.className} mt-10 text-center text-base italic text-ink-soft md:mt-12 md:text-lg`}
            >
              Wrapped in grace, sealed with love.
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
