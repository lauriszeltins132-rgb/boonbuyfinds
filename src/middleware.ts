import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const HOMEPAGE_CATALOG_KEYS = new Set([
  "q",
  "brand",
  "min",
  "max",
  "sort",
  "qc",
  "saved",
  "page",
]);

/**
 * Keep `/` cacheable for Googlebot. Catalog filter query strings move to `/browse`.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  let hasCatalogParams = false;
  for (const key of searchParams.keys()) {
    if (HOMEPAGE_CATALOG_KEYS.has(key)) {
      hasCatalogParams = true;
      break;
    }
  }
  if (!hasCatalogParams) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/browse";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/",
};
