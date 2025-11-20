import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GlobalPetals from "@/components/global-petals"; // client-only petals wrapper
import ScrollReset from "@/components/scroll-reset";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
});

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

        {/* Header */}
        <Header />
        <ScrollReset />
        <main className="flex-1 pt-16 relative z-10">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
