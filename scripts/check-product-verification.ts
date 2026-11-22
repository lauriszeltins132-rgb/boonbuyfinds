/**
 * Check a small batch of canonical listings and merge the results into
 * data/catalog-verification/listings.json.
 *
 * Idempotent structural pass (`--structural`) classifies every listing from
 * URL shape and image evidence already in the repo. It does not invent
 * last_checked_at. A later pass keeps any field that already has checked_at.
 *
 * Network pass fetches only listings selected by oldest last_checked_at,
 * skipping a listing whose last attempt failed transiently inside the cooldown.
 * Permanent 404/410 responses are stored. Timeouts, 429s, 5xx, and Cloudflare
 * challenges are retried and then left unchanged.
 *
 * This does not run during page rendering or `npm run build`. Vercel Cron
 * cannot keep the file: the server disk is ephemeral. The scheduler is
 * .github/workflows/catalog-verification.yml at 04:30 UTC.
 *
 * Run: npm run verify:catalog
 *      npm run verify:catalog -- --structural
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildMarketplaceSourceUrl } from "../src/lib/agents";
import { isCatalogImageUrlDead } from "../src/lib/dead-images";
import { validateImageUrl } from "../src/lib/image-url";
import { getListingId } from "../src/lib/listing-id";
import { getProductImageCdn } from "../src/lib/product-image-cdn";
import {
  applyVerificationAttempt,
  classifyStructural,
  countVerification,
  emptyStore,
  selectVerificationBatch,
  telegramPreviewUrl,
  verificationStateOf,
  VERIFICATION_BATCH_LIMIT,
  type ImageEvidence,
  type ListingVerification,
  type PageObservation,
  type TransientCode,
  type VerificationStore,
  type VerificationSubject,
} from "../src/lib/product-verification";
import { getAllProducts } from "../src/lib/products";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const storePath = path.join(root, "data", "catalog-verification", "listings.json");
const GAP_MS = 400;
const TIMEOUT_MS = 12_000;
const USER_AGENT = "BoonBuyFindsVerifier/1.0 (+https://boonbuyfinds.net)";

function readStore(): VerificationStore {
  if (!existsSync(storePath)) return emptyStore();
  const parsed = JSON.parse(readFileSync(storePath, "utf8")) as VerificationStore;
  if (!parsed || typeof parsed !== "object" || !parsed.listings) return emptyStore();
  return parsed;
}

function writeStore(store: VerificationStore) {
  mkdirSync(path.dirname(storePath), { recursive: true });
  const listings = Object.fromEntries(Object.entries(store.listings).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(storePath, `${JSON.stringify({ listings }, null, 2)}\n`);
}

function imageEvidence(image: string): ImageEvidence {
  const validation = validateImageUrl(image);
  if (!image.trim()) return "missing";
  if (!validation.valid) return "invalid";
  if (getProductImageCdn(image) || getProductImageCdn(validation.normalized)) return "hosted";
  if (isCatalogImageUrlDead(image) || isCatalogImageUrlDead(validation.normalized)) return "prior_dead";
  return "unchecked";
}

function subjectFor(product: { id: string; affiliate_link: string; image: string; qc_link: string; listingId?: string | null }): VerificationSubject {
  const listing = getListingId(product.affiliate_link);
  const [platform, numericId] = listing?.split(":") ?? [];
  return {
    listingId: product.listingId || listing || `row:${product.id}`,
    platform: platform ?? null,
    listingNumericId: numericId ?? null,
    destinationUrl: product.affiliate_link?.trim() ?? "",
    imageEvidence: imageEvidence(product.image ?? ""),
    qcUrl: product.qc_link?.trim() ?? "",
  };
}

function sourceUrl(subject: VerificationSubject): string | null {
  if (!subject.platform || !subject.listingNumericId) return null;
  if (subject.platform !== "weidian" && subject.platform !== "taobao" && subject.platform !== "1688") return null;
  return buildMarketplaceSourceUrl(subject.platform, subject.listingNumericId);
}

function mergeStructural(store: VerificationStore, subjects: VerificationSubject[]): VerificationStore {
  const listings = { ...store.listings };
  for (const subject of subjects) {
    const structural = classifyStructural(subject);
    const previous = listings[subject.listingId];
    if (!previous) {
      listings[subject.listingId] = structural;
      continue;
    }
    const keep = (field: "source" | "image" | "destination" | "qc") =>
      previous[field].checked_at ? previous[field] : structural[field];
    const source = keep("source");
    const image = keep("image");
    const destination = keep("destination");
    const qc = keep("qc");
    const fields = { source, image, destination, qc };
    listings[subject.listingId] = {
      ...previous,
      listingId: subject.listingId,
      source_status: source.status,
      image_status: image.status,
      destination_status: destination.status,
      qc_status: qc.status,
      verification_state: verificationStateOf(fields),
      ...fields,
    };
  }
  return { listings };
}

function retryLimit(code: TransientCode): number {
  return code === "challenge" ? 1 : 3;
}

async function fetchPage(url: string, kind: "document" | "image"): Promise<PageObservation> {
  let last: PageObservation = { kind: "transient", code: "network", httpStatus: null };
  const attempts = 3;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    last = await fetchOnce(url, kind);
    if (last.kind === "http") return last;
    if (attempt >= retryLimit(last.code) || attempt >= attempts) return last;
    await sleep(GAP_MS * attempt);
  }
  return last;
}

async function fetchOnce(url: string, kind: "document" | "image"): Promise<PageObservation> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: kind === "image" ? "image/avif,image/webp,image/*,*/*" : "text/html,application/json;q=0.9,*/*;q=0.8",
        ...(kind === "image" ? { Range: "bytes=0-32" } : {}),
      },
    });
    const contentType = response.headers.get("content-type") ?? "";
    if (kind === "image" && contentType.toLowerCase().startsWith("image/")) {
      await response.body?.cancel();
      return { kind: "http", httpStatus: response.status, contentType, body: "" };
    }
    const body = await readLimited(response, 200_000);
    if ((response.status === 401 || response.status === 403 || response.status === 503) && !contentType.toLowerCase().includes("json")) {
      return { kind: "transient", code: "challenge", httpStatus: response.status };
    }
    if (response.status === 408) return { kind: "transient", code: "http_408", httpStatus: 408 };
    if (response.status === 429) return { kind: "transient", code: "http_429", httpStatus: 429 };
    if (response.status >= 500) return { kind: "transient", code: "http_5xx", httpStatus: response.status };
    return { kind: "http", httpStatus: response.status, contentType, body };
  } catch (error) {
    const name = error instanceof Error ? error.name : "";
    return { kind: "transient", code: name === "AbortError" || name === "TimeoutError" ? "timeout" : "network", httpStatus: null };
  } finally {
    clearTimeout(timer);
  }
}

async function readLimited(response: Response, limit: number): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (size < limit) {
    const next = await reader.read();
    if (next.done) break;
    chunks.push(next.value);
    size += next.value.byteLength;
  }
  await reader.cancel();
  const merged = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk.subarray(0, Math.max(0, limit - offset)), offset);
    offset += chunk.byteLength;
    if (offset >= limit) break;
  }
  return new TextDecoder().decode(merged.subarray(0, limit));
}

function profileUrl(subject: VerificationSubject): string | null {
  if (subject.platform !== "weidian" && subject.platform !== "taobao" && subject.platform !== "1688" && subject.platform !== "tmall") return null;
  if (!subject.listingNumericId) return null;
  const channel = subject.platform === "weidian" ? "WEIDIAN" : subject.platform === "1688" ? "1688" : "TAOBAO";
  const url = new URL("https://gateway.boonbuy.com/unified-service/catalog-service/profile");
  url.searchParams.set("channel", channel);
  url.searchParams.set("spuNo", subject.listingNumericId);
  url.searchParams.set("refresh", "0");
  url.searchParams.set("allowStale", "1");
  return url.toString();
}

async function checkOne(subject: VerificationSubject, imageUrl: string, previous: ListingVerification | null, now: string) {
  const observations: Parameters<typeof applyVerificationAttempt>[0]["observations"] = {};
  const source = sourceUrl(subject);
  if (source && previous?.source.checked_at == null && previous?.source.code !== "invalid_source") {
    observations.source = await fetchPage(source, "document");
    await sleep(GAP_MS);
  }
  if (previous?.destination.checked_at == null && previous?.destination.code !== "invalid_destination") {
    const profile = profileUrl(subject);
    if (profile) {
      observations.destinationProfile = await fetchPage(profile, "document");
      await sleep(GAP_MS);
    }
    observations.destinationHtml = await fetchPage(subject.destinationUrl, "document");
    await sleep(GAP_MS);
  }
  const imageCode = previous?.image.code;
  if (imageUrl && (imageCode === "image_unchecked" || imageCode === "image_prior_dead")) {
    observations.image = await fetchPage(imageUrl, "image");
    await sleep(GAP_MS);
  }
  const preview = telegramPreviewUrl(subject.qcUrl);
  if (preview && previous?.qc.checked_at == null && previous?.qc.code === "qc_unchecked") {
    observations.qc = await fetchPage(preview, "document");
  }
  return applyVerificationAttempt({ previous, subject, observations, now });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function printCounts(store: VerificationStore) {
  const counts = countVerification(store);
  console.log(
    `verification listings ${counts.listings}: state verified ${counts.verified}, unknown ${counts.unknown}, broken ${counts.broken}; ` +
      `fields source ${counts.sourceVerified}, image ${counts.imageVerified}, destination ${counts.destinationVerified}, qc ${counts.qcVerified}`
  );
}

async function main() {
  const structuralOnly = process.argv.includes("--structural");
  const rawRows = JSON.parse(readFileSync(path.join(root, "src", "data", "products.json"), "utf8")) as { id: string; image?: string }[];
  const rawImageById = new Map(rawRows.map((row) => [row.id, row.image ?? ""]));
  const products = getAllProducts();
  const subjects = products.map((product) => subjectFor({ ...product, image: rawImageById.get(product.id) || product.image || "" }));
  const imageByListing = new Map(subjects.map((subject, index) => [subject.listingId, rawImageById.get(products[index].id) || ""]));
  const byId = new Map(subjects.map((subject) => [subject.listingId, subject]));
  let store = mergeStructural(readStore(), subjects);
  if (structuralOnly) {
    writeStore(store);
    printCounts(store);
    return;
  }

  const limit = Number(process.env.VERIFY_BATCH || VERIFICATION_BATCH_LIMIT);
  const now = new Date();
  const batch = selectVerificationBatch({
    listingIds: subjects.map((subject) => subject.listingId),
    store,
    nowMs: now.getTime(),
    limit: Number.isFinite(limit) && limit > 0 ? limit : VERIFICATION_BATCH_LIMIT,
  });
  console.log(`verification batch ${batch.length}`);
  for (const listingId of batch) {
    const subject = byId.get(listingId);
    if (!subject) continue;
    const result = await checkOne(subject, imageByListing.get(listingId) ?? "", store.listings[listingId] ?? null, now.toISOString());
    store = { listings: { ...store.listings, [listingId]: result.record } };
    console.log(
      `${listingId} ${result.record.verification_state} source=${result.record.source.code} image=${result.record.image.code} destination=${result.record.destination.code} qc=${result.record.qc.code}` +
        (result.transient.length ? ` transient=${result.transient.join(",")}` : "")
    );
  }
  writeStore(store);
  printCounts(store);
}

main();
