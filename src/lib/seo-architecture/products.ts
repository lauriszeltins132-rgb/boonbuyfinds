import { hasExactPrice } from "@/lib/pricing";
import { getAllProducts } from "@/lib/products";
import type { SeoLandingProductFilter } from "@/lib/seo-landing-config";
import {
  filterQualityProducts,
  resolveProductsFromFilter,
} from "@/lib/seo-landing-engine";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";
import type { Product } from "@/lib/types";

export function resolveSeoArchitectureProducts(page: SeoArchitecturePage): Product[] {
  if (!page.productFilter) return [];

  return resolveProductsFromFilter(page.productFilter, 48);
}

export function resolveCategoryProducts(
  filter: SeoLandingProductFilter,
  limit = 48
): Product[] {
  return resolveProductsFromFilter(filter, limit);
}

export function pricedProducts(products: Product[]): Product[] {
  return filterQualityProducts(products.filter((p) => hasExactPrice(p.price)));
}

export function allPricedProducts(): Product[] {
  return pricedProducts(getAllProducts());
}
