import { SEO_ARCHITECTURE_PAGES, SEO_ARCHITECTURE_SLUGS } from "@/lib/seo-architecture/registry";
import { GUIDE_PAGES, GUIDE_SLUGS } from "@/lib/guides";
import { SITE_NAME } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";
import { getSeoArchitectureContentDates } from "@/lib/seo-architecture/dates";
import { getGuideContentDates } from "@/lib/content-dates";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items: {
    title: string;
    link: string;
    description: string;
    pubDate: string;
  }[] = [];

  for (const slug of SEO_ARCHITECTURE_SLUGS) {
    const page = SEO_ARCHITECTURE_PAGES[slug];
    const dates = getSeoArchitectureContentDates(slug);
    items.push({
      title: page.h1,
      link: `${SITE_URL}${page.path}`,
      description: page.metaDescription,
      pubDate: new Date(dates.updatedIso).toUTCString(),
    });
  }

  for (const slug of GUIDE_SLUGS) {
    const guide = GUIDE_PAGES[slug];
    const dates = getGuideContentDates(slug);
    items.push({
      title: guide.h1,
      link: `${SITE_URL}${guide.path}`,
      description: guide.metaDescription,
      pubDate: new Date(dates.updatedIso).toUTCString(),
    });
  }

  items.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Guides &amp; SEO Articles</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml("Latest guides, comparisons, and spreadsheet articles from BoonBuy Finds.")}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items
      .slice(0, 80)
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
