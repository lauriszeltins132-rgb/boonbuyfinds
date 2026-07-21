import { getDatasetSyncedIso } from "@/lib/catalog-meta";

export const SEO_ARCHITECTURE_PUBLISHED_ISO = "2026-06-15T00:00:00.000Z";

const PUBLISH_OVERRIDES: Record<string, string> = {
  boonbuy: "2026-05-01T00:00:00.000Z",
  "boonbuy-finds": "2026-05-10T00:00:00.000Z",
  "boonbuy-spreadsheet": "2026-05-12T00:00:00.000Z",
  "how-to-buy-from-taobao": "2026-05-20T00:00:00.000Z",
  "how-to-buy-from-weidian": "2026-05-20T00:00:00.000Z",
};

export function getSeoArchitectureContentDates(slug: string) {
  const updatedIso = getDatasetSyncedIso();
  const publishedIso = PUBLISH_OVERRIDES[slug] ?? SEO_ARCHITECTURE_PUBLISHED_ISO;
  return { publishedIso, updatedIso };
}
