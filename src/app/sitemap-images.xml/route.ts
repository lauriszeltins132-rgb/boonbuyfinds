import { getAllProducts } from "@/lib/products";
import { resolveProductDisplayImage } from "@/lib/product-image-presentation";
import { getProductHref } from "@/lib/slugs";
import { SEO_ARCHITECTURE_PAGES, SEO_ARCHITECTURE_SLUGS } from "@/lib/seo-architecture/registry";
import { PROMO_OG_IMAGE_URL } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const urls: { loc: string; image: string; title: string; caption?: string }[] =
    [];

  for (const slug of SEO_ARCHITECTURE_SLUGS) {
    const page = SEO_ARCHITECTURE_PAGES[slug];
    if (page.heroImage) {
      const imageUrl = page.heroImage.src.startsWith("http")
        ? page.heroImage.src
        : `${SITE_URL}${page.heroImage.src}`;
      urls.push({
        loc: `${SITE_URL}${page.path}`,
        image: imageUrl,
        title: page.h1,
        caption: page.heroImage.caption,
      });
    }
  }

  urls.push({
    loc: SITE_URL,
    image: PROMO_OG_IMAGE_URL,
    title: "BoonBuy Finds",
    caption: "BoonBuy Finds promotional image",
  });

  const products = getAllProducts().slice(0, 500);
  for (const product of products) {
    const resolved = resolveProductDisplayImage(product);
    const src = resolved?.displaySrc;
    if (!src) continue;
    const imageUrl = src.startsWith("http") ? src : `${SITE_URL}${src}`;
    urls.push({
      loc: `${SITE_URL}${getProductHref(product)}`,
      image: imageUrl,
      title: product.product_name,
      caption: `${product.product_name} — BoonBuy find`,
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <image:image>
      <image:loc>${escapeXml(entry.image)}</image:loc>
      <image:title>${escapeXml(entry.title)}</image:title>${entry.caption ? `\n      <image:caption>${escapeXml(entry.caption)}</image:caption>` : ""}
    </image:image>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
