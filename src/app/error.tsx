"use client";

import Link from "next/link";
import { useEffect } from "react";
import { playfair, poppins } from "@/lib/fonts";

// Shown when a page throws (e.g. Sanity is unreachable) — matches not-found.tsx
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <h1
        className={`${playfair.className} italic text-5xl md:text-7xl text-ink mb-6`}
      >
        A Petal Fell
      </h1>
      <p
        className={`${poppins.className} text-sm md:text-base text-gray-600 max-w-md mb-10 leading-relaxed`}
      >
        We couldn&apos;t load this page just now. Please try again in a moment.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className={`${poppins.className} inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-dark hover:text-white`}
        >
          Try again
        </button>
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
