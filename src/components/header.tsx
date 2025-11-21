"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

/* Inline icons */
function HamburgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 6l12 12M18 6l-12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/100 backdrop-blur-3xl bg-clip-padding border-b border-pink-100/70 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.5)]">
      <nav className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between relative">
        {/* Left: Logo + Name (desktop visible) */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Lovique Studio Logo"
              width={56}
              height={56}
              className="rounded-full object-cover cursor-pointer"
            />
          </Link>
          {/* Desktop name */}
          <Link
            href="/"
            className="hidden md:inline text-lg font-medium text-gray-800 hover:text-pink-500 transition-colors"
          >
            Lovique <span className="text-pink-500">Studio</span>
          </Link>
        </div>

        {/* Center: Mobile-only name (also a link) */}
        <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
          <Link
            href="/"
            className="text-lg font-medium text-gray-800 hover:text-pink-500 transition-colors"
          >
            Lovique <span className="text-pink-500">Studio</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-md">
          <NavLinks pathname={pathname} />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 hover:text-pink-500 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <CloseIcon className="w-7 h-7" />
          ) : (
            <HamburgerIcon className="w-7 h-7" />
          )}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`md:hidden absolute left-0 right-0 top-17.5 border-t border-pink-100/70 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } bg-white/100 backdrop-blur-3xl bg-clip-padding bg-gradient-to-b from-pink-50/90 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.5)]`}
      >
        <div className="flex flex-col items-center gap-4 text-md text-gray-700">
          <NavLinks
            pathname={pathname}
            onLinkClick={() => setMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}

/* Shared Nav Links */
function NavLinks({
  pathname,
  onLinkClick,
}: {
  pathname?: string;
  onLinkClick?: () => void;
}) {
  const base = "hover:text-pink-500 transition-colors";
  return (
    <>
      <Link
        href="/#bouquets"
        onClick={onLinkClick}
        className={`${base} ${
          pathname === "/" ? "text-pink-500" : "text-gray-700"
        }`}
      >
        Bouquets
      </Link>

      <Link
        href="/testimonials"
        onClick={onLinkClick}
        className={`${base} ${
          pathname === "/testimonials" ? "text-pink-500" : "text-gray-700"
        }`}
      >
        Testimonials
      </Link>

      <a
        href="https://www.instagram.com/lovique._studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noopener noreferrer"
        onClick={onLinkClick}
        className={`${base} text-gray-700`}
      >
        Instagram
      </a>
    </>
  );
}
