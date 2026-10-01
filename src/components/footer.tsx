"use client";

import Image from "next/image";
import { playfair, poppins } from "@/lib/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INSTAGRAM_DM_URL, INSTAGRAM_URL } from "@/lib/site";

const LINKS = [
  { label: "Collection", href: "/catalogue" },
  { label: "Our Story", href: "/story" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Instagram", href: INSTAGRAM_URL, external: true },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-white">
      {/* Closing invitation (home only) */}
      {pathname === "/" && (
        <section className="overflow-hidden bg-blush-deep px-6 py-20 md:py-28">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <div className="relative aspect-square w-full max-w-[22rem] lg:w-1/2 lg:max-w-[460px]">
              <Image
                src="/florist-animate.svg"
                alt="Illustration of a florist arranging a bouquet"
                fill
                className="object-contain"
              />
            </div>

            <div className="w-full text-center lg:w-1/2 lg:text-left">
              <h2
                className={`${playfair.className} text-4xl leading-tight text-ink [text-wrap:balance] md:text-5xl`}
              >
                Have someone <em className="text-brand">in mind?</em>
              </h2>
              <p
                className={`${poppins.className} mx-auto mt-5 max-w-md text-base leading-relaxed text-gray-600 lg:mx-0`}
              >
                Tell us about them — what they love, a colour, a memory — and
                we&apos;ll make something that&apos;s unmistakably theirs.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href={INSTAGRAM_DM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${poppins.className} inline-flex min-h-12 items-center rounded-full bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-dark hover:text-white`}
                >
                  Message the studio
                </Link>
                <Link
                  href="/story"
                  className={`${poppins.className} inline-flex min-h-12 items-center rounded-full border border-ink/20 px-7 text-sm font-semibold text-ink transition-colors hover:border-ink hover:text-ink`}
                >
                  Read our story
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-ink/5 px-6 py-12 md:py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <p className={`${playfair.className} text-2xl text-ink md:text-3xl`}>Lovique Studio</p>
            <p className={`${poppins.className} mt-2 max-w-xs text-sm leading-relaxed text-gray-600`}>
              Handmade forever flowers, made for your person. Shipped across India.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:grid-cols-3">
              {LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`${poppins.className} inline-flex min-h-11 items-center text-sm text-ink-soft transition-colors hover:text-brand`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className={`${poppins.className} mx-auto mt-10 flex max-w-7xl flex-col items-center gap-1 border-t border-ink/5 pt-6 text-xs text-gray-600 md:flex-row md:justify-between`}
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Lovique Studio · Wrapped in grace, sealed with love.
          </p>
          <a
            href="https://storyset.com/people"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center hover:text-brand"
          >
            Illustrations by Storyset
          </a>
        </div>
      </div>
    </footer>
  );
}
