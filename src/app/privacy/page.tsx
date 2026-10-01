import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { PrivacyContent } from "@/components/legal-content";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy — Lovique Studio",
  description:
    "How Lovique Studio collects, uses and protects your information when you order forever flowers.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <PrivacyContent />
    </LegalPage>
  );
}
