import Link from "next/link";
import {
  HOMEPAGE_SEO_INDEX_BLURB,
  SEO_HUB_FOOTER_LINKS,
} from "@/lib/boonbuy-seo-hub";
import { PUBLIC_CATALOG_COUNT, PUBLIC_QC_COUNT } from "@/lib/constants";

const PARAGRAPHS = [
  `BoonBuy Finds is a searchable catalog of BoonBuy spreadsheet products. Instead of scrolling endless rows in a shared Google Sheet, you get ${PUBLIC_CATALOG_COUNT} indexed finds with photos, prices, ${PUBLIC_QC_COUNT} QC references, and one-click BoonBuy links. Whether you are hunting sneaker finds, fashion finds, or rep finds for your next haul, everything is organized by brand, category, and collection.`,
  "Spreadsheets were the original way the community shared Weidian and Taobao links — and they still work for power users. The problem is discovery: a sheet does not tell you which Nike Dunk batch has the best photos, which Moncler jacket has QC history, or what dropped today. BoonBuy Finds solves that by turning raw spreadsheet data into proper landing pages you can search, filter, and share.",
  "Search is the fastest path in. Type a brand like Jordan or Moncler, a category like hoodies or bags, or even a specific silhouette. The homepage search bar and catalog filters work together so you can narrow from thousands of listings to a shortlist worth opening. Each product page shows the listing image, USD price when available, marketplace source, and a Buy on BoonBuy button with a verified checkout link.",
  "QC photos are the reason many buyers use agents in the first place. After you order, the warehouse photographs your item so you can approve it or request an exchange before international shipping. BoonBuy Finds highlights listings with QC references — links to real warehouse photos from past orders — so you know what a batch looked like for other buyers. That does not replace your own QC set, but it helps you avoid obvious misses.",
  "Most finds on BoonBuy Finds come from Weidian and Taobao sellers. Weidian is popular for sneakers, streetwear, and independent brands; Taobao covers a wider mix of fashion and accessories. BoonBuy Finds does not host the shops — it indexes affiliate and community spreadsheet links and opens verified BoonBuy product URLs for checkout.",
  "This site is BoonBuy-only. Every buy button opens a verified BoonBuy listing so you get shipping discounts, QC workflows, and order tracking in one place — no multi-agent picker.",
  "Regular updates matter because spreadsheet catalogs move quickly. Sellers change prices, batches sell out, and new QC threads appear on Reddit and Telegram. BoonBuy Finds syncs with community sheets and engagement signals so Trending Today, Latest Finds, and collection pages reflect what people are actually clicking — not a static snapshot from months ago.",
  "Categories make browsing intuitive when you do not have a specific brand in mind. Sneakers and shoes cover Dunks, Jordans, New Balance, and more. Hoodies and jackets include Stussy, Corteiz, Moncler, and Arc'teryx-style outerwear. Bags and accessories round out hauls with crossbody, belt, and jewelry picks. Electronics and niche categories are indexed too when they appear in source sheets.",
  "Verified links protect you from broken or hijacked URLs — a common spreadsheet problem when rows get copied without checking. Every buy button on BoonBuy Finds is generated from the stored marketplace link, not an opaque redirect chain. Registering a free BoonBuy account also unlocks shipping coupons and order tracking when offers are available.",
  "Collections are curated shortcuts for sharing. Pages like Best Nike BoonBuy Finds, Best Jordan BoonBuy Finds, Best QC Approved Finds, and Trending This Week are designed for Telegram pins, TikTok bios, and haul posts. Each collection has its own intro, product grid, and internal links to related brands so search engines and humans can navigate deeper.",
  "If you are new to agent buying, start with our beginner guide — then browse Trending or Editor's Picks on the homepage. Experienced buyers can jump straight to brand hubs (Nike, Jordan, Moncler, Chrome Hearts, Stussy, Dior, Balenciaga, Louis Vuitton) or category pages for sneakers, hoodies, jackets, and bags. The goal is simple: less time hunting spreadsheets, more time picking finds you will actually ship.",
] as const;

/**
 * Full SEO explanatory content restored from pre-slim.
 * First paragraphs stay visible; longer guide remains in SSR <details>.
 */
export default function HomepageSeoContent() {
  const lead = PARAGRAPHS.slice(0, 4);
  const rest = PARAGRAPHS.slice(4);

  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="rounded-2xl border border-border/80 bg-surface/20 p-5 sm:p-6">
          <h2 className="text-lg font-black sm:text-xl">What is BoonBuy Finds?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {HOMEPAGE_SEO_INDEX_BLURB}
          </p>
          <ul className="mt-3 grid gap-1.5 text-sm text-muted sm:grid-cols-2">
            <li>Searchable BoonBuy product pages with filters</li>
            <li>QC photo references when available</li>
            <li>Spreadsheet alternative with shareable URLs</li>
            <li>Coupon hub and Telegram updates</li>
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SEO_HUB_FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-accent/40 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-surface/25 p-5 sm:p-6">
          <h2 className="text-lg font-black sm:text-xl">
            The Largest BoonBuy Finds Database
          </h2>
          <div className="mt-4 space-y-4">
            {lead.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-sm leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <details className="group mt-4 border-t border-border pt-4">
            <summary className="cursor-pointer list-none text-sm font-bold text-accent [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Read the full guide</span>
              <span className="hidden group-open:inline">Hide extra detail</span>
            </summary>
            <div className="mt-4 space-y-4">
              {rest.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-sm leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </details>

          <div className="mt-5 flex flex-wrap gap-2 pt-2">
            <Link
              href="/boonbuy"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
            >
              What is BoonBuy?
            </Link>
            <Link
              href="/boonbuy-coupons"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
            >
              Coupons
            </Link>
            <Link
              href="/boonbuy-spreadsheet"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
            >
              Spreadsheet
            </Link>
            <Link
              href="/boonbuy-qc"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
            >
              QC
            </Link>
            <Link
              href="/best-boonbuy-finds"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
            >
              Best finds
            </Link>
            <Link
              href="/guides"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
            >
              Guides
            </Link>
            <Link
              href="/boonbuy-telegram"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
            >
              Telegram
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
