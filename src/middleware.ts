import { NextRequest, NextResponse } from "next/server";
import listingRedirects from "@/data/listing-redirects.json";
import { resolveCleanCatalogPath } from "@/lib/seo-filter-routes";

const duplicateFindPaths = new Map<string, string>(
  listingRedirects.redirects.map((redirect) => [redirect.from, redirect.to])
);

const FILTER_KEYS = [
  "q",
  "brand",
  "category",
  "min",
  "max",
  "sort",
  "qc",
  "page",
  "saved",
] as const;

function hasCatalogFilters(searchParams: URLSearchParams): boolean {
  return FILTER_KEYS.some((key) => {
    const value = searchParams.get(key);
    return Boolean(value && value.length > 0);
  });
}

/**
 * Keep `/` cacheable (ISR). Route filter queries to clean brand pages when
 * possible, otherwise `/browse` (noindex) so param URLs never dynamize `/`.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const findPath = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  const canonicalFind = duplicateFindPaths.get(findPath);
  if (canonicalFind) {
    const url = request.nextUrl.clone();
    url.pathname = canonicalFind;
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/" || pathname === "/browse") {
    if (!hasCatalogFilters(searchParams)) {
      return NextResponse.next();
    }

    const clean = resolveCleanCatalogPath(searchParams);
    if (clean) {
      const url = request.nextUrl.clone();
      url.pathname = clean;
      url.search = "";
      return NextResponse.redirect(url, 308);
    }

    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/browse";
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/browse", "/find/:path*"],
};
