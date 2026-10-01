import Link from "next/link";
import { poppins } from "@/lib/fonts";
import { categories } from "@/lib/categories";

// Horizontal category switcher for catalogue + category pages.
// Scrolls sideways on small screens instead of wrapping into a wall of pills.
export default function CategoryChips({ active }: { active?: string }) {
  const items = [{ slug: "", title: "All" }, ...categories];

  return (
    <nav aria-label="Categories" className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:px-0">
      <ul className="flex w-max gap-2 md:mx-auto md:w-auto md:flex-wrap md:justify-center">
        {items.map(({ slug, title }) => {
          const isActive = (active ?? "") === slug;
          return (
            <li key={slug || "all"}>
              <Link
                href={slug ? `/category/${slug}` : "/catalogue"}
                aria-current={isActive ? "page" : undefined}
                className={`${poppins.className} inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors ${
                  isActive
                    ? "border-ink bg-ink text-white hover:text-white"
                    : "border-ink/15 bg-white/70 text-ink hover:border-ink/40 hover:text-ink"
                }`}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
