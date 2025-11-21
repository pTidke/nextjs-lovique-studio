import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Playfair_Display } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500"],
//   variable: "--font-sans",
// });

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
});

type Props = {
  slug: string;
  name: string;
  theme?: string;
  coverUrl?: string;
};

export function ProductCard({ slug, name, theme, coverUrl }: Props) {
  return (
    <Link
      href={`/product/${slug}`}
      className="group block overflow-hidden rounded-2xl 
      bg-gradient-to-b from-[var(--baby-pink-50)]/80 to-white/90
      backdrop-blur-md shadow-sm
      hover:shadow-[0_0_15px_rgba(255,115,161,0.3)]
      transition-all duration-300"
    >
      <div className="relative aspect-[5/7] w-full">
        {/* Main Image */}
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-rose-50 text-gray-400">
            No image
          </div>
        )}

        {/* True fading blur overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none">
          {/* dark fade for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--baby-pink-200)]/60 via-[var(--baby-pink-50)]/30 to-transparent rounded-b-2xl" />
          {/* fading blur using mask gradient */}
          <div
            className="absolute inset-0 rounded-b-2xl"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <h3 className={`${playfair.variable} text-white text-lg font-medium leading-tight drop-shadow-sm`}>
            {name}
          </h3>
          {theme && (
            <Badge
              variant="secondary"
              className="bg-white/80 text-gray-800 text-xs font-medium backdrop-blur-sm border border-white/20"
            >
              {theme}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
