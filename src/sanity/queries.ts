export const PRODUCTS_GRID = /* groq */ `
*[_type == "product"] | order(_createdAt desc){
  _id,
  name,
  theme,
  slug,
  "cover": images[0]{..., "url": asset->url}
}
`;

export const PRODUCT_BY_SLUG = /* groq */ `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  theme,
  description,
  slug,
  images[]{..., "url": asset->url},
  whatsappLink,
  instagramLink
}
`;

export const TESTIMONIALS = /* groq */ `
*[_type == "testimonial"] | order(date desc){
  _id,
  name,
  message,
  "pfp": pfp.asset->url,
  date
}
`;
