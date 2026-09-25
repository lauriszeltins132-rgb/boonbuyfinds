/**
 * Resolve catalog filter/search query params to clean SEO destinations.
 * Used by middleware + /browse metadata so Google does not index param URLs.
 */

const KNOWN_BRAND_SLUGS = new Set([
  "chrome-hearts",
  "balenciaga",
  "ralph-lauren",
  "supreme",
  "essentials",
  "dior",
  "rick-owens",
  "bape",
  "burberry",
  "nike",
  "goyard",
  "stone-island",
  "new-balance",
  "sp5der",
  "chanel",
  "jordan",
  "adidas",
  "louis-vuitton",
  "moncler",
  "prada",
  "gucci",
  "off-white",
  "ami",
  "lacoste",
  "hermes",
  "versace",
  "fendi",
  "givenchy",
  "valentino",
  "asics",
  "ugg",
  "the-north-face",
  "carhartt",
  "gallery-dept",
  "maison-margiela",
  "mm6",
  "salomon",
  "alexander-mcqueen",
  "golden-goose",
  "ggdb",
  "corteiz",
  "stussy",
  "palace",
  "arcteryx",
  "arc-teryx",
  "cp-company",
  "palm-angels",
  "amiri",
  "loewe",
  "miu-miu",
  "yeezy",
  "travis-scott",
  "nocta",
  "mertra",
  "vivienne-westwood",
  "vetements",
  "bottega-veneta",
  "timberland",
  "converse",
  "vans",
  "puma",
  "reebok",
  "under-armour",
  "lululemon",
  "alo",
  "zegna",
  "loro-piana",
  "canada-goose",
  "moose-knuckles",
  "marni",
  "mihara-yasuhiro",
  "maison-mihara-yasuhiro",
  "represent",
  "fear-of-god",
  "acne-studios",
  "rimowa",
  "tiffany",
  "rolex",
  "casio",
  "apple",
  "sony",
]);

const EXTRA_FILTER_KEYS = ["min", "max", "sort", "qc", "page", "saved"] as const;

export function slugifyBrandQuery(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Map brand= or exact q= to /brands/{slug} when safe. */
export function resolveBrandDestination(
  brand: string | null,
  q: string | null
): string | null {
  const brandSlug = brand ? slugifyBrandQuery(brand) : "";
  const qSlug = q ? slugifyBrandQuery(q) : "";

  if (brandSlug && KNOWN_BRAND_SLUGS.has(brandSlug)) {
    if (!qSlug || qSlug === brandSlug) return `/brands/${brandSlug}`;
  }

  if (!brandSlug && qSlug && KNOWN_BRAND_SLUGS.has(qSlug)) {
    return `/brands/${qSlug}`;
  }

  return null;
}

export function hasExtraCatalogFilters(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): boolean {
  const get = (key: string) => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key);
    }
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return EXTRA_FILTER_KEYS.some((key) => {
    const value = get(key);
    if (!value) return false;
    if (key === "sort" && value === "featured") return false;
    if (key === "page" && (value === "1" || value === "0")) return false;
    return String(value).length > 0;
  });
}

/**
 * Prefer clean SEO routes over ?brand= / ?q= filter URLs.
 * Returns null when the request should stay on /browse (and remain noindex).
 */
export function resolveCleanCatalogPath(
  searchParams: URLSearchParams
): string | null {
  if (hasExtraCatalogFilters(searchParams)) return null;
  return resolveBrandDestination(
    searchParams.get("brand"),
    searchParams.get("q")
  );
}
