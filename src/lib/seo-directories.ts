import type { BrandInfo } from "./brands";
import { getBrandsFromProducts } from "./brands";
import { resolveCanonicalBrandSlug } from "./brand-normalization";
import { getAllProducts, getCategories } from "./products";
import type { CategoryInfo } from "./types";
import { isBrandIndexable, isCategoryIndexable } from "./brand-indexability";

export {
  isBrandIndexable,
  isCategoryIndexable,
  MIN_INDEXABLE_BRAND_COUNT,
  MIN_INDEXABLE_CATEGORY_COUNT,
  getIndexableBrands,
  getThinBrands,
} from "./brand-indexability";

/** Canonical category directory entries (excludes featured rails + thin inventory). */
export function getIndexableCategories(): CategoryInfo[] {
  return getCategories().filter(
    (category) =>
      category.group === "category" && isCategoryIndexable(category.count)
  );
}

/** Related brands for a brand/category landing — indexable only, capped for payload size. */
export function getRelatedIndexableBrands(
  brands: BrandInfo[],
  currentSlug: string,
  limit = 12
): BrandInfo[] {
  return brands
    .filter((brand) => isBrandIndexable(brand) && brand.slug !== currentSlug)
    .slice(0, limit);
}

export function resolveBrandSlugOrAlias(slug: string): {
  canonicalSlug: string;
  isAlias: boolean;
} {
  const canonicalSlug = resolveCanonicalBrandSlug(slug);
  return {
    canonicalSlug,
    isAlias: canonicalSlug !== slug.trim().toLowerCase(),
  };
}

export function getBrandInventoryReport() {
  const all = getBrandsFromProducts(getAllProducts());
  const indexable = all.filter(isBrandIndexable);
  const thin = all.filter((brand) => !isBrandIndexable(brand));
  return {
    totalBrands: all.length,
    indexableBrands: indexable.length,
    thinBrands: thin.length,
    thin: thin.map((b) => ({ slug: b.slug, name: b.name, count: b.count })),
    indexable: indexable.map((b) => ({ slug: b.slug, name: b.name, count: b.count })),
  };
}
