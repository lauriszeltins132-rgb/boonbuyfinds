import { track } from "@vercel/analytics";
import { extractBrand } from "./brands";
import { readSessionStorage, writeSessionStorage } from "./safe-storage";
import type { Product } from "./types";

export type ConversionEvent =
  | "page_view"
  | "product_view"
  | "register_impression"
  | "register_click"
  | "buy_click"
  | "qc_click"
  | "discord_click"
  | "telegram_click"
  | "broken_image"
  | "search_submit"
  | "search_chip_click"
  | "save_click"
  | "category_click"
  | "brand_click"
  | "collection_click"
  | "popup_impression"
  | "popup_close"
  /** Funnel events (landing → engage → outbound). */
  | "coupon_claim_click"
  | "coupon_code_copy"
  | "boonbuy_signup_click"
  | "product_buy_click"
  | "product_outbound_click"
  | "qc_product_click"
  | "brand_product_click"
  | "telegram_join_click"
  | "spreadsheet_browse_click"
  | "search_used"
  | "brand_open"
  | "qc_open";

export type ConversionPayload = {
  location?: string;
  /** Pathname only — never PII. */
  page?: string;
  /** CTA placement id (hero, sticky, howto, …). */
  cta_location?: string;
  productId?: string;
  productName?: string;
  brand?: string;
  category?: string;
  /** Prefer omitting free-text queries from public analytics. */
  query?: string;
  href?: string;
  variant?: string;
};

function getPagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname.slice(0, 160);
}

function cleanPayload(payload: ConversionPayload) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== "")
  );
}

function sendToApi(event: ConversionEvent, payload: ConversionPayload) {
  if (typeof window === "undefined") return;

  try {
    const body = JSON.stringify({ event, ...cleanPayload(payload), ts: Date.now() });
    const blob = new Blob([body], { type: "application/json" });

    if (navigator.sendBeacon?.("/api/analytics/event", blob)) return;

    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics must not interrupt the click that triggered it.
  }
}

export function trackConversion(
  event: ConversionEvent,
  payload: ConversionPayload = {}
) {
  const data = cleanPayload({
    page: payload.page ?? getPagePath(),
    ...payload,
  });
  try {
    track(event, data);
  } catch {
    // Vercel Analytics failures must not block outbound navigation.
  }
  sendToApi(event, data);
}

export function trackProductContext(
  event: "buy_click" | "qc_click",
  product: Product,
  location: string
) {
  const page = getPagePath();
  const payload: ConversionPayload = {
    location,
    cta_location: location,
    page,
    productId: product.id,
    productName: product.product_name,
    brand: extractBrand(product.product_name) ?? undefined,
    category: product.category,
  };
  trackConversion(event, payload);
  if (event === "buy_click") {
    trackConversion("product_buy_click", payload);
    trackConversion("product_outbound_click", payload);
    if (page?.startsWith("/brands/")) {
      trackConversion("brand_product_click", payload);
    }
  } else {
    trackConversion("qc_open", payload);
    trackConversion("qc_product_click", payload);
  }
}

export function trackRegisterClick(location: string) {
  const page = getPagePath();
  const payload: ConversionPayload = {
    location,
    cta_location: location,
    page,
  };
  trackConversion("register_click", payload);
  if (
    location.includes("coupon") ||
    page?.includes("coupon") ||
    page === "/boonbuy-shipping-coupon"
  ) {
    trackConversion("coupon_claim_click", payload);
  }
  trackConversion("boonbuy_signup_click", payload);
}

export function trackCouponCodeCopy(location: string) {
  trackConversion("coupon_code_copy", {
    location,
    cta_location: location,
    page: getPagePath(),
  });
}

export function trackRegisterImpression(location: string) {
  const key = `reg-imp-${location}`;
  if (readSessionStorage(key)) return;
  writeSessionStorage(key, "1");
  trackConversion("register_impression", {
    location,
    cta_location: location,
    page: getPagePath(),
  });
}

/** Count that search was used — do not send free-text query to analytics. */
export function trackSearchSubmit(_query: string, location: string) {
  const page = getPagePath();
  trackConversion("search_submit", { location, page });
  trackConversion("search_used", { location, page });
}

export function trackSearchChipClick(_query: string, location: string) {
  trackConversion("search_chip_click", { location, page: getPagePath() });
}

export function trackSaveClick(productId: string, location: string) {
  trackConversion("save_click", { location, productId, page: getPagePath() });
}

export function trackCategoryClick(href: string, location: string) {
  trackConversion("category_click", { location, href, page: getPagePath() });
}

export function trackBrandClick(href: string, location: string) {
  const page = getPagePath();
  trackConversion("brand_click", { location, href, page });
  trackConversion("brand_open", { location, href, page });
}

export function trackCollectionClick(href: string, location: string) {
  trackConversion("collection_click", { location, href, page: getPagePath() });
}

export function trackPopupImpression(location: string, variant: string) {
  const key = `popup-imp-${location}-${variant}`;
  if (readSessionStorage(key)) return;
  writeSessionStorage(key, "1");
  trackConversion("popup_impression", { location, variant, page: getPagePath() });
}

export function trackPopupClose(location: string, variant: string) {
  trackConversion("popup_close", { location, variant, page: getPagePath() });
}

export function getMobilePopupCtaVariant(): "a" | "b" {
  const stored = readSessionStorage("boonbuy-mobile-popup-cta");
  if (stored === "a" || stored === "b") return stored;
  const variant = Math.random() < 0.5 ? "a" : "b";
  writeSessionStorage("boonbuy-mobile-popup-cta", variant);
  return variant;
}

export function trackTelegramClick(location: string) {
  const page = getPagePath();
  trackConversion("telegram_click", { location, cta_location: location, page });
  trackConversion("telegram_join_click", { location, cta_location: location, page });
}

export function trackSpreadsheetBrowseClick(location: string, href = "/browse") {
  trackConversion("spreadsheet_browse_click", {
    location,
    cta_location: location,
    href,
    page: getPagePath(),
  });
}

export function trackBrokenImage(imageUrl: string, location: string) {
  trackConversion("broken_image", {
    location,
    productName: imageUrl.slice(0, 120),
    page: getPagePath(),
  });
}
