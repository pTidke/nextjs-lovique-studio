// Shapes returned by the GROQ queries in ./queries.ts.
// Keep in sync with the projections there (and the Studio schema).

export type SanityImage = {
  _key?: string;
  asset: { _ref: string; _type?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  /** Projected: asset->url */
  url?: string;
  /** Projected: asset->metadata.lqip (tiny blurred base64 preview) */
  lqip?: string;
};

/** Card-sized product (PRODUCTS_GRID, PRODUCTS_BY_CATEGORY, HOME_PRODUCTS, RELATED_PRODUCTS, MORE_PRODUCTS) */
export type ProductSummary = {
  _id: string;
  name: string;
  slug: { current: string };
  theme?: string;
  price?: number;
  category?: string;
  isNew?: boolean;
  instagramLink?: string;
  cover?: { url?: string; lqip?: string };
};

/** Full product (PRODUCT_BY_SLUG) */
export type Product = Omit<ProductSummary, "cover"> & {
  description?: string;
  images?: SanityImage[];
};

/** TESTIMONIALS */
export type Testimonial = {
  _id: string;
  name: string;
  message: string;
  date: string;
  /** Projected: pfp.asset->url */
  pfp?: string;
};
