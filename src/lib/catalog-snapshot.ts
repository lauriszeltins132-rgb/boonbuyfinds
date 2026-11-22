import { createHash } from "node:crypto";

/** Brands with at least this many products get a median price. */
export const MAJOR_BRAND_MIN_PRODUCTS = 10;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export type QcSnapshotStatus = "linked" | "none";

export type SnapshotProductInput = {
  listingId: string;
  price: number | null;
  imageUrl: string;
  qcLinked: boolean;
  brand: string | null;
  category: string;
  sourceUrl: string;
  boonbuyUrl: string;
  /** Only a real checker may set this. Otherwise the snapshot stores "unknown". */
  verification?: string | null;
};

export type ProductDayRecord = {
  listingId: string;
  price: number | null;
  imageHash: string | null;
  qcStatus: QcSnapshotStatus;
  firstSeenAt: string;
  lastSeenAt: string;
  brand: string | null;
  category: string;
  sourceUrl: string;
  boonbuyUrl: string;
  verification: string;
};

export type PriceChange = {
  listingId: string;
  from: number | null;
  to: number | null;
};

export type DayAggregates = {
  totalProducts: number;
  qcProducts: number;
  productsByBrand: Record<string, number>;
  productsByCategory: Record<string, number>;
  medianPriceByCategory: Record<string, number | null>;
  medianPriceByBrand: Record<string, number | null>;
};

export type DaySnapshot = {
  date: string;
  products: ProductDayRecord[];
  added: string[];
  removed: string[];
  priceChanges: PriceChange[];
  aggregates: DayAggregates;
};

export type PresenceRecord = {
  firstSeenAt: string;
  lastSeenAt: string;
  price: number | null;
};

export type PresenceFile = {
  listings: Record<string, PresenceRecord>;
};

export type SnapshotRun =
  | { status: "exists" }
  | { status: "created"; day: DaySnapshot; presence: PresenceFile };

export function emptyPresence(): PresenceFile {
  return { listings: {} };
}

/** UTC calendar day. Snapshots never use a caller's local date. */
export function utcSnapshotDate(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function assertSnapshotDate(date: string): void {
  if (!DATE_PATTERN.test(date)) {
    throw new Error(`Snapshot date must be YYYY-MM-DD, received ${date}`);
  }
}

export function hashImageUrl(imageUrl: string): string | null {
  const value = imageUrl.trim();
  if (!value) return null;
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function finitePrice(price: number | null): number | null {
  if (price == null || !Number.isFinite(price)) return null;
  return price;
}

function samePrice(left: number | null, right: number | null): boolean {
  if (left == null && right == null) return true;
  if (left == null || right == null) return false;
  return Math.round(left * 100) === Math.round(right * 100);
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const value =
    sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  return Math.round(value * 100) / 100;
}

function countBy(keys: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const key of keys) {
    if (!key) continue;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

/**
 * Build one UTC day's snapshot from the canonical catalog.
 * If that day already exists, this is a no-op and does not touch presence.
 * It never invents days before the first successful run.
 */
export function createDailySnapshot(input: {
  date: string;
  products: SnapshotProductInput[];
  presence: PresenceFile;
  dayExists: boolean;
}): SnapshotRun {
  assertSnapshotDate(input.date);
  if (input.dayExists) return { status: "exists" };

  const seen = new Set<string>();
  const products = input.products.filter((product) => {
    if (!product.listingId || seen.has(product.listingId)) return false;
    seen.add(product.listingId);
    return true;
  });

  const previous = input.presence.listings;
  const nextListings: Record<string, PresenceRecord> = {};
  for (const [listingId, record] of Object.entries(previous)) {
    nextListings[listingId] = { ...record };
  }

  const records: ProductDayRecord[] = [];
  const added: string[] = [];
  const priceChanges: PriceChange[] = [];

  for (const product of products) {
    const prior = previous[product.listingId];
    const price = finitePrice(product.price);
    const storedPrice = prior && samePrice(prior.price, price) ? prior.price : price;
    const firstSeenAt = prior?.firstSeenAt ?? input.date;
    if (!prior) added.push(product.listingId);
    else if (!samePrice(prior.price, price)) {
      priceChanges.push({ listingId: product.listingId, from: prior.price, to: storedPrice });
    }

    nextListings[product.listingId] = {
      firstSeenAt,
      lastSeenAt: input.date,
      price: storedPrice,
    };

    const verification = product.verification?.trim() || "unknown";
    records.push({
      listingId: product.listingId,
      price: storedPrice,
      imageHash: hashImageUrl(product.imageUrl),
      qcStatus: product.qcLinked ? "linked" : "none",
      firstSeenAt,
      lastSeenAt: input.date,
      brand: product.brand?.trim() || null,
      category: product.category,
      sourceUrl: product.sourceUrl,
      boonbuyUrl: product.boonbuyUrl,
      verification,
    });
  }

  const removed = Object.keys(previous)
    .filter((listingId) => !seen.has(listingId))
    .sort((a, b) => a.localeCompare(b));

  records.sort((a, b) => a.listingId.localeCompare(b.listingId));
  added.sort((a, b) => a.localeCompare(b));
  priceChanges.sort((a, b) => a.listingId.localeCompare(b.listingId));

  const pricesByCategory = new Map<string, number[]>();
  const pricesByBrand = new Map<string, number[]>();
  const brandCounts = new Map<string, number>();

  for (const record of records) {
    const categoryPrices = pricesByCategory.get(record.category) ?? [];
    if (record.price != null) categoryPrices.push(record.price);
    pricesByCategory.set(record.category, categoryPrices);

    if (!record.brand) continue;
    brandCounts.set(record.brand, (brandCounts.get(record.brand) ?? 0) + 1);
    const brandPrices = pricesByBrand.get(record.brand) ?? [];
    if (record.price != null) brandPrices.push(record.price);
    pricesByBrand.set(record.brand, brandPrices);
  }

  const medianPriceByCategory: Record<string, number | null> = {};
  for (const category of [...pricesByCategory.keys()].sort((a, b) => a.localeCompare(b))) {
    medianPriceByCategory[category] = median(pricesByCategory.get(category) ?? []);
  }

  const medianPriceByBrand: Record<string, number | null> = {};
  for (const brand of [...brandCounts.keys()].sort((a, b) => a.localeCompare(b))) {
    if ((brandCounts.get(brand) ?? 0) < MAJOR_BRAND_MIN_PRODUCTS) continue;
    medianPriceByBrand[brand] = median(pricesByBrand.get(brand) ?? []);
  }

  return {
    status: "created",
    day: {
      date: input.date,
      products: records,
      added,
      removed,
      priceChanges,
      aggregates: {
        totalProducts: records.length,
        qcProducts: records.filter((record) => record.qcStatus === "linked").length,
        productsByBrand: countBy(records.map((record) => record.brand ?? "")),
        productsByCategory: countBy(records.map((record) => record.category)),
        medianPriceByCategory,
        medianPriceByBrand,
      },
    },
    presence: { listings: nextListings },
  };
}
