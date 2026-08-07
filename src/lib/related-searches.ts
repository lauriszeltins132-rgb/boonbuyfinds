import { POPULAR_SEARCHES } from "@/lib/constants";
import { BEST_OF_PAGES, BEST_OF_SLUGS } from "@/lib/best-of-pages";
import { FINDS_HUB_PAGES, FINDS_HUB_SLUGS } from "@/lib/finds-hub-pages";

export type RelatedSearchLink = {
  label: string;
  href: string;
};

const AUTHORITY_SEARCHES: RelatedSearchLink[] = [
  { label: "BoonBuy questions", href: "/boonbuy-questions" },
  { label: "What is BoonBuy?", href: "/what-is-boonbuy" },
  { label: "What is BoonBuy Finds?", href: "/what-is-boonbuy-finds" },
  { label: "BoonBuy spreadsheet", href: "/boonbuy-spreadsheet" },
  { label: "BoonBuy coupons", href: "/boonbuy-coupons" },
  { label: "BoonBuy QC", href: "/boonbuy-qc" },
  { label: "BoonBuy review", href: "/boonbuy-review" },
  { label: "Is BoonBuy legit?", href: "/is-boonbuy-legit" },
  { label: "Is BoonBuy safe?", href: "/is-boonbuy-safe" },
  { label: "BoonBuy Discord", href: "/boonbuy-discord" },
  { label: "BoonBuy shipping", href: "/boonbuy-shipping" },
  { label: "BoonBuy warehouse", href: "/boonbuy-warehouse" },
  { label: "How to use BoonBuy", href: "/how-to-use-boonbuy" },
  { label: "Guides", href: "/guides" },
  { label: "Latest finds", href: "/latest-finds" },
  { label: "Sneaker finds", href: "/sneaker-finds" },
  { label: "Best rep finds", href: "/best-rep-finds" },
  { label: "BoonBuy AI", href: "/ai" },
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

  const findsLinks: RelatedSearchLink[] = FINDS_HUB_SLUGS.map((slug) => {
    const page = FINDS_HUB_PAGES[slug];
    return { label: page.h1, href: page.path };
  });

  const bestOfLinks: RelatedSearchLink[] = BEST_OF_SLUGS.slice(0, 6).map((slug) => {
    const page = BEST_OF_PAGES[slug];
    return { label: page.h1, href: page.path };
  });

  const merged = [...AUTHORITY_SEARCHES, ...findsLinks, ...brandLinks, ...bestOfLinks];
  const seen = new Set<string>();
  return merged
    .filter((link) => {
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    })
    .slice(0, limit);
}
