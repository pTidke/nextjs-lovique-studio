import Link from "next/link";
import { playfair, poppins } from "@/lib/fonts";
import type { Testimonial } from "@/sanity/types";

// A few real customer quotes (from Sanity). `compact` = single quote for product pages.
export default function KindWords({
  testimonials,
  compact = false,
}: {
  testimonials: Testimonial[];
  compact?: boolean;
}) {
  if (testimonials.length === 0) return null;

  if (compact) {
    const t = testimonials[0];
    return (
      <figure className="border-l-0">
        <blockquote
          className={`${playfair.className} text-lg italic leading-relaxed text-ink`}
        >
          &ldquo;{t.message.trim()}&rdquo;
        </blockquote>
        <figcaption className={`${poppins.className} mt-2 text-sm text-gray-600`}>
          — {t.name}
        </figcaption>
      </figure>
    );
  }

  return (
    <section className="w-full bg-blush py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={`${playfair.className} text-4xl leading-tight text-ink md:text-5xl`}>
            Kind words
          </h2>
          <Link
            href="/testimonials"
            className={`${poppins.className} text-sm font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:text-brand-dark hover:decoration-brand-dark`}
          >
            Read them all
          </Link>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {testimonials.map((t) => (
            <figure key={t._id} className="flex flex-col">
              <span aria-hidden className={`${playfair.className} text-5xl leading-none text-brand/40`}>
                &ldquo;
              </span>
              <blockquote
                className={`${playfair.className} -mt-3 text-xl italic leading-relaxed text-ink`}
              >
                {t.message.trim()}
              </blockquote>
              <figcaption className={`${poppins.className} mt-4 text-sm font-medium text-gray-600`}>
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
