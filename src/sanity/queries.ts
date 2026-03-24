export const PRODUCTS_GRID = /* groq */ `
*[_type == "product"] | order(select(isNew == true => 1, 0) desc, _createdAt desc){
  _id,
  name,
  theme,
  price,
  description,
  instagramLink,
  whatsappLink,
  category,
  isNew,
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
  whatsappLink,
  category,
  isNew,
  slug,
  "cover": images[0]{..., "url": asset->url}
}
`;

export const RELATED_PRODUCTS = /* groq */ `
*[_type == "product" && category == $category && slug.current != $slug] | order(_createdAt desc)[0...3]{
  _id,
  name,
  theme,
  slug,
  category,
  isNew,
  instagramLink,
  "cover": images[0]{..., "url": asset->url}
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
