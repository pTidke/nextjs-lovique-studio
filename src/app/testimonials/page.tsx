import Link from "next/link";
import { client } from "@/sanity/client";
import type { Testimonial } from "@/sanity/types";
import { TESTIMONIALS } from "@/sanity/queries";
import { playfair, poppins } from "@/lib/fonts";
import SanityImage from "@/components/sanity-image";
import type { Metadata } from "next";
import { INSTAGRAM_DM_URL, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Testimonials — Lovique Studio",
  description:
    "Kind words from people who gifted Lovique Studio's handmade forever flowers — themed bouquets, keepsakes and custom pieces.",
  path: "/testimonials",
});

export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await client.fetch<Testimonial[]>(TESTIMONIALS);

  return (
    <main className="min-h-screen bg-white pb-24">
      <header className="px-6 pb-12 pt-28 text-center md:pb-16 md:pt-36">
        <h1 className={`${playfair.className} text-5xl italic leading-tight text-ink md:text-7xl`}>
          Kind words
        </h1>
        <p className={`${poppins.className} mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-600`}>
          From the people we&apos;ve made flowers for — and the people they gave them to.
        </p>
      </header>

      <section aria-label="Customer testimonials" className="mx-auto max-w-7xl px-4 md:px-6">
        {testimonials.length ? (
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <figure
                key={t._id}
                className="mb-6 break-inside-avoid rounded-2xl bg-blush-deep px-6 py-7 md:px-7"
              >
                <blockquote
                  className={`${playfair.className} text-lg italic leading-relaxed text-ink`}
                >
                  &ldquo;{t.message.trim()}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {t.pfp ? (
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <SanityImage src={t.pfp} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className={`${playfair.className} flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg text-brand`}
                    >
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <span className={poppins.className}>
                    <span className="block text-sm font-semibold text-ink">{t.name}</span>
                    {t.date && (
                      <span className="block text-xs text-gray-600">
                        {new Date(t.date).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
                      </span>
                    )}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className={`${poppins.className} py-20 text-center text-gray-600`}>
            No testimonials yet — your story could be the first.
          </p>
        )}
      </section>

      <section className="mx-auto mt-16 max-w-xl px-6 text-center md:mt-24">
        <h2 className={`${playfair.className} text-3xl text-ink md:text-4xl`}>
          Your person could be next
        </h2>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/catalogue"
            className={`${poppins.className} inline-flex min-h-12 items-center rounded-full bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-dark hover:text-white`}
          >
            Explore the collection
          </Link>
          <Link
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${poppins.className} inline-flex min-h-12 items-center rounded-full border border-ink/20 px-7 text-sm font-semibold text-ink transition-colors hover:border-ink hover:text-ink`}
          >
            Plan a custom gift
          </Link>
        </div>
      </section>
    </main>
  );
}
