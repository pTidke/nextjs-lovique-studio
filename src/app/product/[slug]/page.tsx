import { client } from "@/sanity/client";
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

  const { name, description, theme, images, instagramLink } =
    product;

  // // ✅ Fallbacks if Sanity fields are missing/empty
  // const WA_DEFAULT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""; // e.g. "15551234567"
  // const IG_DEFAULT_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || ""; // e.g. "lovique.studio"

  // const encodedMsg = encodeURIComponent(
  //   `Hi! I'm interested in "${name}". Could you share details & pricing?`
  // );

  // Render
  return (
    <section className="min-h-[75vh] bg-gradient-to-b from-[var(--baby-pink-50)]/60 to-white md:pt-20 pt-16 pb-28 px-6 flex justify-center relative overflow-hidden">
      {/* Ambient background petals (optional aesthetic layer) */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,173,200,0.2)_0%,transparent_70%)]" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 md:gap-20 items-center">
        {/* LEFT — Product Image Carousel */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -inset-6 blur-3xl bg-[var(--baby-pink-100)]/40 rounded-full -z-10" />
          <Carousel images={images} name={name} />
        </div>

        {/* RIGHT — Product Info */}
        <div className="flex flex-col justify-center text-center lg:text-left px-4 lg:px-0 space-y-5 animate-[fade-up_0.7s_ease-out_forwards]">
          <h1
            className={`${playfair.className} text-4xl md:text-5xl font-semibold text-gray-900 leading-tight`}
          >
            {name}
          </h1>

          {theme && (
            <span
              className="mx-auto self-start lg:mx-0 inline-flex items-center gap-2 rounded-full bg-[var(--baby-pink-100)]
                     text-[var(--baby-pink-600)] px-4 py-1.5 text-sm font-medium tracking-wide
                     border border-[var(--baby-pink-300)] shadow-sm hover:shadow-md hover:bg-[var(--baby-pink-200)]
                     transition w-auto"
            >
              🌸 {theme}
            </span>
          )}

          <div className="h-[1px] bg-[var(--baby-pink-200)] w-24 mx-auto lg:mx-0 mt-2" />

          <p className="text-gray-600 leading-relaxed whitespace-pre-line max-w-md mx-auto lg:mx-0">
            {description}
          </p>

          {/* Action Buttons Container */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:mx-0 mx-8 lg:justify-start">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/917016171941?text=${encodeURIComponent(
                  `Hi Lovique Studio! \n\nI'm interested in your *${name}* bouquet.\n\nHere’s the Instagram link: ${
                    instagramLink || "https://instagram.com/lovique.studio"
                  }\n\nCould you please share more details?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-green-500 text-white px-5 py-2 font-medium tracking-wide hover:bg-green-400 transition shadow-md hover:shadow-lg btn-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
                Enquire on WhatsApp
              </a>

              {/* Instagram */}
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-pink-400 text-pink-500 px-5 py-1.5 font-medium tracking-wide hover:bg-pink-50 transition shadow-md hover:shadow-lg"
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
