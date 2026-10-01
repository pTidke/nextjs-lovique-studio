# Lovique Studio

Website for [Lovique Studio](https://lovique-studio.vercel.app), a handcrafted forever-flower studio. Product, category and testimonial content comes from a separate **Sanity Studio**; this repo is the public Next.js site. Orders go through Instagram DMs (there is no cart).

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Sanity** via `next-sanity` (read-only, API CDN) and `@sanity/image-url`
- **Tailwind CSS v4**, `framer-motion`, `embla-carousel`
- Deployed on **Vercel**; every push to `main` goes live

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint
```

No env vars are required. Defaults live in code; to override them, copy `.env.example` to `.env.local`:

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `gqkhy2kv` | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity dataset |
| `NEXT_PUBLIC_SITE_URL` | `https://lovique-studio.vercel.app` | Canonical URL for link previews, sitemap and structured data. Set this if a custom domain is added. |

## How content flows

- Pages are prebuilt and **revalidate every 60 seconds**, so edits published in Sanity show up within about a minute. New products get a page on their first visit.
- Queries live in `src/sanity/queries.ts`, and their result types in `src/sanity/types.ts`. Keep the two in sync when you change a projection.
- Images are served resized from Sanity's CDN (`src/components/sanity-image.tsx`), with blurred placeholders (`lqip`).

### Adding a category

Categories are a fixed list on products in the Studio. When you add one there, also add it to **`src/lib/categories.ts`**: the nav, the card pill, the category page copy and the sitemap all read from that file.

## Project layout

```
src/
  app/                 routes: home, catalogue, category/[slug], product/[slug],
                       story, testimonials, privacy, terms
                       + sitemap.ts, robots.ts, opengraph-image.tsx, error.tsx
  components/          UI (product-card, product-view, carousel, header, footer…)
  lib/
    site.ts            site URL/name, Instagram links, pageMetadata() helper
    categories.ts      category slugs, labels and copy
    fonts.ts           Playfair Display + Poppins (declare fonts only here)
    use-dialog.ts      Escape / focus trap / scroll lock for overlays
    utils.ts           formatPrice, summarize, emoji filter
  sanity/              client, queries, types, image URL helpers
```

## Conventions

- **Colours:** use the theme tokens from `globals.css` (`text-brand`, `bg-blush`, `text-ink`, `border-ink/10`, …) rather than hex values.
- **Metadata:** build every page's metadata with `pageMetadata({ title, description, path })`, so link previews and canonical URLs stay correct.
- **Product cards:** use `ProductCard` everywhere. It is a real link: keyboard-accessible and openable in a new tab.
- **Motion:** respect reduced motion. CSS animations are disabled by the media query in `globals.css`, and framer-motion is covered by `MotionProvider`.
- **Search Console:** keep `public/googlec57e1505bdf77909.html`. Deleting it unverifies the site.
