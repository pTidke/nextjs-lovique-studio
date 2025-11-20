import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import Carousel from "@/components/carousel";
import { MessageCircle, Instagram } from "lucide-react"; // 👈 add this at top

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-500">
        <p>No product slug provided.</p>
      </section>
    );
  }

  const query = `
    *[_type == "product" && slug.current == $slug][0]{
      name,
      description,
      theme,
      images[]{asset->{url}},
      whatsappLink,
      instagramLink
    }
  `;
  const product = await client.fetch(query, { slug });

  if (!product) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <h2 className="text-xl font-medium mb-2">Product not found</h2>
        <p className="text-sm">
          Please check if this product is published in Sanity.
        </p>
      </section>
    );
  }

  const { name, description, theme, images, whatsappLink, instagramLink } =
    product;

  // ✅ Fallbacks if Sanity fields are missing/empty
  const WA_DEFAULT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""; // e.g. "15551234567"
  const IG_DEFAULT_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || ""; // e.g. "lovique.studio"

  const encodedMsg = encodeURIComponent(
    `Hi! I'm interested in "${name}". Could you share details & pricing?`
  );

  const waHref =
    (whatsappLink && whatsappLink.trim()) ||
    (WA_DEFAULT_NUMBER
      ? `https://wa.me/${WA_DEFAULT_NUMBER}?text=${encodedMsg}`
      : "");

  const igHref =
    (instagramLink && instagramLink.trim()) ||
    (IG_DEFAULT_HANDLE ? `https://instagram.com/${IG_DEFAULT_HANDLE}` : "");

  // Render
  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white md:pt-24 pt-16 pb-24 px-6 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT: Carousel */}
        {images?.length ? (
          <div className="flex justify-center lg:justify-end z-0">
            <Carousel images={images} name={name} />
          </div>
        ) : (
          <div className="flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}

        {/* RIGHT: Product Details */}
        <div className="relative z-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left flex flex-col justify-center space-y-6">
          <h1
            className={`${playfair.className} text-4xl -mt-6 md:mt-0 font-semibold text-gray-900`}
          >
            {name}
          </h1>

            {theme && (
            <span
                className="mt-2 self-start rounded-full bg-[var(--baby-pink-100)] text-[var(--baby-pink-600)]
                        px-4 py-1.5 text-sm font-medium tracking-wide border border-[var(--baby-pink-300)]
                        shadow-sm hover:shadow-md hover:bg-[var(--baby-pink-200)] transition
                        mx-auto lg:mx-0 w-auto"
            >
                {theme}
            </span>
            )}

            
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {description}
          </p>

          {/* 🌷 Action Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 pt-4">
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/917016171941?text=${encodeURIComponent(
                `Hi Lovique Studio! \n\nI'm interested in your *${name}* bouquet.\n\nHere’s the Instagram link: ${
                  instagramLink || "https://instagram.com/lovique.studio"
                }\n\nCould you please share more details?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-green-500 text-white px-4 py-2 font-medium tracking-wide hover:bg-green-600 transition shadow-md hover:shadow-lg btn-whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
              Enquire on WhatsApp
            </a>

            {/* Instagram Button */}
            {instagramLink && (
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-pink-400 text-pink-500 px-4 py-1.5 font-medium tracking-wide hover:bg-pink-50 transition shadow-md hover:shadow-lg"
              >
                <Instagram className="w-5 h-5" />
                View on Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}