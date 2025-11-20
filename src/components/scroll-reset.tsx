"use client";
import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // if page loads with #bouquets in URL, reset to top
    if (window.location.hash === "#bouquets") {
      window.scrollTo({ top: 0 });
      // optional: clear hash from URL (no reload)
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return null;
}
