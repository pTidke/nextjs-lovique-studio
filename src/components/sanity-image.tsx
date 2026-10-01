"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

// Let Sanity's image CDN resize/convert (WebP/AVIF) instead of Next's optimizer
// pulling the full-size original on every cold cache.
function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}

type SanityImageProps = Omit<
  ImageProps,
  "loader" | "placeholder" | "blurDataURL"
> & {
  /** Base64 blurred preview from `asset->metadata.lqip` */
  lqip?: string;
};

export default function SanityImage({
  lqip,
  alt,
  ...props
}: SanityImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      loader={sanityLoader}
      {...(lqip ? { placeholder: "blur" as const, blurDataURL: lqip } : {})}
    />
  );
}
