import { playfair, poppins } from "@/lib/fonts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { ProductSummary } from "@/sanity/types";

// "From the studio" row on the home page
export default function SignatureCollection({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 px-2 md:mb-14 md:px-0">
          <h2 className={`${playfair.className} text-4xl leading-tight text-ink md:text-5xl`}>
            From the studio
          </h2>
          <Link
            href="/catalogue"
            className={`${poppins.className} group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink hover:text-brand`}
          >
            See the full collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {products.map((product, i) => (
            // 2-up on phones: the third card would sit alone, so it appears from md
            <div key={product._id} className={i === 2 ? "hidden md:block" : undefined}>
              <ProductCard
                slug={product.slug.current}
                name={product.name}
                theme={product.theme}
                price={product.price}
                coverUrl={product.cover?.url}
                coverLqip={product.cover?.lqip}
                category={product.category}
                isNew={product.isNew}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
