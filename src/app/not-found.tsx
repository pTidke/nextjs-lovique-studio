import Link from "next/link";
import { playfair, poppins } from "@/lib/fonts";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <span
        className={`${poppins.className} text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-brand mb-4`}
      >
        Page Not Found
      </span>
      <h1
        className={`${playfair.className} italic text-7xl md:text-9xl text-ink mb-6`}
      >
        404
      </h1>
      <p
        className={`${poppins.className} text-sm md:text-base text-gray-500 font-light max-w-md mb-10 leading-relaxed`}
      >
        The page you&apos;re looking for seems to have wandered off. Let us
        guide you back to our collection.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/catalogue"
          className="bg-brand text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl"
        >
          Explore Collection
        </Link>
        <Link
          href="/"
          className="bg-transparent border border-ink/20 text-ink px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/50 transition-all hover:border-black"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
