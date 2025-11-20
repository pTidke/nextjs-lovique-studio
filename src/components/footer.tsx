import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"] });

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-10 text-center text-gray-600">
        <p className={`${playfair.className} text-lg text-gray-800`}>
          Wrapped in grace, sealed with love — where flowers meet forever.
        </p>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-500 transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-500 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="mailto:hello@lovique.studio"
            className="hover:text-rose-500 transition-colors"
          >
            Email
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} Lovique Studio. All rights reserved.
        </p>
        <a href="https://storyset.com/people" target="_blank" rel="noopener noreferrer" className="underline text-xs text-gray-400">
            People illustrations by Storyset
          </a>
      </div>
    </footer>
  );
}
