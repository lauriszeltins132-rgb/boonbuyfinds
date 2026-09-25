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

/** Canonical category slugs + common marketing aliases. */
const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  shoes: "shoes",
  shoe: "shoes",
  sneakers: "shoes",
  sneaker: "shoes",
  "hoodies-and-pants": "hoodies-and-pants",
  hoodies: "hoodies-and-pants",
  hoodie: "hoodies-and-pants",
  pants: "hoodies-and-pants",
  "coats-and-jackets": "coats-and-jackets",
  jackets: "coats-and-jackets",
  jacket: "coats-and-jackets",
  coats: "coats-and-jackets",
  coat: "coats-and-jackets",
  "tshirts-and-shorts": "tshirts-and-shorts",
  tshirts: "tshirts-and-shorts",
  "t-shirts": "tshirts-and-shorts",
  shorts: "tshirts-and-shorts",
  accessories: "accessories",
  bags: "accessories",
  bag: "accessories",
  electronics: "electronics",
  electronic: "electronics",
};

const EXTRA_FILTER_KEYS = [
  "min",
  "max",
  "sort",
  "qc",
  "page",
  "saved",
  "category",
] as const;

export function slugifyBrandQuery(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function paramValue(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>,
  key: string
): string | null {
  if (searchParams instanceof URLSearchParams) {
    return searchParams.get(key);
  }
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
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

/** Map category= (or exact category q=) to /categories/{slug}. */
export function resolveCategoryDestination(
  category: string | null,
  q: string | null
): string | null {
  const fromCategory = category ? slugifyBrandQuery(category) : "";
  const fromQ = q ? slugifyBrandQuery(q) : "";

  if (fromCategory && CATEGORY_SLUG_ALIASES[fromCategory]) {
    if (!fromQ || fromQ === fromCategory || CATEGORY_SLUG_ALIASES[fromQ] === CATEGORY_SLUG_ALIASES[fromCategory]) {
      return `/categories/${CATEGORY_SLUG_ALIASES[fromCategory]}`;
    }
  }

  if (!fromCategory && fromQ && CATEGORY_SLUG_ALIASES[fromQ]) {
    return `/categories/${CATEGORY_SLUG_ALIASES[fromQ]}`;
  }

  return null;
}

export function hasExtraCatalogFilters(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): boolean {
  return EXTRA_FILTER_KEYS.some((key) => {
    const value = paramValue(searchParams, key);
    if (!value) return false;
    if (key === "sort" && value === "featured") return false;
    if (key === "page" && (value === "1" || value === "0")) return false;
    // category alone is handled by resolveCategoryDestination — not "extra"
    if (key === "category") return false;
    return String(value).length > 0;
  });
}

/**
 * Prefer clean SEO routes over ?brand= / ?q= / ?category= filter URLs.
 * Returns null when the request should stay on /browse (and remain noindex).
 */
export function resolveCleanCatalogPath(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): string | null {
  if (hasExtraCatalogFilters(searchParams)) return null;

  const brand = paramValue(searchParams, "brand");
  const category = paramValue(searchParams, "category");
  const q = paramValue(searchParams, "q");

  // Brand wins when both brand + category are present without other filters.
  const brandPath = resolveBrandDestination(brand, q);
  if (brandPath) return brandPath;

  const categoryPath = resolveCategoryDestination(category, brand ? null : q);
  if (categoryPath) return categoryPath;

  return null;
}
