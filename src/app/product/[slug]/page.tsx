import { client } from "@/sanity/client";
import ProductView from "@/components/product-view";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-500 bg-white">
        <p>No product slug provided.</p>
      </section>
    );
  }

  const query = `
    *[_type == "product" && slug.current == $slug][0]{
      name,
      description,
      theme,
      images[]{asset->{url}},
      whatsappLink,
      instagramLink
    }
  `;
  const product = await client.fetch(query, { slug });

  if (!product) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-gray-500 bg-white">
        <h2 className="text-2xl font-medium mb-4">Product not found</h2>
        <Link
          href="/"
          className="text-[#ee2b8c] hover:underline flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </section>
    );
  }

  return <ProductView product={product} />;
}
