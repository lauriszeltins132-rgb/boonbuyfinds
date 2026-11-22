import { getListingId } from "./listing-id";
import { hasExactPrice } from "./pricing";
import type { ListingRelation, Product } from "./types";

export type ListingConflictField = "price" | "title" | "image" | "qc_link";

export type ListingConflict = {
  listingId: string;
  field: ListingConflictField;
  status: "resolved" | "review";
  reason: string;
  kept: string;
  keptFromId: string;
  alternatives: { id: string; value: string }[];
};

export type ListingRedirectRecord = {
  listingId: string;
  fromId: string;
  toId: string;
  /** True when this source row previously qualified for its own /find/ URL. */
  sourceWasPublic: boolean;
};

export type ListingCatalog = {
  sourceRows: number;
  uniqueListingIds: number;
  rowsWithoutListingId: number;
  duplicateListingGroups: number;
  duplicateSourceRows: number;
  /** Groups collapsed only because the URL matched, with no parsed listing id. */
  urlOnlyDuplicateGroups: number;
  canonicalProducts: Product[];
  redirects: ListingRedirectRecord[];
  conflicts: ListingConflict[];
  sourceById: Map<string, Product>;
  publicByAliasId: Map<string, Product>;
};

function numericId(id: string): number {
  const value = Number(id);
  return Number.isFinite(value) ? value : -1;
}

function groupKey(product: Product): { key: string; listingId: string | null } {
  const listingId = getListingId(product.affiliate_link);
  if (listingId) return { key: `listing:${listingId}`, listingId };
  const link = product.affiliate_link?.trim().toLowerCase().split("?")[0] ?? "";
  if (link) return { key: `url:${link}`, listingId: null };
  return { key: `row:${product.id}`, listingId: null };
}

function finitePrice(price: number | null): number | null {
  if (price == null || !Number.isFinite(price) || price <= 0) return null;
  return price;
}

function newestRow<T extends { row: Product }>(rows: T[]): T {
  return rows.reduce((best, row) =>
    numericId(row.row.id) >= numericId(best.row.id) ? row : best
  );
}

function normalizeTitle(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function identityRank(product: Product, canServe: (product: Product) => boolean): number[] {
  return [
    canServe(product) ? 1 : 0,
    product.group === "category" ? 1 : 0,
    product.qc_link?.trim() ? 1 : 0,
    hasExactPrice(product.price) ? 1 : 0,
    product.product_name.trim().length,
  ];
}

function compareIdentity(
  a: Product,
  b: Product,
  canServe: (product: Product) => boolean
): number {
  const left = identityRank(a, canServe);
  const right = identityRank(b, canServe);
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return right[index] - left[index];
  }
  return numericId(a.id) - numericId(b.id);
}

function uniqueRelations(rows: Product[], primarySlug: string): ListingRelation[] {
  const seen = new Set<string>([primarySlug]);
  const relations: ListingRelation[] = [];
  for (const row of rows) {
    if (seen.has(row.category_slug)) continue;
    seen.add(row.category_slug);
    relations.push({
      category: row.category,
      category_slug: row.category_slug,
      sheet: row.sheet,
      group: row.group,
      sourceId: row.id,
    });
  }
  return relations;
}

function resolvePrice(
  rows: Product[],
  canonical: Product,
  listingId: string,
  conflicts: ListingConflict[]
): number | null {
  const priced = rows
    .map((row) => ({ row, price: finitePrice(row.price) }))
    .filter((entry): entry is { row: Product; price: number } => entry.price != null);
  const distinct = [...new Set(priced.map((entry) => entry.price))];
  if (distinct.length === 0) return canonical.price ?? null;
  if (distinct.length === 1) {
    const only = priced[0];
    if (finitePrice(canonical.price) == null) {
      conflicts.push({
        listingId,
        field: "price",
        status: "resolved",
        reason: "Filled an empty price from the only priced source row.",
        kept: String(only.price),
        keptFromId: only.row.id,
        alternatives: [],
      });
    }
    return only.price;
  }

  const trusted = priced.filter((entry) => hasExactPrice(entry.price));
  const trustedPrices = [...new Set(trusted.map((entry) => entry.price))];
  const alternatives = priced.map((entry) => ({
    id: entry.row.id,
    value: String(entry.price),
  }));

  if (trustedPrices.length >= 1) {
    const kept = newestRow(trusted);
    conflicts.push({
      listingId,
      field: "price",
      status: "resolved",
      reason:
        "Kept the newest trusted price. Import scripts assign higher row ids to later spreadsheet rows.",
      kept: String(kept.price),
      keptFromId: kept.row.id,
      alternatives: alternatives.filter((entry) => entry.id !== kept.row.id),
    });
    return kept.price;
  }

  const fallback = finitePrice(canonical.price);
  conflicts.push({
    listingId,
    field: "price",
    status: "review",
    reason:
      "Prices disagree and none fall in the trusted display range. Kept the canonical row's price.",
    kept: fallback == null ? "" : String(fallback),
    keptFromId: canonical.id,
    alternatives: alternatives.filter((entry) => entry.id !== canonical.id),
  });
  return canonical.price ?? null;
}

function resolveQc(
  rows: Product[],
  canonical: Product,
  listingId: string,
  conflicts: ListingConflict[]
): string {
  const linked = rows
    .map((row) => ({ row, link: row.qc_link?.trim() ?? "" }))
    .filter((entry) => entry.link.length > 0);
  const distinct = [...new Set(linked.map((entry) => entry.link))];
  if (distinct.length === 0) return "";
  if (distinct.length === 1) {
    const only = linked[0];
    if (!canonical.qc_link?.trim()) {
      conflicts.push({
        listingId,
        field: "qc_link",
        status: "resolved",
        reason: "Filled an empty QC link from the only source row that had one.",
        kept: only.link,
        keptFromId: only.row.id,
        alternatives: [],
      });
    }
    return only.link;
  }

  const kept = canonical.qc_link?.trim() ?? "";
  conflicts.push({
    listingId,
    field: "qc_link",
    status: "review",
    reason:
      "QC links disagree. Kept the canonical row's link and recorded the others for review.",
    kept,
    keptFromId: canonical.id,
    alternatives: linked
      .filter((entry) => entry.row.id !== canonical.id)
      .map((entry) => ({ id: entry.row.id, value: entry.link })),
  });
  return kept;
}

function recordTextConflicts(
  rows: Product[],
  canonical: Product,
  listingId: string,
  conflicts: ListingConflict[]
) {
  const titles = new Map<string, { id: string; value: string }>();
  for (const row of rows) {
    const value = row.product_name ?? "";
    const key = normalizeTitle(value);
    if (!key || titles.has(key)) continue;
    titles.set(key, { id: row.id, value });
  }
  if (titles.size > 1) {
    conflicts.push({
      listingId,
      field: "title",
      status: "review",
      reason: "Titles disagree. Kept the canonical row title instead of merging text.",
      kept: canonical.product_name,
      keptFromId: canonical.id,
      alternatives: [...titles.values()].filter(
        (entry) => normalizeTitle(entry.value) !== normalizeTitle(canonical.product_name)
      ),
    });
  }

  const images = new Map<string, { id: string; value: string }>();
  for (const row of rows) {
    const value = row.image?.trim() ?? "";
    if (!value || images.has(value)) continue;
    images.set(value, { id: row.id, value });
  }
  if (images.size > 1) {
    conflicts.push({
      listingId,
      field: "image",
      status: "review",
      reason: "Images disagree. Kept the canonical row image.",
      kept: canonical.image,
      keptFromId: canonical.id,
      alternatives: [...images.values()].filter((entry) => entry.value !== canonical.image),
    });
  }
}

/**
 * Collapse spreadsheet rows to one public product per listing.
 * Source rows are not deleted. Duplicate ids redirect to the chosen row.
 */
export function buildListingCatalog(
  products: Product[],
  canServe: (product: Product) => boolean
): ListingCatalog {
  const groups = new Map<string, { listingId: string | null; rows: Product[] }>();
  let rowsWithoutListingId = 0;

  for (const product of products) {
    const grouped = groupKey(product);
    if (!grouped.listingId) rowsWithoutListingId += 1;
    const existing = groups.get(grouped.key);
    if (existing) existing.rows.push(product);
    else groups.set(grouped.key, { listingId: grouped.listingId, rows: [product] });
  }

  const canonicalProducts: Product[] = [];
  const redirects: ListingRedirectRecord[] = [];
  const conflicts: ListingConflict[] = [];
  const sourceById = new Map<string, Product>();
  const publicByAliasId = new Map<string, Product>();
  let uniqueListingIds = 0;
  let duplicateListingGroups = 0;
  let duplicateSourceRows = 0;
  let urlOnlyDuplicateGroups = 0;

  for (const group of groups.values()) {
    if (group.listingId) uniqueListingIds += 1;
    if (group.rows.length > 1 && group.listingId) {
      duplicateListingGroups += 1;
      duplicateSourceRows += group.rows.length;
    } else if (group.rows.length > 1) {
      urlOnlyDuplicateGroups += 1;
      duplicateSourceRows += group.rows.length;
    }

    const ordered = [...group.rows].sort((a, b) => compareIdentity(a, b, canServe));
    const identity = ordered[0];
    const listingKey = group.listingId ?? `row:${identity.id}`;
    const price = resolvePrice(group.rows, identity, listingKey, conflicts);
    const qcLink = resolveQc(group.rows, identity, listingKey, conflicts);
    if (group.rows.length > 1) {
      recordTextConflicts(group.rows, identity, listingKey, conflicts);
    }

    const canonical: Product = {
      ...identity,
      price,
      qc_link: qcLink,
      listingId: group.listingId,
      listingRelations: uniqueRelations(group.rows, identity.category_slug),
      listingAliasIds: group.rows.map((row) => row.id),
    };

    const publish = canServe(canonical);
    if (publish) canonicalProducts.push(canonical);

    for (const row of group.rows) {
      sourceById.set(row.id, row);
      if (publish) publicByAliasId.set(row.id, canonical);
      if (publish && row.id !== canonical.id) {
        redirects.push({
          listingId: listingKey,
          fromId: row.id,
          toId: canonical.id,
          sourceWasPublic: canServe(row),
        });
      }
    }
  }

  redirects.sort((a, b) => numericId(a.fromId) - numericId(b.fromId));
  conflicts.sort((a, b) =>
    a.listingId.localeCompare(b.listingId) || a.field.localeCompare(b.field)
  );

  return {
    sourceRows: products.length,
    uniqueListingIds,
    rowsWithoutListingId,
    duplicateListingGroups,
    duplicateSourceRows,
    urlOnlyDuplicateGroups,
    canonicalProducts,
    redirects,
    conflicts,
    sourceById,
    publicByAliasId,
  };
}
