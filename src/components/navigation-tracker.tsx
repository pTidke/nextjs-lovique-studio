"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Specifically track collection/category pages
    if (pathname.includes("/catalogue") || pathname.includes("/category/")) {
      sessionStorage.setItem("lastCollectionPath", pathname);
    }
  }, [pathname]);

  return null;
}
