import type { Product } from "./types";

/** Primary category plus any other sheets this listing was imported on. */
export function productCategorySlugs(product: Product): string[] {
  const slugs = [product.category_slug];
  for (const relation of product.listingRelations ?? []) {
    if (!slugs.includes(relation.category_slug)) slugs.push(relation.category_slug);
  }
  return slugs;
}

export function productBelongsToCategory(product: Product, slug: string): boolean {
  return productCategorySlugs(product).includes(slug);
}

/** Real category sheets only. Featured rails stay on their own collections. */
export function categoryGroupSlugs(product: Product): string[] {
  const slugs: string[] = [];
  const add = (slug: string, group: Product["group"]) => {
    if (group === "category" && slug && !slugs.includes(slug)) slugs.push(slug);
  };
  add(product.category_slug, product.group);
  for (const relation of product.listingRelations ?? []) {
    add(relation.category_slug, relation.group);
  }
  return slugs;
}

export function productMatchesAnyId(
  product: Product,
  ids: ReadonlySet<string> | readonly string[]
): boolean {
  const set = ids instanceof Set ? ids : new Set(ids);
  if (set.has(product.id)) return true;
  return (product.listingAliasIds ?? []).some((id) => set.has(id));
}
