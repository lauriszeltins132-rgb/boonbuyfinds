/**
 * Write one UTC day's canonical catalog snapshot.
 *
 * Idempotent: if data/catalog-history/days/YYYY-MM-DD.json exists, this exits
 * without changing presence or that file. It never writes a date before the
 * day it is actually run.
 *
 * Scheduler: .github/workflows/catalog-snapshot.yml runs this at 05:00 UTC.
 * Vercel Cron already calls /api/ai/cron/index-health, which only reads the
 * catalog. A Vercel function cannot keep these files: the server disk is
 * ephemeral, so the snapshot is stored in git instead of on that cron.
 *
 * Run by hand: npm run snapshot:catalog
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDisplayBrand } from "../src/lib/product-validation";
import { getAllProducts } from "../src/lib/products";
import {
  createDailySnapshot,
  emptyPresence,
  utcSnapshotDate,
  type PresenceFile,
  type SnapshotProductInput,
} from "../src/lib/catalog-snapshot";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const historyDir = path.join(root, "data", "catalog-history");
const dayDir = path.join(historyDir, "days");
const presencePath = path.join(historyDir, "presence.json");
const verificationPath = path.join(root, "data", "catalog-verification", "listings.json");

function cleanUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return trimmed;
  }
}

function readPresence(): PresenceFile {
  if (!existsSync(presencePath)) return emptyPresence();
  const parsed = JSON.parse(readFileSync(presencePath, "utf8")) as PresenceFile;
  if (!parsed || typeof parsed !== "object" || !parsed.listings) return emptyPresence();
  return parsed;
}

function verificationByListing(): Map<string, string> {
  if (!existsSync(verificationPath)) return new Map();
  const parsed = JSON.parse(readFileSync(verificationPath, "utf8")) as {
    listings?: Record<string, { verification_state?: string }>;
  };
  const entries = Object.entries(parsed.listings ?? {});
  return new Map(entries.flatMap(([listingId, record]) => {
    const state = record.verification_state?.trim();
    return state ? [[listingId, state] as const] : [];
  }));
}

function toInput(): SnapshotProductInput[] {
  const verification = verificationByListing();
  return getAllProducts().map((product) => {
    const boonbuyUrl = product.affiliate_link?.trim() ?? "";
    const listingId = product.listingId ?? `row:${product.id}`;
    return {
      listingId,
      price: product.price,
      imageUrl: product.image ?? "",
      qcLinked: Boolean(product.qc_link?.trim()),
      brand: getDisplayBrand(product),
      category: product.category_slug,
      sourceUrl: cleanUrl(boonbuyUrl),
      boonbuyUrl,
      verification: verification.get(listingId),
    };
  });
}

function main() {
  const date = utcSnapshotDate();
  const dayPath = path.join(dayDir, `${date}.json`);
  if (existsSync(dayPath)) {
    console.log(`catalog snapshot ${date} already exists`);
    return;
  }

  const result = createDailySnapshot({
    date,
    products: toInput(),
    presence: readPresence(),
    dayExists: false,
  });
  if (result.status !== "created") {
    console.log(`catalog snapshot ${date} already exists`);
    return;
  }

  mkdirSync(dayDir, { recursive: true });
  writeFileSync(dayPath, `${JSON.stringify(result.day, null, 2)}\n`);
  writeFileSync(presencePath, `${JSON.stringify(result.presence, null, 2)}\n`);
  console.log(
    `catalog snapshot ${date}: ${result.day.aggregates.totalProducts} products, ` +
      `${result.day.added.length} added, ${result.day.removed.length} removed, ` +
      `${result.day.priceChanges.length} price changes`
  );
}

main();
