"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Instagram, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Animated Pill Container */}
        <motion.div
          initial={{
            y: 0,
            width: "100%",
            height: 64,
            borderRadius: "0px",
            backgroundColor: "rgba(255,255,255,0)",
          }}
          animate={{
            y: isScrolled ? 16 : 0,
            width: isScrolled ? "90%" : "100%",
            height: isScrolled ? 54 : 64,
            borderRadius: isScrolled ? "9999px" : "0px",
            backgroundColor: isScrolled
              ? "rgba(255,245,248,0.85)" // baby pink tint
              : "rgba(255,255,255,0)",
            boxShadow: isScrolled
              ? "0 10px 30px -10px rgba(0,0,0,0.1)"
              : "none",
          }}
          transition={{ duration: 0.5, ease: [0.2, 0.2, 0, 1] }}
          className={`
            pointer-events-auto mx-auto max-w-7xl px-6 md:px-8
            flex items-center justify-between relative
            border
          `}
          style={{
            backdropFilter: isScrolled ? "blur(16px) saturate(140%)" : "none",
            WebkitBackdropFilter: isScrolled
              ? "blur(16px) saturate(140%)"
              : "none",
            borderColor: isScrolled ? "rgba(255,255,255,0.5)" : "transparent",
          }}
        >
          {/* Logo: Left on Mobile, Combined on Desktop */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <Image
              src="/logo.png"
              alt="Lovique Studio Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="hidden md:block text-lg font-serif text-gray-900 tracking-wide">
              Lovique Studio
            </span>
          </Link>

          {/* Mobile Only: Centered Title */}
          <Link
            href="/"
            className="md:hidden absolute left-1/2 -translate-x-1/2 z-50 text-lg font-serif text-gray-900 tracking-wide whitespace-nowrap"
          >
            Lovique Studio
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <NavLinks pathname={pathname} />
          </div>

          {/* Right Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-5 text-gray-700">
            {/* <button className="hover:text-pink-500 transition">
              <Search className="w-5 h-5" />
            </button> */}
            <Link
              href="https://instagram.com/lovique._studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden z-50 text-gray-900 p-2 -mr-2 transition-colors hover:text-pink-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </motion.div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[rgba(255,245,248,0.7)] backdrop-blur-xl md:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-4 text-center items-center">
              <NavLinks
                pathname={pathname}
                isMobile
                onLinkClick={() => setMenuOpen(false)}
              />
            </div>

            {/* Mobile Footer Actions */}
            <div className="mt-auto flex flex-col gap-4 items-center border-t border-gray-100 pt-8">
              <div className="flex gap-10 text-gray-500">
                {/* <button className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest hover:text-pink-600 transition">
                  <Search className="w-5 h-5 mb-1" /> Search
                </button> */}
                <Link
                  href="https://instagram.com/lovique._studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest hover:text-pink-600 transition"
                >
                  <Instagram className="w-5 h-5 mb-1" /> Instagram
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ===================== Nav Links Component ===================== */

function NavLinks({
  pathname,
  onLinkClick,
  isMobile = false,
}: {
  pathname?: string;
  onLinkClick?: () => void;
  isMobile?: boolean;
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categories = [
    { title: "Singles", value: "singles" },
    { title: "Flower basket", value: "flower_basket" },
    { title: "Bouquets", value: "bouquets" },
    { title: "Flower pots", value: "flower_pots" },
    { title: "Magazine", value: "magazine" },
    { title: "Wall Art", value: "wall_art" },
  ];

  // Base styles for links
  const baseLinkStyle = isMobile
    ? "text-xs font-bold tracking-[0.2em] uppercase text-gray-800 py-3" // Reduced size, cleaner tracking
    : "text-xs font-bold tracking-[0.15em] uppercase text-gray-600 hover:text-black transition flex items-center gap-1";

  const activeStyle = isMobile ? "text-pink-600" : "text-black";

  return (
    <>
      <Link
        href="/catalogue"
        onClick={onLinkClick}
        className={`${baseLinkStyle} ${pathname === "/catalogue" ? activeStyle : ""}`}
      >
        Catalogue
      </Link>

      {/* Categories Dropdown */}
      <div
        className={`relative flex flex-col items-center ${isMobile ? "w-full" : ""}`}
        onMouseEnter={() => !isMobile && setCategoriesOpen(true)}
        onMouseLeave={() => !isMobile && setCategoriesOpen(false)}
      >
        <button
          onClick={() => isMobile && setCategoriesOpen(!categoriesOpen)}
          className={`${baseLinkStyle} flex items-center justify-center gap-2`}
        >
          Categories
          <ChevronDown
            className={`transition-transform duration-300 ${categoriesOpen ? "rotate-180" : ""} ${isMobile ? "w-4 h-4 text-gray-400" : "w-3 h-3"}`}
          />
        </button>

        {/* Dropdown Content */}
        <AnimatePresence>
          {(categoriesOpen || (!isMobile && categoriesOpen)) && (
            <motion.div
              initial={
                isMobile ? { height: 0, opacity: 0 } : { opacity: 0, y: 10 }
              }
              animate={
                isMobile ? { height: "auto", opacity: 1 } : { opacity: 1, y: 0 }
              }
              exit={
                isMobile ? { height: 0, opacity: 0 } : { opacity: 0, y: 10 }
              }
              className={`
                ${isMobile ? "overflow-hidden w-full" : "absolute left-1/2 -translate-x-1/2 pt-4 w-48"}
              `}
            >
              <div
                className={`
                  ${
                    isMobile
                      ? "py-4 flex flex-col gap-2 items-center bg-white/40 backdrop-blur-md rounded-2xl mb-4 border border-white/50 shadow-sm"
                      : "bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-pink-100/50 p-2 mt-2"
                  }
                `}
              >
                {categories.map((c) => (
                  <Link
                    key={c.value}
                    href={`/category/${c.value}`}
                    onClick={onLinkClick}
                    className={`
                      block hover:text-pink-600 transition
                      ${
                        isMobile
                          ? "text-[10px] tracking-[0.2em] uppercase text-gray-500 py-2" // Smaller text in dropdown
                          : "text-[11px] tracking-widest uppercase text-gray-600 px-4 py-2"
                      }
                    `}
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link
        href="/story"
        onClick={onLinkClick}
        className={`${baseLinkStyle} ${pathname === "/story" ? activeStyle : ""}`}
      >
        Our Story
      </Link>

      <Link
        href="/testimonials"
        onClick={onLinkClick}
        className={`${baseLinkStyle} ${pathname === "/testimonials" ? activeStyle : ""}`}
      >
        Testimonials
      </Link>
    </>
  );
}
