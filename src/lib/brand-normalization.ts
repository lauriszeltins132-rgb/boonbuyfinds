/**
 * Canonical brand names + slug aliases for SEO.
 * Merge only clear duplicates — never collapse distinct labels.
 */

/** Display-name aliases → preferred catalog name (must match KNOWN_BRANDS canonical). */
export const BRAND_DISPLAY_ALIASES: Record<string, string> = {
  "Off White": "Off-White",
  "Arc'teryx": "Arcteryx",
  GGDB: "Golden Goose",
  "Maison Mihara Yasuhiro": "Mihara Yasuhiro",
  "Polo Ralph Lauren": "Ralph Lauren",
  LV: "Louis Vuitton",
};

/**
 * Non-canonical slugs → canonical `/brands/{slug}`.
 * Used by vanity redirects, filter cleanup, and brand page alias redirects.
 */
export const BRAND_SLUG_ALIASES: Record<string, string> = {
  offwhite: "off-white",
  "off-white": "off-white",
  ralphlauren: "ralph-lauren",
  "polo-ralph-lauren": "ralph-lauren",
  "ralph-lauren-polo": "ralph-lauren",
  lv: "louis-vuitton",
  louisvuitton: "louis-vuitton",
  stoneisland: "stone-island",
  thenorthface: "the-north-face",
  "north-face": "the-north-face",
  chromehearts: "chrome-hearts",
  "arc-teryx": "arcteryx",
  arcteryx: "arcteryx",
  ggdb: "golden-goose",
  goldengoose: "golden-goose",
  newbalance: "new-balance",
  louisvuittonmonogram: "louis-vuitton",
  "chrome-heart": "chrome-hearts",
  balenciaga: "balenciaga",
  "stone-islands": "stone-island",
};

export function normalizeBrandDisplayName(name: string): string {
  return BRAND_DISPLAY_ALIASES[name] ?? name;
}

export function resolveCanonicalBrandSlug(slug: string): string {
  const normalized = slug.trim().toLowerCase().replace(/^-+|-+$/g, "");
  return BRAND_SLUG_ALIASES[normalized] ?? normalized;
}

export function slugifyBrandName(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
