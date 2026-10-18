/**
 * Truthful lastmod for pages whose *content* changed meaningfully —
 * not every URL on every build.
 *
 * Product / brand / category lastmod still comes from catalog sync.
 * Bump a path here only when main content, schema, or primary CTAs change.
 */

export const SEO_CONTENT_REVISIONS: Record<string, string> = {
  "/": "2026-10-17T16:00:00.000Z",
  "/boonbuy": "2026-10-17T16:00:00.000Z",
  "/boonbuy-finds": "2026-10-18T19:00:00.000Z",
  "/boonbuy-spreadsheet": "2026-10-18T19:00:00.000Z",
  "/boonbuy-qc": "2026-10-18T19:00:00.000Z",
  "/boonbuy-coupons": "2026-10-18T19:00:00.000Z",
  "/boonbuy-stats": "2026-10-18T19:00:00.000Z",
  "/boonbuy-shipping-coupon": "2026-09-25T11:52:00.000Z",
  "/boonbuy-shipping": "2026-10-18T19:00:00.000Z",
  "/boonbuy-review": "2026-09-25T11:52:00.000Z",
  "/is-boonbuy-legit": "2026-09-25T11:52:00.000Z",
  "/boonbuy-telegram": "2026-09-25T11:52:00.000Z",
  "/boonbuy-warehouse": "2026-09-25T11:52:00.000Z",
  "/boonbuy-questions": "2026-09-25T11:52:00.000Z",
  "/about": "2026-09-25T11:52:00.000Z",
  "/editorial-policy": "2026-09-25T11:52:00.000Z",
  "/contact": "2026-09-25T11:52:00.000Z",
};

export function getSeoContentRevisionDate(path: string): Date | null {
  const iso = SEO_CONTENT_REVISIONS[path];
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}
