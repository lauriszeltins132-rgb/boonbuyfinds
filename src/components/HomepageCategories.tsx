import Link from "next/link";
import type { CategoryInfo } from "@/lib/types";

type HomepageCategoriesProps = {
  categories: CategoryInfo[];
};

const PRIORITY_SLUGS = [
  "shoes",
  "hoodies-and-pants",
  "coats-and-jackets",
  "bags",
  "accessories",
  "tshirts-and-shorts",
];

export default function HomepageCategories({ categories }: HomepageCategoriesProps) {
  const bySlug = new Map(
    categories
      .filter((category) => category.group === "category")
      .map((category) => [category.slug, category])
  );

  const items = PRIORITY_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (item): item is CategoryInfo => Boolean(item)
  );

  const fallback = categories
    .filter((category) => category.group === "category")
    .slice(0, 6);

  const chips = items.length >= 4 ? items.slice(0, 6) : fallback;

  return (
    <section className="px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="text-sm font-black text-foreground sm:text-base">
            Popular categories
          </h2>
          <ul className="flex flex-wrap items-center gap-1.5">
            {chips.map((category) => (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  className="inline-flex rounded-full border border-border bg-surface/40 px-3 py-1 text-xs font-bold text-foreground/85 hover:border-accent/40 hover:text-accent"
                >
                  {category.name}
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
