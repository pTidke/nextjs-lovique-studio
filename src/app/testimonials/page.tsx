import { client } from "@/sanity/client";
import Image from "next/image";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const dynamic = "force-dynamic";
export const revalidate = 60;

type Testimonial = {
  _id: string;
  name: string;
  message: string;
  date: string;
  pfp?: string;
};

export default async function TestimonialsPage() {
  const testimonials: Testimonial[] = await client.fetch(`
    *[_type == "testimonial"] | order(date desc) {
      _id,
      name,
      message,
      date,
      "pfp": pfp.asset->url
    }
  `);

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section — Matching "Our Story" style */}
      <section className="bg-[#fffafa] pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 animate-[fade-up_0.7s_ease-out_forwards]">
          <div className="space-y-4">
            <span
              className={`${poppins.className} text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c]`}
            >
              Customer Stories
            </span>
            <h1
              className={`${playfair.className} italic text-5xl md:text-7xl lg:text-9xl text-[#2a1b1b] leading-tight`}
            >
              Testimonials
            </h1>
          </div>

          <div className="w-16 h-px bg-[#ee2b8c]/30" />

          <p
            className={`${playfair.className} text-xl md:text-2xl lg:text-3xl text-gray-500 italic max-w-3xl leading-relaxed`}
          >
            {
              '"Wrapped in grace, sealed with love — words from our happy customers."'
            }
          </p>
        </div>
      </section>

      {/* Testimonial Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {testimonials?.length ? (
            testimonials.map((t, index) => (
              <div
                key={t._id}
                className="group relative bg-[#fffafa]/50 backdrop-blur-sm border border-pink-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center text-center space-y-8 animate-[fade-up_1s_ease-out_forwards] hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Perfectly Circular Profile Image */}
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <div className="absolute inset-0 bg-[#ee2b8c]/5 rounded-full blur-2xl group-hover:bg-[#ee2b8c]/10 transition-colors" />
                  {t.pfp ? (
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-white shadow-sm">
                      <Image
                        src={t.pfp}
                        alt={t.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-full bg-white border border-pink-50 flex items-center justify-center text-pink-200">
                      <span className={`${playfair.className} text-3xl`}>
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Testimony Content */}
                <div className="space-y-6 max-w-xl">
                  <p
                    className={`${poppins.className} text-sm md:text-base text-gray-500 leading-relaxed font-light italic`}
                  >
                    {t.message}
                  </p>

                  <div className="space-y-1">
                    <h3
                      className={`${playfair.className} text-xl md:text-2xl text-[#2a1b1b] font-medium`}
                    >
                      {t.name}
                    </h3>
                    <p
                      className={`${poppins.className} text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300`}
                    >
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
            <div className="col-span-full py-20 text-center">
              <p className={`${poppins.className} text-gray-400`}>
                No testimonials yet — your story could be the first 🌸
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
