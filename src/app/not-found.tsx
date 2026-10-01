import Link from "next/link";
import { playfair, poppins } from "@/lib/fonts";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <h1
        className={`${playfair.className} italic text-7xl md:text-9xl text-ink mb-6`}
      >
        <span className="sr-only">Page not found — </span>404
      </h1>
      <p
        className={`${poppins.className} text-sm md:text-base text-gray-600 max-w-md mb-10 leading-relaxed`}
      >
        The page you&apos;re looking for seems to have wandered off. Let us
        guide you back to our collection.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/catalogue"
          className={`${poppins.className} inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-dark hover:text-white`}
        >
          Explore the collection
        </Link>
        <Link
          href="/"
          className={`${poppins.className} inline-flex min-h-12 items-center justify-center rounded-full border border-ink/20 px-7 text-sm font-semibold text-ink transition-colors hover:border-ink hover:text-ink`}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
