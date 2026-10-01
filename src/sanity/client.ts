import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "gqkhy2kv",
  dataset: "production",
  apiVersion: "2024-01-01",
  // Edge-cached API; pages also revalidate on their own schedule (see `revalidate` exports)
  useCdn: true,
});
