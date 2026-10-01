import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { TermsContent } from "@/components/legal-content";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service — Lovique Studio",
  description:
    "Ordering, delivery and care terms for Lovique Studio's handcrafted forever flower arrangements.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <TermsContent />
    </LegalPage>
  );
}
