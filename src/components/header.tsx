"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useId, useCallback } from "react";
import { Instagram, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDialog } from "@/lib/use-dialog";
import { categories } from "@/lib/categories";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* Mobile menu: Escape closes, body scroll locked, focus moves into menu.
     No focus trap — the close (X) toggle lives in the header outside the overlay. */
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDialog(menuRef, menuOpen, closeMenu, { trapFocus: false });

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
            <span className="hidden md:block text-lg font-serif text-ink tracking-wide">
              Lovique Studio
            </span>
          </Link>

          {/* Mobile Only: Centered Title */}
          <Link
            href="/"
            className="md:hidden absolute left-1/2 -translate-x-1/2 z-50 text-lg font-serif text-ink tracking-wide whitespace-nowrap"
          >
            Lovique Studio
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <NavLinks pathname={pathname} />
          </div>

          {/* Right Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-5 text-ink-soft">
            <Link
              href="https://instagram.com/lovique._studio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lovique Studio on Instagram"
              className="hover:text-brand transition"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden z-50 text-ink p-2 -mr-2 transition-colors hover:text-brand"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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
            ref={menuRef}
            id="mobile-menu"
            tabIndex={-1}
            aria-label="Menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-blush-deep px-6 pb-8 pt-24 outline-none md:hidden"
          >
            <div className="flex flex-col gap-4 text-center items-center">
              <NavLinks
                pathname={pathname}
                isMobile
                onLinkClick={() => setMenuOpen(false)}
              />
            </div>

            {/* Mobile Footer Actions */}
            <div className="mt-auto flex flex-col gap-4 items-center border-t border-ink/10 pt-8">
              <div className="flex gap-10 text-ink-soft">
                <Link
                  href="https://instagram.com/lovique._studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-brand"
                >
                  <Instagram className="h-5 w-5" /> Instagram
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
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);
  const categoriesId = useId();
  // Base styles for links
  const baseLinkStyle = isMobile
    ? "text-lg font-medium text-ink py-3"
    : "text-sm font-medium text-ink-soft hover:text-ink transition-colors flex items-center gap-1 min-h-11";

  // Current page: brand colour on mobile, a pink underline on desktop
  const activeStyle = isMobile
    ? "text-brand"
    : "text-ink underline decoration-brand decoration-2 underline-offset-[6px]";
  const onCategoryPage = pathname?.startsWith("/category/");

  return (
    <>
      <Link
        href="/catalogue"
        onClick={onLinkClick}
        className={`${baseLinkStyle} ${pathname === "/catalogue" ? activeStyle : ""}`}
      >
        Collection
      </Link>

      {/* Categories Dropdown */}
      <div
        className={`relative flex flex-col items-center ${isMobile ? "w-full" : ""}`}
        onMouseEnter={() => !isMobile && setCategoriesOpen(true)}
        onMouseLeave={() => !isMobile && setCategoriesOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && categoriesOpen) {
            e.stopPropagation();
            setCategoriesOpen(false);
            categoriesButtonRef.current?.focus();
          }
        }}
        onBlur={(e) => {
          // Desktop: close once keyboard focus leaves the dropdown
          if (!isMobile && !e.currentTarget.contains(e.relatedTarget as Node)) {
            setCategoriesOpen(false);
          }
        }}
      >
        <button
          ref={categoriesButtonRef}
          // Desktop opens on hover; click/Enter opens it for keyboard & touch users
          onClick={() => setCategoriesOpen((open) => (isMobile ? !open : true))}
          aria-expanded={categoriesOpen}
          aria-controls={categoriesId}
          className={`${baseLinkStyle} flex items-center justify-center gap-2 ${onCategoryPage ? activeStyle : ""}`}
        >
          Categories
          <ChevronDown
            className={`transition-transform duration-300 ${categoriesOpen ? "rotate-180" : ""} ${isMobile ? "w-4 h-4 text-ink-soft" : "w-3.5 h-3.5"}`}
          />
        </button>

        {/* Dropdown Content */}
        <AnimatePresence>
          {categoriesOpen && (
            <motion.div
              id={categoriesId}
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
                      ? "py-2 flex flex-col items-center"
                      : "bg-white rounded-2xl shadow-[0_18px_40px_-16px_rgba(42,27,27,0.25)] border border-ink/5 p-2 mt-2"
                  }
                `}
              >
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={onLinkClick}
                    className={`
                      block transition-colors ${pathname === `/category/${c.slug}` ? "text-brand" : ""}
                      ${
                        isMobile
                          ? "text-base text-ink-soft py-2.5 hover:text-brand"
                          : "text-sm text-ink-soft px-4 py-2.5 rounded-xl hover:bg-blush-deep hover:text-brand"
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
