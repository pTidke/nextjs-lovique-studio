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

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-white animate-fade-up">
      {/* Header Section */}
      <section className="bg-[#fffafa] pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <span
              className={`${poppins.className} text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#ee2b8c]`}
            >
              Est. 2025
            </span>
            <h1
              className={`${playfair.className} italic text-5xl md:text-7xl lg:text-9xl text-[#2a1b1b] leading-tight`}
            >
              Our Story
            </h1>
          </div>

          <div className="w-16 h-px bg-[#ee2b8c]/30" />

          <p
            className={`${playfair.className} text-xl md:text-2xl lg:text-3xl text-gray-500 italic max-w-3xl leading-relaxed`}
          >
            {
              '"Where flowers meet forever, wrapped in grace and sealed with love."'
            }
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-3xl mx-auto px-6 py-32 space-y-24">
        {/* Philosophy */}
        <div className="space-y-8">
          <h2
            className={`${playfair.className} text-3xl md:text-4xl text-[#2a1b1b]`}
          >
            A Vision of Minimalist Artistry
          </h2>
          <div className="space-y-6">
            <p
              className={`${poppins.className} text-sm md:text-base text-gray-400 leading-relaxed font-light`}
            >
              {
                "Lovique Studio was born from a simple belief: that nature's beauty doesn't need competition. We believe in luxury through restraint, focusing on monochromatic palettes, subtle textures, and the unique architecture of every stem."
              }
            </p>
            <p
              className={`${poppins.className} text-sm md:text-base text-gray-400 leading-relaxed font-light`}
            >
              {
                "Each arrangement is handcrafted in our city-center studio, with a dedication to sustainable sourcing and the timeless elegance of premium florals. We don't just create bouquets; we craft moments of serenity."
              }
            </p>
          </div>
        </div>

        {/* The Studio */}
        <div className="space-y-8">
          <h2
            className={`${playfair.className} text-3xl md:text-4xl text-[#2a1b1b]`}
          >
            The Studio Experience
          </h2>
          <p
            className={`${poppins.className} text-sm md:text-base text-gray-400 leading-relaxed font-light`}
          >
            {
              "Our studio is a sanctuary of creativity and calm. We invite you to explore our signature collections, participate in our seasonal workshops, and discover the intentionality behind every petal we place."
            }
          </p>
        </div>
      </section>
    </main>
  );
}
