export type ProductBadgeKind =
  | "trending"
  | "editors-pick"
  | "best-value"
  | "budget-pick"
  | "top-quality"
  | "new"
  | "popular"
  | "qc";

export type Product = {
  id: string;
  product_name: string;
  category: string;
  category_slug: string;
  sheet: string;
  group: "featured" | "category";
  price: number | null;
  affiliate_link: string;
  qc_link: string;
  image: string;
  /** Optional catalog overrides — not required for display */
  manual_badges?: ProductBadgeKind[];
  rn_score_override?: number;
  /**
   * Parsed marketplace listing id (`weidian:123`). Absent when the source
   * URL has no listing id. Not written back to products.json.
   */
  listingId?: string | null;
  /** Other sheet memberships for this same listing. The primary category stays on the product. */
  listingRelations?: ListingRelation[];
  /** Every source row id that collapsed into this product, including its own id. */
  listingAliasIds?: string[];
};

export type ListingRelation = {
  category: string;
  category_slug: string;
  sheet: string;
  group: "featured" | "category";
  sourceId: string;
};

export type CategoryInfo = {
  name: string;
  slug: string;
  count: number;
  href: string;
  group: "featured" | "category";
};
