import "./globals.css";
import type { Metadata } from "next";
import { playfair, poppins } from "@/lib/fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GlobalPetals from "@/components/global-petals"; // client-only petals wrapper
import ScrollReset from "@/components/scroll-reset";
import NavigationTracker from "@/components/navigation-tracker";
import MotionProvider from "@/components/motion-provider";

export const metadata: Metadata = {
  title: "Lovique Studio",
  description:
    "Wrapped in grace, sealed with love — where flowers meet forever.",
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
          <ScrollReset />
          <div className="flex-1 relative z-10">{children}</div>

          {/* Footer */}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
