import type { Product } from "./types";
import { getEffectiveProductTitle } from "./product-title-quality";
import {
  getAllSourceProducts,
  getProductById,
  getSourceProductById,
  products,
} from "./products";

export type FindSlugResolution =
  | { type: "missing" }
  | { type: "redirect"; path: string; product: Product }
  | { type: "ok"; product: Product };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getProductSlug(product: Product): string {
  const base = slugify(getEffectiveProductTitle(product)).slice(0, 55);
  return `${base}-${product.id}`;
}

export function getProductHref(product: Product): string {
  return `/find/${getProductSlug(product)}`;
}

let sourceSlugIndex: Map<string, Product> | null = null;

function sourceProductBySlug(slug: string): Product | undefined {
  if (!sourceSlugIndex) {
    sourceSlugIndex = new Map();
    for (const product of getAllSourceProducts()) {
      sourceSlugIndex.set(getProductSlug(product), product);
    }
  }
  return sourceSlugIndex.get(slug);
}

/**
 * Public product for a /find/ slug. Duplicate row slugs resolve to the
 * canonical product and are flagged for a permanent redirect.
 */
export function resolveFindSlug(slug: string): FindSlugResolution {
  const id = slug.split("-").pop();
  const source = (id ? getSourceProductById(id) : undefined) ?? sourceProductBySlug(slug);
  if (!source) return { type: "missing" };

  const product = getProductById(source.id);
  if (!product) return { type: "missing" };

  const canonicalSlug = getProductSlug(product);
  if (slug !== canonicalSlug) {
    return { type: "redirect", path: `/find/${canonicalSlug}`, product };
  }
  return { type: "ok", product };
}

export function getProductBySlug(slug: string): Product | undefined {
  const resolved = resolveFindSlug(slug);
  if (resolved.type === "missing") return undefined;
  return resolved.product;
}

export function getAllProductSlugs(): string[] {
  return products.map(getProductSlug);
}
