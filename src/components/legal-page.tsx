import { playfair, poppins } from "@/lib/fonts";

// Shared layout for /privacy and /terms
export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white pb-24">
      <header className="bg-blush-deep px-6 pb-14 pt-28 text-center md:pb-16 md:pt-36">
        <h1 className={`${playfair.className} text-5xl italic leading-tight text-ink md:text-6xl`}>
          {title}
        </h1>
      </header>

      <div
        className={`${poppins.className} mx-auto max-w-2xl space-y-10 px-6 pt-14 text-base leading-relaxed text-gray-700 md:pt-16`}
      >
        {children}
      </div>
    </main>
  );
}
