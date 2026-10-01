import { createClient } from "next-sanity";

// Public, read-only settings (safe to expose). Override per environment via
// .env.local / Vercel env vars — see .env.example.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gqkhy2kv";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  // Edge-cached API; pages also revalidate on their own schedule (see `revalidate` exports)
  useCdn: true,
});
