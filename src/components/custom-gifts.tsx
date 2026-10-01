import Link from "next/link";
import { playfair, poppins } from "@/lib/fonts";
import { INSTAGRAM_DM_URL } from "@/lib/site";

// What can be personalised — confirmed by the studio (see PRODUCT.md)
const OPTIONS = [
  {
    title: "Themed bouquets",
    body: "Superheroes, fandoms, a favourite drink or snack — if they love it, we can make it bloom.",
  },
  {
    title: "Colours & flowers",
    body: "Choose the palette, the blooms and the size, down to the last petal.",
  },
  {
    title: "Photos & names",
    body: "Add their photos, a name or a little note that only they will understand.",
  },
  {
    title: "Add-ons",
    body: "Finish the gift with a teddy, chocolates, a card or fairy lights.",
  },
];

export default function CustomGifts() {
  return (
    <section className="relative w-full bg-blush-deep py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2
            className={`${playfair.className} text-4xl leading-tight text-ink [text-wrap:balance] md:text-5xl`}
          >
            Made for <em className="text-brand">your</em> person
          </h2>
          <p
            className={`${poppins.className} mt-5 max-w-md text-base leading-relaxed text-gray-600`}
          >
            Tell us who it&apos;s for — their favourite colour, the character
            they love, a photo you share — and we&apos;ll hand-make it into the
            piece. Most of our favourite orders started as a single message.
          </p>
          <Link
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${poppins.className} mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-ink-soft hover:text-white`}
          >
            Start a custom order
          </Link>
        </div>

        <dl className="divide-y divide-ink/10 border-y border-ink/10">
          {OPTIONS.map((o) => (
            <div key={o.title} className="grid gap-2 py-6 md:grid-cols-[12rem_1fr] md:gap-8 md:py-8">
              <dt className={`${playfair.className} text-2xl italic text-ink`}>{o.title}</dt>
              <dd className={`${poppins.className} text-[15px] leading-relaxed text-gray-600`}>
                {o.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
