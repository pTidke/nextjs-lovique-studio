import type { Metadata } from "next";

export const SITE_NAME = "Lovique Studio";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lovique-studio.vercel.app"
).replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Wrapped in grace, sealed with love — where flowers meet forever.";

export const INSTAGRAM_URL = "https://instagram.com/lovique._studio";
// Opens a DM thread with the studio in the Instagram app / web
export const INSTAGRAM_DM_URL = "https://ig.me/m/lovique._studio";

const DEFAULT_OG_IMAGE = "/opengraph-image";

/**
 * Per-page metadata with matching Open Graph / Twitter tags, so shared links
 * show a proper title, description and preview image.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const images = image ? [image] : [DEFAULT_OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
