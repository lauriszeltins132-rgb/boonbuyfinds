import Link from "next/link";
import { SHARE_COLLECTIONS } from "@/lib/share-collections";

/** Compact chips — restores pre-slim collection link depth without giant cards. */
const FEATURED_COLLECTION_SLUGS = [
  "best-nike-finds",
  "best-jordan-finds",
  "best-moncler-finds",
  "best-stussy-finds",
  "best-sneakers",
  "best-jackets",
  "best-hoodies",
  "best-bags",
  "best-qc-approved-finds",
  "trending-this-week",
  "most-saved-finds",
  "best-under-50",
];

export default function HomepageCollections() {
  const collections = FEATURED_COLLECTION_SLUGS.map(
    (slug) => SHARE_COLLECTIONS[slug]
  ).filter(Boolean);

  return (
    <section className="px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="text-sm font-black text-foreground sm:text-base">
            Useful collections
          </h2>
          <ul className="flex flex-wrap items-center gap-1.5">
            {collections.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.path}
                  className="inline-flex rounded-full border border-border bg-surface/40 px-3 py-1 text-xs font-bold text-foreground/85 hover:border-accent/40 hover:text-accent"
                >
                  {item.h1.replace(/\s+BoonBuy finds$/i, "").trim() || item.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/collections"
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
