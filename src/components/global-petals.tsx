"use client";

import dynamic from "next/dynamic";

// dynamically import Petals but disable SSR
const Petals = dynamic(() => import("@/components/petals"), { ssr: false });

export default function GlobalPetals() {
  return <Petals count={22} />;
}
