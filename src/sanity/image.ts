import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource): string {
  // Ensures we always return a string URL
  return builder.image(source).auto("format").fit("max").url();
}

// 1200×630 JPEG for link previews: whole (portrait) photo, padded with the
// brand blush instead of cropped, so the bouquet is never cut off
export function ogImageUrl(source: SanityImageSource): string {
  return builder
    .image(source)
    .width(1200)
    .height(630)
    .fit("fill")
    .bg("fffafa")
    .format("jpg")
    .quality(80)
    .url();
}
