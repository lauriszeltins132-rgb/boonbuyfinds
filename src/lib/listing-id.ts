/**
 * Marketplace listing identity parsed from a BoonBuy product URL.
 * The same listing can appear on more than one spreadsheet row.
 */
const LISTING_ID_PATTERN =
  /(?:^|\/)(weidian|taobao|1688|tmall)\/(\d+)/i;

export function getListingId(affiliateLink: string | null | undefined): string | null {
  if (!affiliateLink) return null;
  const match = affiliateLink.match(LISTING_ID_PATTERN);
  if (!match) return null;
  return `${match[1].toLowerCase()}:${match[2]}`;
}
