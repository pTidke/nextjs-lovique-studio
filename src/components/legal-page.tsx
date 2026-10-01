import { playfair, poppins } from "@/lib/fonts";

// Shared layout for /privacy and /terms — header styled like Our Story
export default function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white animate-fade-up">
      <section className="bg-[#fffafa] pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
          <span
            className={`${poppins.className} text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c]`}
          >
            {eyebrow}
          </span>
          <h1
            className={`${playfair.className} italic text-5xl md:text-7xl text-[#2a1b1b] leading-tight`}
          >
            {title}
          </h1>
          <div className="w-16 h-px bg-[#ee2b8c]/30" />
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-20">
        <div
          className={`${poppins.className} text-sm md:text-base text-gray-600 leading-relaxed space-y-10`}
        >
          {children}
        </div>
      </section>
    </main>
  );
}
