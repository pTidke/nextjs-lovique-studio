"use client";

import Image from "next/image";
import { playfair, poppins } from "@/lib/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LegalModal from "@/components/legal-modal";

export default function Footer() {
  const pathname = usePathname();
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);

  const privacyContent = (
    <>
      <section className="space-y-3">
        <h4 className="text-[#2a1b1b] font-medium uppercase tracking-widest text-xs">
          01. Information Collection
        </h4>
        <p>
          We collect information that you provide directly to us when you
          enquire via WhatsApp or Instagram, or contact our studio. This may
          include your name, phone number, delivery address, and order details.
        </p>
      </section>
      <section className="space-y-3">
        <h4 className="text-[#2a1b1b] font-medium uppercase tracking-widest text-xs">
          02. How We Use Information
        </h4>
        <p>
          Your information is used strictly to process orders, facilitate
          delivery, and improve your studio experience! We never sell or share
          your personal data with third parties for marketing purposes.
        </p>
      </section>
      <section className="space-y-3">
        <h4 className="text-[#2a1b1b] font-medium uppercase tracking-widest text-xs">
          03. Studio Security
        </h4>
        <p>
          We take reasonable measures to protect your personal information.
          Payments are accepted via UPI with advance payment required to
          confirm your order. We never store your payment details.
        </p>
      </section>
    </>
  );

  const termsContent = (
    <>
      <section className="space-y-3">
        <h4 className="text-[#2a1b1b] font-medium uppercase tracking-widest text-xs">
          01. Custom Commissions
        </h4>
        <p>
          Each arrangement is a custom work of art, handcrafted with forever
          flowers. While the final product will closely match the catalog
          images, slight variations may occur as each piece is made by hand.
        </p>
      </section>
      <section className="space-y-3">
        <h4 className="text-[#2a1b1b] font-medium uppercase tracking-widest text-xs">
          02. Orders & Delivery
        </h4>
        <p>
          Please place orders at least 4–5 days in advance to ensure timely
          preparation and delivery. Orders placed with less than 1 day&apos;s notice
          may be subject to additional rush charges. We are not responsible for
          delivery delays once the flowers have left our studio, or if the
          recipient is unavailable at the time of delivery.
        </p>
      </section>
      <section className="space-y-3">
        <h4 className="text-[#2a1b1b] font-medium uppercase tracking-widest text-xs">
          03. Care & Lifespan
        </h4>
        <ul className="space-y-2 list-none">
          <li className="flex items-start gap-2">
            <span className="text-[#ee2b8c] mt-1 text-[5px]">●</span>
            <span>Requires minimal care with no watering or sunlight needed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ee2b8c] mt-1 text-[5px]">●</span>
            <span>Maintains its beauty, shape, and richness over time</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ee2b8c] mt-1 text-[5px]">●</span>
            <span>Protected from dust and moisture for long-lasting elegance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ee2b8c] mt-1 text-[5px]">●</span>
            <span>Designed with forever flowers that offer an extended, timeless lifespan</span>
          </li>
        </ul>
      </section>
    </>
  );

  return (
    <footer className="w-full bg-white">
      {/* 🌸 Studio / Pre-Footer Section (Homepage Only) */}
      {pathname === "/" && (
        <section className="bg-[#fffafa] py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left: Illustration */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <Image
                  src="/florist-animate.svg"
                  alt="Lovique Florist Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <span
                  className={`${poppins.className} text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c]`}
                >
                  Luxury Minimalism
                </span>
                <h2
                  className={`${playfair.className} italic text-4xl md:text-5xl lg:text-6xl text-[#2a1b1b] leading-tight`}
                >
                  Crafted with <br className="hidden md:block" /> Intention
                </h2>
              </div>

              <p
                className={`${poppins.className} text-sm md:text-base text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0`}
              >
                Our studio specializes in monochromatic palettes and soft
                textures. We believe that simplicity is the ultimate form of
                elegance, letting the beauty of each handcrafted piece speak
                for itself.
              </p>

              <Link
                href="/story"
                className="bg-[#4a3f3f] text-white px-10 py-4 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md hover:shadow-lg hover:text-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 🏛️ Ultra-Minimalist Footer Section */}
      <section className="py-8 px-6 border-t border-gray-50 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3
            className={`${playfair.className} text-2xl md:text-3xl text-[#2a1b1b]`}
          >
            Lovique Studio
          </h3>
          <p
            className={`${poppins.className} text-xs md:text-sm text-gray-400 leading-relaxed`}
          >
            A minimalist studio for high end floristry{" "}
            <br className="hidden md:block" />
            Based on forever life stories.
          </p>
        </div>
      </section>

      {/* 📜 Compact Bottom Bar */}
      <section className="py-8 px-6 border-t border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <p
              className={`${poppins.className} text-[9px] font-medium tracking-widest uppercase text-gray-300`}
            >
              © {new Date().getFullYear()} Lovique Studio.
            </p>
            <a
              href="https://storyset.com/people"
              target="_blank"
              rel="noopener noreferrer"
              className={`${poppins.className} text-[8px] tracking-widest uppercase text-gray-300 hover:text-[#ee2b8c] transition-colors`}
            >
              Illustrations by Storyset
            </a>
          </div>
          <div className="flex gap-6 md:gap-8">
            {[
              {
                label: "Privacy",
                action: () =>
                  setModalContent({
                    title: "Privacy Policy",
                    content: privacyContent,
                  }),
              },
              {
                label: "Terms",
                action: () =>
                  setModalContent({
                    title: "Terms of Service",
                    content: termsContent,
                  }),
              },
              {
                label: "Contact",
                href: "https://instagram.com/lovique._studio",
              },
            ].map((item) => {
              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    className={`${poppins.className} text-[9px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#2a1b1b] transition-colors`}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`${poppins.className} text-[9px] font-bold tracking-widest uppercase text-gray-400 hover:text-[#2a1b1b] transition-colors`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <LegalModal
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title || ""}
        content={modalContent?.content}
      />
    </footer>
  );
}
