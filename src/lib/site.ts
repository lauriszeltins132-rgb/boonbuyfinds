export const SITE_URL = "https://boonbuyfinds.net";

/** Alternate marketing domain — 301s to SITE_URL in next.config.ts */
export const SITE_ALT_URL = "https://boonbuys.com";

export const SITE_DOMAINS = [SITE_URL, SITE_ALT_URL] as const;

/** Absolute URL on the canonical domain */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

/** Absolute URL on the alternate marketing domain (for sameAs / discovery) */
export function alternateAbsoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ALT_URL}${normalized === "/" ? "" : normalized}`;
}
