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
      <span
        className={`${poppins.className} text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c] mb-4`}
      >
        Something Went Wrong
      </span>
      <h1
        className={`${playfair.className} italic text-5xl md:text-7xl text-[#2a1b1b] mb-6`}
      >
        A Petal Fell
      </h1>
      <p
        className={`${poppins.className} text-sm md:text-base text-gray-500 font-light max-w-md mb-10 leading-relaxed`}
      >
        We couldn&apos;t load this page just now. Please try again in a moment.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="bg-[#ee2b8c] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#d41b76] transition-all shadow-lg hover:shadow-xl"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-transparent border border-[#2a1b1b]/20 text-[#2a1b1b] px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/50 transition-all hover:border-black"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
