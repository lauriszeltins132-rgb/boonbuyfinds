import { NextRequest, NextResponse } from "next/server";

const FILTER_KEYS = ["q", "brand", "min", "max", "sort", "qc", "page", "saved"] as const;

/**
 * Keep `/` cacheable (ISR). Any catalog filter query on the homepage is
 * permanently redirected to `/browse` so searchParams never dynamize `/`.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  const hasFilter = FILTER_KEYS.some((key) => {
    const value = searchParams.get(key);
    return Boolean(value && value.length > 0);
  });

  if (!hasFilter) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/browse";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/"],
};
