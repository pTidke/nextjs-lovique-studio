import Link from "next/link";
import { playfair, poppins } from "@/lib/fonts";
import { INSTAGRAM_DM_URL } from "@/lib/site";

// The real ordering flow (DM → confirm + UPI advance → handmade & shipped).
// Numbers are kept because the sequence is the information.
const STEPS = [
  {
    title: "Pick a piece — or an idea",
    body: "Choose from the collection, or tell us what you're dreaming of.",
  },
  {
    title: "Message us on Instagram",
    body: "We confirm the design and price together. An advance UPI payment locks in your order.",
  },
  {
    title: "Handmade & shipped",
    body: "We craft it in 4–5 days and ship it anywhere in India.",
  },
];

export default function HowItWorks({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-labelledby="how-ordering-works"
      className={compact ? "w-full" : "w-full py-20 md:py-28"}
    >
      <div className={compact ? "" : "mx-auto max-w-7xl px-6"}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="how-ordering-works"
            className={`${playfair.className} leading-tight text-ink ${compact ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"}`}
          >
            How ordering works
          </h2>
          {!compact && (
            <Link
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${poppins.className} text-sm font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:text-brand-dark hover:decoration-brand-dark`}
            >
              Message the studio
            </Link>
          )}
        </div>

        <ol className={`grid gap-8 md:grid-cols-3 md:gap-10 ${compact ? "mt-8" : "mt-12"}`}>
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-ink/15 pt-5">
              <span
                aria-hidden
                className={`${playfair.className} block text-3xl italic leading-none text-brand`}
              >
                {i + 1}
              </span>
              <h3 className={`${playfair.className} mt-3 text-xl text-ink md:text-2xl`}>{s.title}</h3>
              <p className={`${poppins.className} mt-2 text-[15px] leading-relaxed text-gray-600`}>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
