import { POPULAR_SEARCHES } from "@/lib/constants";
import { BEST_OF_PAGES, BEST_OF_SLUGS } from "@/lib/best-of-pages";

export type RelatedSearchLink = {
  label: string;
  href: string;
};

const AUTHORITY_SEARCHES: RelatedSearchLink[] = [
  { label: "BoonBuy spreadsheet", href: "/boonbuy-spreadsheet" },
  { label: "BoonBuy coupons", href: "/boonbuy-coupons" },
  { label: "BoonBuy QC", href: "/boonbuy-qc" },
  { label: "BoonBuy shipping", href: "/boonbuy-shipping" },
  { label: "BoonBuy warehouse", href: "/boonbuy-warehouse" },
  { label: "How to use BoonBuy", href: "/how-to-use-boonbuy" },
  { label: "Is BoonBuy legit", href: "/is-boonbuy-legit" },
  { label: "BoonBuy vs CNFans", href: "/boonbuy-vs-cnfans" },
  { label: "Trending finds", href: "/trending" },
  { label: "Latest finds", href: "/latest" },
  { label: "Most saved", href: "/most-saved-finds" },
  { label: "Most viewed", href: "/most-viewed-finds" },
  { label: "Summer finds", href: "/summer-finds" },
  { label: "Winter finds", href: "/winter-finds" },
  { label: "Under $50", href: "/best-under-50" },
  { label: "Editor's picks", href: "/editors-picks" },
  { label: "BoonBuy AI", href: "/ai" },
  { label: "Best jerseys", href: "/best-jerseys" },
  { label: "Best tech", href: "/best-boonbuy-tech" },
];

const BRAND_HREF: Record<string, string> = {
  Nike: "/brands/nike",
  Jordan: "/brands/jordan",
  Moncler: "/brands/moncler",
  Stussy: "/brands/stussy",
  Adidas: "/brands/adidas",
  Gucci: "/brands/gucci",
  "Louis Vuitton": "/brands/louis-vuitton",
  Corteiz: "/brands/corteiz",
  "Stone Island": "/brands/stone-island",
  Bape: "/brands/bape",
};

/** Related / popular searches for internal linking and search UX. */
export function getRelatedSearches(limit = 16): RelatedSearchLink[] {
  const brandLinks: RelatedSearchLink[] = POPULAR_SEARCHES.map((term) => ({
    label: term,
    href: BRAND_HREF[term] ?? `/?q=${encodeURIComponent(term)}#browse`,
  }));

  const bestOfLinks: RelatedSearchLink[] = BEST_OF_SLUGS.slice(0, 8).map((slug) => {
    const page = BEST_OF_PAGES[slug];
    return { label: page.h1, href: page.path };
  });

  const merged = [...AUTHORITY_SEARCHES, ...brandLinks, ...bestOfLinks];
  const seen = new Set<string>();
  return merged.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  }).slice(0, limit);
}
