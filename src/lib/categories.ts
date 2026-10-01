// Single source of truth for product categories.
// Keys are the `category` values stored on products in Sanity — when adding a
// category in the Studio, add it here too (nav, card pill and page copy all read this).
type Category = {
  /** Page heading and nav label */
  title: string;
  /** Singular label for the pill on product cards */
  label: string;
  description: string;
};

export const categoryMap: Record<string, Category> = {
  singles: {
    title: "Singles",
    label: "Singles",
    description: "Elegant individual forever flowers, perfect for minimalist decor or a thoughtful small gesture.",
  },
  flower_basket: {
    title: "Flower Basket",
    label: "Flower Basket",
    description: "Charming baskets filled with a curated selection of forever flowers, designed for tabletop elegance.",
  },
  bouquets: {
    title: "Bouquets",
    label: "Bouquet",
    description: "Handcrafted forever flower bouquets that capture timeless emotions.",
  },
  flower_pots: {
    title: "Flower Pots",
    label: "Flower Pot",
    description: "Beautiful potted forever flower arrangements to elevate any space.",
  },
  magazine: {
    title: "Magazine",
    label: "Magazine",
    description: "Personalised magazine-style keepsakes, filled with your photos and words.",
  },
  wall_art: {
    title: "Wall Art",
    label: "Wall Art",
    description: "Stunning forever flower wall pieces that transform your walls into art.",
  },
};

/** Nav order */
export const categories = Object.entries(categoryMap).map(([slug, c]) => ({
  slug,
  ...c,
}));
