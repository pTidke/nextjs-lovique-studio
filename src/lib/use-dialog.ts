"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Shared behaviour for overlays (lightbox, modal, mobile menu) while `open`:
 * Escape closes, page scroll is locked, focus moves inside and (optionally)
 * Tab is trapped there, and focus returns to the opener on close.
 */
export function useDialog(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
  { trapFocus = true }: { trapFocus?: boolean } = {},
) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

    // Wait a frame so AnimatePresence has mounted the content
    const raf = requestAnimationFrame(() => {
      (focusables()[0] ?? ref.current)?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (!trapFocus || e.key !== "Tab" || !ref.current) return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (!ref.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [open, ref, trapFocus]);
}
