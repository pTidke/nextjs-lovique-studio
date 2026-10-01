// Shared projection for a product's first image, incl. a tiny blurred preview (LQIP)
const COVER = /* groq */ `"cover": images[0]{..., "url": asset->url, "lqip": asset->metadata.lqip}`;

export const PRODUCTS_GRID = /* groq */ `
*[_type == "product"] | order(select(isNew == true => 1, 0) desc, _createdAt desc){
  _id,
  name,
  theme,
  price,
  description,
  instagramLink,
  category,
  isNew,
  slug,
  ${COVER}
}
`;

export const NEW_ARRIVALS = /* groq */ `
*[_type == "product" && isNew == true] | order(_createdAt desc)[0...3]{
  _id,
  name,
  theme,
  price,
  instagramLink,
  category,
  isNew,
  slug,
  ${COVER}
}
`;

export const PRODUCT_BY_SLUG = /* groq */ `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  theme,
  price,
  description,
  slug,
  images[]{..., "url": asset->url, "lqip": asset->metadata.lqip},
  instagramLink,
  category,
  isNew
}
`;


export const PRODUCTS_BY_CATEGORY = /* groq */ `
*[_type == "product" && category == $category] | order(select(isNew == true => 1, 0) desc, _createdAt desc){
  _id,
  name,
  theme,
  price,
  description,
  instagramLink,
  category,
  isNew,
  slug,
  ${COVER}
}
`;

export const RELATED_PRODUCTS = /* groq */ `
*[_type == "product" && category == $category && slug.current != $slug] | order(_createdAt desc)[0...3]{
  _id,
  name,
  theme,
  price,
  slug,
  category,
  isNew,
  instagramLink,
  ${COVER}
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
