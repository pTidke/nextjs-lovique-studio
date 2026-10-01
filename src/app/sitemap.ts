import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { categoryMap } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products: { slug: string; updatedAt: string }[] = await client.fetch(
    `*[_type == "product" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
  );

  const staticPages = ["", "/catalogue", "/story", "/testimonials", "/privacy", "/terms"];

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...Object.keys(categoryMap).map((slug) => ({
      url: `${SITE_URL}/category/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
