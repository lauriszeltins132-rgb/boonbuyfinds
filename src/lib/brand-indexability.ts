import type { BrandInfo } from "./brands";
import { getBrandsFromProducts } from "./brands";
import { resolveCanonicalBrandSlug } from "./brand-normalization";
import { getAllProducts } from "./products";

/** Minimum real products before a brand page is sitemap/index eligible. */
export const MIN_INDEXABLE_BRAND_COUNT = 3;

/** Minimum products before a category page is sitemap/index eligible. */
export const MIN_INDEXABLE_CATEGORY_COUNT = 10;

export function isBrandIndexable(brand: Pick<BrandInfo, "count" | "slug" | "name">): boolean {
  if (brand.count < MIN_INDEXABLE_BRAND_COUNT) return false;
  if (!brand.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(brand.slug)) return false;
  if (!brand.name || brand.name.trim().length < 2) return false;
  return true;
}

export function getIndexableBrands(brands?: BrandInfo[]): BrandInfo[] {
  const list = brands ?? getBrandsFromProducts(getAllProducts());
  // Dedupe by canonical slug (prefer highest count if collision remains).
  const bySlug = new Map<string, BrandInfo>();
  for (const brand of list) {
    const slug = resolveCanonicalBrandSlug(brand.slug);
    const existing = bySlug.get(slug);
    if (!existing || brand.count > existing.count) {
      bySlug.set(slug, { ...brand, slug });
    } else if (existing && brand.count === existing.count && brand.name.length > existing.name.length) {
      bySlug.set(slug, { ...brand, slug });
    }
  }
  return [...bySlug.values()]
    .filter(isBrandIndexable)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getThinBrands(brands?: BrandInfo[]): BrandInfo[] {
  const list = brands ?? getBrandsFromProducts(getAllProducts());
  return list.filter((brand) => !isBrandIndexable(brand));
}

export function isCategoryIndexable(count: number): boolean {
  return count >= MIN_INDEXABLE_CATEGORY_COUNT;
}
