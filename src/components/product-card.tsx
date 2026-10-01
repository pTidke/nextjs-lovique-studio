import Link from "next/link";
import { Flower2 } from "lucide-react";
import SanityImage from "@/components/sanity-image";
import { playfair, poppins } from "@/lib/fonts";
import { formatPrice } from "@/lib/utils";
import { categoryMap } from "@/lib/categories";

type Props = {
  slug: string;
  name: string;
  theme?: string;
  price?: number;
  coverUrl?: string;
  coverLqip?: string;
  category?: string;
  isNew?: boolean;
  /** Hide the category label (e.g. on that category's own page) */
  showCategory?: boolean;
  /** h2 when cards sit directly under the page h1, h3 inside a titled section */
  headingLevel?: 2 | 3;
  /** Next/Image sizes hint for the grid this card sits in */
  sizes?: string;
};

export function ProductCard({
  slug,
  name,
  theme,
  price,
  coverUrl,
  coverLqip,
  category,
  isNew,
  showCategory = true,
  headingLevel = 3,
  sizes = "(max-width: 1024px) 50vw, 33vw",
}: Props) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const categoryLabel = category ? categoryMap[category]?.label || category : null;

  return (
    // Whole card is clickable via the title link's ::after overlay, so it is a
    // real <a>: works with keyboard, middle-click / open in new tab, and prefetch.
    <article className="group relative flex flex-col rounded-2xl has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand">
      {/* Photo */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-blush-deep">
        {coverUrl ? (
          <SanityImage
            src={coverUrl}
            lqip={coverLqip}
            alt={name.trim()}
            fill
            sizes={sizes}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand/70">
            <Flower2 className="h-8 w-8" strokeWidth={1.25} />
            <span className={`${poppins.className} text-xs`}>Photo coming soon</span>
          </div>
        )}

        {isNew && (
          <span
            className={`${poppins.className} pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand shadow-[0_2px_8px_rgba(42,27,27,0.08)] md:left-4 md:top-4`}
          >
            New
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 px-1 pt-3 md:pt-4">
        {showCategory && categoryLabel && (
          <p
            className={`${poppins.className} text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-ink-soft/80`}
          >
            {categoryLabel}
          </p>
        )}
        <Heading className={`${playfair.className} text-lg leading-snug text-ink md:text-2xl`}>
          <Link
            href={`/product/${slug}`}
            className="hover:text-ink focus-visible:outline-none after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {name.trim()}
          </Link>
        </Heading>
        <p
          className={`${poppins.className} text-sm font-medium leading-snug ${price ? "text-brand md:text-base" : "text-ink-soft/80"}`}
        >
          {price ? formatPrice(price) : "Price on enquiry"}
        </p>
        {theme && (
          <p className={`${poppins.className} line-clamp-2 text-xs leading-relaxed text-gray-500 md:text-sm`}>
            {theme}
          </p>
        )}
      </div>
    </article>
  );
}
