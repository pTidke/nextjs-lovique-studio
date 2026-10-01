import AmbientBlob from "@/components/ambient-blob";

export default function BrandBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 🌸 Animated Blobs Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AmbientBlob
          size={820}
          color="rgb(238 43 140 / 0.15)"
          core={22}
          className="top-[calc(-10%-160px)] left-[calc(-10%-160px)]"
          dx={30}
          dy={40}
          scale={1.1}
          duration={6}
        />
        <AmbientBlob
          size={960}
          color="rgb(233 213 255 / 0.2)"
          core={25}
          className="bottom-[calc(-10%-180px)] right-[calc(-10%-180px)]"
          dx={-40}
          dy={-30}
          scale={1.2}
          duration={7.5}
        />
      </div>

      {/* 🌫️ Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
