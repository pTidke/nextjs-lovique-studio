import { client } from "../../sanity/client";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { Quote } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await client.fetch(`
    *[_type == "testimonial"] | order(date desc) {
      _id,
      name,
      message,
      date,
      "pfp": pfp.asset->url
    }
  `);

  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50/40 to-white pt-24 pb-24 px-6">
      <div className="mx-auto max-w-6xl text-center mb-16">
        <h1
          className={`${playfair.className} text-5xl font-semibold text-gray-900`}
        >
          What Our Customers Say
        </h1>
        <p className="text-gray-500 mt-4 text-lg italic">
          Wrapped in grace, sealed with love — words from our happy customers.
        </p>
      </div>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {testimonials?.length ? (
          testimonials.map((t: any) => (
            <div
              key={t._id}
              className="relative bg-white/80 backdrop-blur-lg border border-pink-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Big Quotation Mark */}
              <Quote
                className="absolute top-6 left-6 text-pink-200 w-14 h-14"
                strokeWidth={1.5}
              />

              {/* Message */}
              <p className="relative z-10 text-gray-700 leading-relaxed text-lg mt-12 italic">
                “{t.message}”
              </p>

              {/* Footer */}
              <div className="mt-8 flex items-center gap-4">
                {t.pfp ? (
                  <Image
                    src={t.pfp}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover border border-pink-100 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-pink-100" />
                )}
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{t.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(t.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No testimonials yet — your story could be the first 🌸
          </p>
        )}
      </div>
    </section>
  );
}
