import Link from "next/link";
import type { CategoryInfo } from "@/lib/types";

type HomepageCategoriesProps = {
  categories: CategoryInfo[];
};

/** Label overrides for clearer chip names on the homepage. */
const PRIORITY: { slug: string; label: string }[] = [
  { slug: "shoes", label: "Sneakers" },
  { slug: "hoodies-and-pants", label: "Hoodies" },
  { slug: "coats-and-jackets", label: "Jackets" },
  { slug: "bags", label: "Bags" },
  { slug: "accessories", label: "Accessories" },
  { slug: "tshirts-and-shorts", label: "Tees & shorts" },
];

export default function HomepageCategories({
  categories,
}: HomepageCategoriesProps) {
  const bySlug = new Map(
    categories
      .filter((category) => category.group === "category")
      .map((category) => [category.slug, category])
  );

  const chips = PRIORITY.map(({ slug, label }) => {
    const category = bySlug.get(slug);
    if (!category) return null;
    return { ...category, label };
  }).filter(Boolean) as Array<CategoryInfo & { label: string }>;

  const fallback = categories
    .filter((category) => category.group === "category")
    .slice(0, 6)
    .map((category) => ({ ...category, label: category.name }));

  const items = chips.length >= 4 ? chips : fallback;

  return (
    <section className="px-4 py-3 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="text-sm font-black text-foreground sm:text-base">
            Popular categories
          </h2>
          <ul className="flex flex-wrap items-center gap-1.5">
            {items.map((category) => (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  className="inline-flex rounded-full border border-border bg-surface/40 px-3 py-1 text-xs font-bold text-foreground/85 hover:border-accent/40 hover:text-accent"
                >
                  {category.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/categories"
                className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent hover:bg-accent/15"
              >
                View all
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
