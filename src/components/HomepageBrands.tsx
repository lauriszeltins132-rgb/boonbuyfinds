import Link from "next/link";
import { getBrandsFromProducts } from "@/lib/brands";
import { getAllProducts } from "@/lib/products";

const PRIORITY_NAMES = [
  "Nike",
  "Moncler",
  "Stussy",
  "Gucci",
  "Dior",
  "Ralph Lauren",
];

type HomepageBrandsProps = {
  /** Kept for call-site compatibility; spotlight is no longer shown on homepage. */
  hideSpotlight?: boolean;
};

export default function HomepageBrands({
  hideSpotlight: _hideSpotlight = true,
}: HomepageBrandsProps) {
  const all = getBrandsFromProducts(getAllProducts());
  const byName = new Map(all.map((brand) => [brand.name, brand]));

  const chips = PRIORITY_NAMES.map((name) => byName.get(name))
    .filter(Boolean)
    .slice(0, 6);

  const fallback = all.slice(0, 6);
  const brands = chips.length >= 4 ? chips : fallback;

  return (
    <section className="px-4 py-3 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="text-sm font-black text-foreground sm:text-base">
            Popular brands
          </h2>
          <ul className="flex flex-wrap items-center gap-1.5">
            {brands.map((brand) =>
              brand ? (
                <li key={brand.slug}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="inline-flex rounded-full border border-border bg-surface/40 px-3 py-1 text-xs font-bold text-foreground/85 hover:border-accent/40 hover:text-accent"
                  >
                    {brand.name}
                    {typeof brand.count === "number" ? (
                      <span className="ml-1.5 font-semibold text-muted">
                        {brand.count}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ) : null
            )}
            <li>
              <Link
                href="/brands"
                className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent hover:bg-accent/15"
              >
                View all brands
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
