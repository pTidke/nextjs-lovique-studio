import AmbientBlob from "@/components/ambient-blob";

// Two slow, soft brand-pink glows behind collection + product pages.
export default function BrandBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AmbientBlob
        size={820}
        color="rgb(238 43 140 / 0.10)"
        core={22}
        className="top-[calc(-10%-160px)] left-[calc(-10%-160px)]"
        dx={30}
        dy={40}
        scale={1.08}
        duration={9}
      />
      <AmbientBlob
        size={900}
        color="rgb(253 228 238 / 0.55)"
        core={25}
        className="bottom-[calc(-10%-180px)] right-[calc(-10%-180px)]"
        dx={-40}
        dy={-30}
        scale={1.1}
        duration={11}
      />
    </div>
  );
}
