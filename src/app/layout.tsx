import "./globals.css";
import type { Metadata } from "next";
import { playfair, poppins } from "@/lib/fonts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GlobalPetals from "@/components/global-petals"; // client-only petals wrapper
import NavigationTracker from "@/components/navigation-tracker";
import MotionProvider from "@/components/motion-provider";

// Site-wide defaults; pages override via pageMetadata() (src/lib/site.ts)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} bg-white text-gray-900 antialiased relative min-h-screen flex flex-col`}
      >
        {/* Floating petals layer - positioned absolutely behind everything */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <GlobalPetals />
        </div>

        <MotionProvider>
          {/* Header */}
          <Header />
          <NavigationTracker />
          <div className="flex-1 relative z-10">{children}</div>

          {/* Footer */}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
