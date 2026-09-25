import { resolveCanonicalBrandSlug } from "./brand-normalization";
import vanityRegistry from "@/data/vanity-registry.json";

export const PRIMARY_HOST = "boonbuyfinds.net";
export const VANITY_HOSTS = ["boonbuys.com", "www.boonbuys.com"] as const;

/**
 * Root paths that must never be treated as dynamic brand slugs.
 * Marketing/system routes always win over brand matching.
 */
export const RESERVED_ROOT_SLUGS = new Set([
  ...(vanityRegistry.reserved ?? []),
  "coupon",
  "coupons",
  "finds",
  "spreadsheet",
  "qc",
  "shipping",
  "review",
  "legit",
  "trending",
  "latest",
  "brands",
  "categories",
  "guides",
  "about",
  "contact",
  "privacy",
  "terms",
  "browse",
  "collections",
  "ai",
  "wishlist",
  "stats",
  "advertise",
  "api",
  "cdn",
  "processed",
  "feed.xml",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
]);

/** Existing short marketing remaps (also in next.config). */
export const MARKETING_SHORTCUTS: Record<string, string> = {
  ...(vanityRegistry.marketing ?? {}),
  coupon: "/boonbuy-coupons",
  coupons: "/boonbuy-coupons",
  finds: "/boonbuy-finds",
  spreadsheet: "/boonbuy-spreadsheet",
  qc: "/boonbuy-qc",
  shipping: "/boonbuy-shipping",
  review: "/boonbuy-review",
  legit: "/is-boonbuy-legit",
};

/** Category vanity → canonical category (or curated best-of) path. */
export const CATEGORY_SHORTCUTS: Record<string, string> = {
  ...(vanityRegistry.categories ?? {}),
  sneakers: "/categories/shoes",
  sneaker: "/categories/shoes",
  shoes: "/categories/shoes",
  hoodies: "/categories/hoodies",
  hoodie: "/categories/hoodies",
  jackets: "/categories/jackets",
  jacket: "/categories/jackets",
  bags: "/categories/bags",
  bag: "/categories/bags",
  accessories: "/categories/accessories",
  jerseys: "/best-jerseys",
  jersey: "/best-jerseys",
};

/** Collection / marketing discovery shortcuts with real destinations. */
export const COLLECTION_SHORTCUTS: Record<string, string> = {
  ...(vanityRegistry.collections ?? {}),
  trending: "/trending",
  latest: "/latest-finds",
  under50: "/best-under-50",
  "under-50": "/best-under-50",
  "nike-finds": "/collections/best-nike-finds",
  "moncler-finds": "/collections/best-moncler-finds",
  "jordan-finds": "/collections/best-jordan-finds",
  "stussy-finds": "/collections/best-stussy-finds",
};

export type VanityResolution =
  | { type: "marketing" | "category" | "collection" | "brand"; path: string }
  | { type: "none" };

function normalizeSlug(raw: string): string {
  return raw.trim().toLowerCase().replace(/^\/+|\/+$/g, "").replace(/^-+|-+$/g, "");
}

/** Resolve a single-segment path for vanity or primary-domain short aliases. */
export function resolveVanitySlug(rawSlug: string): VanityResolution {
  const slug = normalizeSlug(rawSlug);
  if (!slug || slug.includes("/")) return { type: "none" };

  if (RESERVED_ROOT_SLUGS.has(slug) || MARKETING_SHORTCUTS[slug]) {
    const marketing = MARKETING_SHORTCUTS[slug];
    if (marketing) return { type: "marketing", path: marketing };
    // Reserved but not a marketing shortcut — do not treat as brand.
    return { type: "none" };
  }

  if (CATEGORY_SHORTCUTS[slug]) {
    return { type: "category", path: CATEGORY_SHORTCUTS[slug] };
  }

  if (COLLECTION_SHORTCUTS[slug]) {
    return { type: "collection", path: COLLECTION_SHORTCUTS[slug] };
  }

  const brandMap = vanityRegistry.brands as Record<string, string> | undefined;
  const aliasMap = vanityRegistry.brandAliases as Record<string, string> | undefined;

  if (aliasMap?.[slug]) {
    return { type: "brand", path: `/brands/${aliasMap[slug]}` };
  }

  const canonical = resolveCanonicalBrandSlug(slug);
  if (brandMap?.[canonical]) {
    return { type: "brand", path: `/brands/${brandMap[canonical]}` };
  }

  if (brandMap?.[slug]) {
    return { type: "brand", path: `/brands/${brandMap[slug]}` };
  }

  return { type: "none" };
}

export function isVanityHost(host: string | null): boolean {
  if (!host) return false;
  const bare = host.split(":")[0].toLowerCase();
  return (VANITY_HOSTS as readonly string[]).includes(bare);
}
