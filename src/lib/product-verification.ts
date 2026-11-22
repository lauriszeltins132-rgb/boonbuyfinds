/**
 * Truthful verification for one canonical listing.
 *
 * Observed on 22 Nov 2026:
 * - https://boonbuy.com/product/weidian/{id} returns the same ~14.7KB HTML
 *   app shell for a real id and for id 0000000001. The document has
 *   window.__bbThemeBoot and <div id="app">, and it does not contain the
 *   listing id. HTTP 200 is not product evidence.
 * - GET https://gateway.boonbuy.com/unified-service/catalog-service/profile
 *   is the page's product API (channel + spuNo). From this server it answers
 *   with a Cloudflare challenge. A challenge is neither VERIFIED nor BROKEN.
 * - A live Weidian item page embeds item_id and item_name. A missing id
 *   returns HTTP 200 with the same title and no item record, so that page
 *   is UNKNOWN, not BROKEN.
 * - https://t.me/{channel}/{post} returns HTTP 200 for a missing post.
 *   The post is present only when https://t.me/s/{channel}/{post} contains
 *   data-post="{channel}/{post}".
 *
 * verification_state is VERIFIED only when the BoonBuy profile JSON identifies
 * this listing and includes a title. A live source, image, or QC post does
 * not verify the product.
 */

export type VerificationState = "VERIFIED" | "UNKNOWN" | "BROKEN";

export type VerificationField = "source" | "image" | "destination" | "qc";

export type TransientCode =
  | "timeout"
  | "network"
  | "http_408"
  | "http_429"
  | "http_5xx"
  | "challenge";

export type ImageEvidence = "missing" | "invalid" | "prior_dead" | "hosted" | "unchecked";

export type VerificationSubject = {
  listingId: string;
  platform: string | null;
  listingNumericId: string | null;
  destinationUrl: string;
  imageEvidence: ImageEvidence;
  qcUrl: string;
};

export type PageObservation =
  | { kind: "transient"; code: TransientCode; httpStatus: number | null }
  | { kind: "http"; httpStatus: number; contentType: string; body: string };

export type FieldCheck = {
  status: VerificationState;
  code: string;
  checked_at: string | null;
  http_status: number | null;
};

export type ListingVerification = {
  listingId: string;
  last_checked_at: string | null;
  last_attempt_at: string | null;
  source_status: VerificationState;
  image_status: VerificationState;
  destination_status: VerificationState;
  qc_status: VerificationState;
  verification_state: VerificationState;
  source: FieldCheck;
  image: FieldCheck;
  destination: FieldCheck;
  qc: FieldCheck;
};

export type VerificationStore = {
  listings: Record<string, ListingVerification>;
};

export const VERIFICATION_COOLDOWN_MS = 6 * 60 * 60 * 1000;
export const VERIFICATION_BATCH_LIMIT = 20;

const SETTLED_WITHOUT_FETCH = new Set([
  "invalid_source",
  "invalid_destination",
  "image_missing",
  "image_invalid",
  "image_hosted",
  "qc_absent",
  "qc_invalid",
]);

const TITLE_KEYS = ["subject", "title", "itemName", "productName", "item_name"] as const;

export function emptyStore(): VerificationStore {
  return { listings: {} };
}

export function check(status: VerificationState, code: string, httpStatus: number | null = null, checkedAt: string | null = null): FieldCheck {
  return { status, code, checked_at: checkedAt, http_status: httpStatus };
}

export function isBoonBuyProductUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "boonbuy.com" && /^\/product\/(?:weidian|taobao|1688|tmall)\/\d+\/?$/i.test(url.pathname);
  } catch {
    return false;
  }
}

export function isBoonBuyAppShell(body: string, listingNumericId: string | null): boolean {
  if (!body.includes("window.__bbThemeBoot") || !body.includes('<div id="app">')) return false;
  if (listingNumericId && body.includes(listingNumericId)) return false;
  return true;
}

export function isCloudflareChallenge(httpStatus: number, body: string): boolean {
  if (httpStatus !== 403 && httpStatus !== 503) return false;
  const text = body.slice(0, 2000).toLowerCase();
  return text.includes("just a moment") || text.includes("cf-challenge") || text.includes("challenges.cloudflare.com");
}

/** Weidian prints the item only when the listing exists. HTTP 200 alone does not. */
export function weidianItemName(body: string, listingNumericId: string): string | null {
  const patterns = [
    new RegExp(`&#34;item_id&#34;:&#34;${listingNumericId}&#34;,&#34;item_name&#34;:&#34;([^&]{1,200})&#34;`),
    new RegExp(`"item_id":"${listingNumericId}","item_name":"([^"]{1,200})"`),
  ];
  for (const pattern of patterns) {
    const match = body.match(pattern);
    const name = match?.[1]?.trim();
    if (name) return name;
  }
  return null;
}

export function telegramPreviewUrl(qcUrl: string): string | null {
  try {
    const url = new URL(qcUrl);
    if (url.protocol !== "https:" || (url.hostname !== "t.me" && url.hostname !== "telegram.me")) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] === "s") parts.shift();
    if (parts.length < 2 || !/^\d+$/.test(parts[1])) return null;
    return `https://t.me/s/${parts[0]}/${parts[1]}`;
  } catch {
    return null;
  }
}

export function telegramPostPresent(body: string, qcUrl: string): boolean {
  const preview = telegramPreviewUrl(qcUrl);
  if (!preview) return false;
  const target = preview.replace("https://t.me/s/", "");
  return body.includes(`data-post="${target}"`);
}

export function isSettledCheck(field: FieldCheck): boolean {
  return field.checked_at != null || SETTLED_WITHOUT_FETCH.has(field.code);
}

export function isFullySettled(record: ListingVerification): boolean {
  return isSettledCheck(record.source) && isSettledCheck(record.image) && isSettledCheck(record.destination) && isSettledCheck(record.qc);
}

export function verificationStateOf(fields: Pick<ListingVerification, "source" | "image" | "destination" | "qc">): VerificationState {
  if (fields.destination.status === "VERIFIED" && fields.source.status !== "BROKEN" && fields.image.status !== "BROKEN") {
    return "VERIFIED";
  }
  if (fields.source.status === "BROKEN" || fields.image.status === "BROKEN" || fields.destination.status === "BROKEN") {
    return "BROKEN";
  }
  return "UNKNOWN";
}

function withState(listingId: string, source: FieldCheck, image: FieldCheck, destination: FieldCheck, qc: FieldCheck, lastCheckedAt: string | null, lastAttemptAt: string | null): ListingVerification {
  return {
    listingId,
    last_checked_at: lastCheckedAt,
    last_attempt_at: lastAttemptAt,
    source_status: source.status,
    image_status: image.status,
    destination_status: destination.status,
    qc_status: qc.status,
    verification_state: verificationStateOf({ source, image, destination, qc }),
    source,
    image,
    destination,
    qc,
  };
}

/** Rules that do not fetch. They never invent a check time. */
export function classifyStructural(subject: VerificationSubject): ListingVerification {
  const source = subject.platform && subject.listingNumericId
    ? check("UNKNOWN", "source_unchecked")
    : check("BROKEN", "invalid_source");
  const destination = isBoonBuyProductUrl(subject.destinationUrl)
    ? check("UNKNOWN", "destination_shell_rule")
    : check("BROKEN", "invalid_destination");
  const image = classifyStructuralImage(subject.imageEvidence);
  const qc = classifyStructuralQc(subject.qcUrl);
  return withState(subject.listingId, source, image, destination, qc, null, null);
}

function classifyStructuralImage(evidence: ImageEvidence): FieldCheck {
  switch (evidence) {
    case "missing":
      return check("BROKEN", "image_missing");
    case "invalid":
      return check("BROKEN", "image_invalid");
    case "hosted":
      return check("VERIFIED", "image_hosted");
    case "prior_dead":
      return check("UNKNOWN", "image_prior_dead");
    default:
      return check("UNKNOWN", "image_unchecked");
  }
}

function classifyStructuralQc(qcUrl: string): FieldCheck {
  const value = qcUrl.trim();
  if (!value) return check("UNKNOWN", "qc_absent");
  if (!telegramPreviewUrl(value)) return check("BROKEN", "qc_invalid");
  return check("UNKNOWN", "qc_unchecked");
}

export function interpretSource(subject: VerificationSubject, observation: PageObservation): { check: FieldCheck; transient: boolean } {
  if (!subject.platform || !subject.listingNumericId) {
    return { check: check("BROKEN", "invalid_source"), transient: false };
  }
  if (observation.kind === "transient") return { check: check("UNKNOWN", observation.code, observation.httpStatus), transient: true };
  if (observation.httpStatus === 404) return { check: check("BROKEN", "source_http_404", 404), transient: false };
  if (observation.httpStatus === 410) return { check: check("BROKEN", "source_http_410", 410), transient: false };
  if (observation.httpStatus >= 500 || observation.httpStatus === 408 || observation.httpStatus === 429) {
    return { check: check("UNKNOWN", observation.httpStatus === 429 ? "http_429" : observation.httpStatus === 408 ? "http_408" : "http_5xx", observation.httpStatus), transient: true };
  }
  if (isCloudflareChallenge(observation.httpStatus, observation.body)) {
    return { check: check("UNKNOWN", "challenge", observation.httpStatus), transient: true };
  }
  if (subject.platform === "weidian" && observation.httpStatus >= 200 && observation.httpStatus < 300) {
    const name = weidianItemName(observation.body, subject.listingNumericId);
    if (name) return { check: check("VERIFIED", "source_item_record", observation.httpStatus), transient: false };
    return { check: check("UNKNOWN", "source_unproven", observation.httpStatus), transient: false };
  }
  if (observation.httpStatus >= 200 && observation.httpStatus < 300) {
    return { check: check("UNKNOWN", "source_unproven", observation.httpStatus), transient: false };
  }
  return { check: check("UNKNOWN", "source_unproven", observation.httpStatus), transient: true };
}

export function interpretDestination(subject: VerificationSubject, observation: PageObservation): { check: FieldCheck; transient: boolean } {
  if (!isBoonBuyProductUrl(subject.destinationUrl)) {
    return { check: check("BROKEN", "invalid_destination"), transient: false };
  }
  if (observation.kind === "transient") return { check: check("UNKNOWN", observation.code, observation.httpStatus), transient: true };
  if (observation.httpStatus === 404) return { check: check("BROKEN", "destination_http_404", 404), transient: false };
  if (observation.httpStatus === 410) return { check: check("BROKEN", "destination_http_410", 410), transient: false };
  if (observation.httpStatus === 401 || observation.httpStatus === 403 || observation.httpStatus === 503 || isCloudflareChallenge(observation.httpStatus, observation.body)) {
    return { check: check("UNKNOWN", "challenge", observation.httpStatus), transient: true };
  }
  if (observation.httpStatus >= 500 || observation.httpStatus === 408 || observation.httpStatus === 429) {
    return { check: check("UNKNOWN", observation.httpStatus === 429 ? "http_429" : "http_5xx", observation.httpStatus), transient: true };
  }
  const profile = readProfile(observation, subject);
  if (profile === "verified") return { check: check("VERIFIED", "destination_profile", observation.httpStatus), transient: false };
  if (profile === "mismatch") return { check: check("UNKNOWN", "destination_mismatch", observation.httpStatus), transient: false };
  if (profile === "unproven") return { check: check("UNKNOWN", "destination_api_unproven", observation.httpStatus), transient: false };
  if (isBoonBuyAppShell(observation.body, subject.listingNumericId)) {
    return { check: check("UNKNOWN", "destination_shell", observation.httpStatus), transient: false };
  }
  return { check: check("UNKNOWN", "destination_unproven", observation.httpStatus), transient: false };
}

function readProfile(observation: PageObservation, subject: VerificationSubject): "verified" | "mismatch" | "unproven" | "not_json" {
  if (observation.kind !== "http") return "not_json";
  const type = observation.contentType.toLowerCase();
  const trimmed = observation.body.trim();
  if (!type.includes("json") && !trimmed.startsWith("{")) return "not_json";
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return "not_json";
  }
  if (!parsed || typeof parsed !== "object") return "not_json";
  const record = parsed as { success?: unknown; result?: unknown };
  if (record.success !== true) return "unproven";
  if (!record.result || typeof record.result !== "object") return "unproven";
  const result = record.result as Record<string, unknown>;
  const spu = result.spuNo == null ? "" : String(result.spuNo);
  if (!subject.listingNumericId || spu !== subject.listingNumericId) return "mismatch";
  if (result.channel != null && !channelMatches(subject.platform, result.channel)) return "mismatch";
  const title = TITLE_KEYS.map((key) => result[key]).find((value) => typeof value === "string" && value.trim());
  return typeof title === "string" ? "verified" : "unproven";
}

function channelMatches(platform: string | null, channel: unknown): boolean {
  const value = String(channel).trim().toLowerCase();
  if (platform === "weidian") return value === "weidian" || value === "2";
  if (platform === "taobao" || platform === "tmall") return value === "taobao" || value === "tmall" || value === "1";
  if (platform === "1688") return value === "1688" || value === "0";
  return false;
}

export function interpretImage(observation: PageObservation): { check: FieldCheck; transient: boolean } {
  if (observation.kind === "transient") return { check: check("UNKNOWN", observation.code, observation.httpStatus), transient: true };
  if (observation.httpStatus === 404) return { check: check("BROKEN", "image_http_404", 404), transient: false };
  if (observation.httpStatus === 410) return { check: check("BROKEN", "image_http_410", 410), transient: false };
  if (observation.httpStatus >= 500 || observation.httpStatus === 408 || observation.httpStatus === 429) {
    return { check: check("UNKNOWN", observation.httpStatus === 429 ? "http_429" : "http_5xx", observation.httpStatus), transient: true };
  }
  if (observation.httpStatus >= 200 && observation.httpStatus < 300 && observation.contentType.toLowerCase().startsWith("image/")) {
    return { check: check("VERIFIED", "image_bytes", observation.httpStatus), transient: false };
  }
  if (observation.httpStatus >= 200 && observation.httpStatus < 300) {
    return { check: check("UNKNOWN", "image_not_image", observation.httpStatus), transient: false };
  }
  return { check: check("UNKNOWN", "image_unproven", observation.httpStatus), transient: true };
}

export function interpretQc(qcUrl: string, observation: PageObservation): { check: FieldCheck; transient: boolean } {
  if (!qcUrl.trim()) return { check: check("UNKNOWN", "qc_absent"), transient: false };
  if (!telegramPreviewUrl(qcUrl)) return { check: check("BROKEN", "qc_invalid"), transient: false };
  if (observation.kind === "transient") return { check: check("UNKNOWN", observation.code, observation.httpStatus), transient: true };
  if (observation.httpStatus === 404) return { check: check("BROKEN", "qc_http_404", 404), transient: false };
  if (observation.httpStatus === 410) return { check: check("BROKEN", "qc_http_410", 410), transient: false };
  if (observation.httpStatus >= 500 || observation.httpStatus === 408 || observation.httpStatus === 429) {
    return { check: check("UNKNOWN", observation.httpStatus === 429 ? "http_429" : "http_5xx", observation.httpStatus), transient: true };
  }
  if (observation.httpStatus >= 200 && observation.httpStatus < 300 && telegramPostPresent(observation.body, qcUrl)) {
    return { check: check("VERIFIED", "qc_post", observation.httpStatus), transient: false };
  }
  if (observation.httpStatus >= 200 && observation.httpStatus < 300) {
    return { check: check("UNKNOWN", "qc_unproven", observation.httpStatus), transient: false };
  }
  return { check: check("UNKNOWN", "qc_unproven", observation.httpStatus), transient: true };
}

export type AttemptObservations = {
  source?: PageObservation | null;
  destinationHtml?: PageObservation | null;
  destinationProfile?: PageObservation | null;
  image?: PageObservation | null;
  qc?: PageObservation | null;
};

/**
 * Merge one attempt into the stored record.
 * A transient field keeps its previous status and does not receive checked_at.
 * Permanent results replace that field. History of other days is not stored here;
 * this file is the latest check per listing, and the caller must not delete listings.
 */
export function applyVerificationAttempt(input: {
  previous: ListingVerification | null;
  subject: VerificationSubject;
  observations: AttemptObservations;
  now: string;
}): { record: ListingVerification; transient: VerificationField[] } {
  const base = input.previous ?? classifyStructural(input.subject);
  const transient: VerificationField[] = [];

  let source = base.source;
  if (input.observations.source) {
    const interpreted = interpretSource(input.subject, input.observations.source);
    if (interpreted.transient) transient.push("source");
    else source = { ...interpreted.check, checked_at: input.now };
  }

  let destination = base.destination;
  const profile = input.observations.destinationProfile
    ? interpretDestination(input.subject, input.observations.destinationProfile)
    : null;
  const html = input.observations.destinationHtml
    ? interpretDestination(input.subject, input.observations.destinationHtml)
    : null;
  if (profile && !profile.transient && profile.check.status === "VERIFIED") {
    destination = { ...profile.check, checked_at: input.now };
  } else if (profile?.transient && html && !html.transient) {
    destination = { ...html.check, code: html.check.code === "destination_shell" ? "destination_shell" : html.check.code, checked_at: input.now };
  } else if (profile && !profile.transient) {
    destination = { ...profile.check, checked_at: input.now };
  } else if (html && !html.transient) {
    destination = { ...html.check, checked_at: input.now };
  } else if (profile?.transient || html?.transient) {
    transient.push("destination");
  }

  let image = base.image;
  if (input.observations.image) {
    const interpreted = interpretImage(input.observations.image);
    if (interpreted.transient) transient.push("image");
    else image = { ...interpreted.check, checked_at: input.now };
  }

  let qc = base.qc;
  if (input.observations.qc) {
    const interpreted = interpretQc(input.subject.qcUrl, input.observations.qc);
    if (interpreted.transient) transient.push("qc");
    else qc = { ...interpreted.check, checked_at: input.now };
  }

  const next = withState(input.subject.listingId, source, image, destination, qc, base.last_checked_at, input.now);
  next.last_checked_at = transient.length === 0 && isFullySettled(next) ? input.now : base.last_checked_at;
  return { record: next, transient };
}

export function selectVerificationBatch(input: {
  listingIds: string[];
  store: VerificationStore;
  nowMs: number;
  limit: number;
  cooldownMs?: number;
}): string[] {
  const cooldown = input.cooldownMs ?? VERIFICATION_COOLDOWN_MS;
  const candidates = input.listingIds.filter((listingId) => {
    const record = input.store.listings[listingId];
    if (!record) return true;
    if (isFullySettled(record) && !record.last_checked_at) return false;
    if (!record.last_checked_at && record.last_attempt_at) {
      const attempted = Date.parse(record.last_attempt_at);
      if (Number.isFinite(attempted) && input.nowMs - attempted < cooldown) return false;
    }
    return true;
  });
  candidates.sort((left, right) => {
    const leftChecked = input.store.listings[left]?.last_checked_at ?? "";
    const rightChecked = input.store.listings[right]?.last_checked_at ?? "";
    if (leftChecked !== rightChecked) return leftChecked < rightChecked ? -1 : 1;
    return left.localeCompare(right);
  });
  return candidates.slice(0, Math.max(0, input.limit));
}

export function countVerification(store: VerificationStore): {
  listings: number;
  verified: number;
  unknown: number;
  broken: number;
  sourceVerified: number;
  imageVerified: number;
  destinationVerified: number;
  qcVerified: number;
} {
  const records = Object.values(store.listings);
  return {
    listings: records.length,
    verified: records.filter((record) => record.verification_state === "VERIFIED").length,
    unknown: records.filter((record) => record.verification_state === "UNKNOWN").length,
    broken: records.filter((record) => record.verification_state === "BROKEN").length,
    sourceVerified: records.filter((record) => record.source_status === "VERIFIED").length,
    imageVerified: records.filter((record) => record.image_status === "VERIFIED").length,
    destinationVerified: records.filter((record) => record.destination_status === "VERIFIED").length,
    qcVerified: records.filter((record) => record.qc_status === "VERIFIED").length,
  };
}
