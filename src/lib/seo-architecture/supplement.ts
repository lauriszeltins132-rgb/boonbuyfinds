import type { StaticPageSection } from "@/lib/static-pages";
import type { SeoArchitectureCategory } from "@/lib/seo-architecture/types";
import { countArticleWords } from "@/lib/seo-architecture/utils";

const SUPPLEMENT_BLOCKS: Record<
  SeoArchitectureCategory,
  (slug: string, h1: string) => StaticPageSection[]
> = {
  brand: (slug, h1) => [
    {
      heading: "Who this page is for",
      paragraphs: [
        `${h1} is written for international buyers who already know they want BoonBuy-oriented discovery — not for debating whether Chinese marketplaces exist. If you are comparing agents, read our comparison hub after this page.`,
        `Return here when you need a stable URL to share in Discord or Telegram instead of a screenshot of a spreadsheet row. Stable links help your friends land on the same listing you researched.`,
        `Bookmark the spreadsheet hub and coupon pages alongside this article so your next haul starts from one tab group, not twelve forgotten Chrome windows.`,
      ],
      links: [
        { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
        { href: "/boonbuy-coupons", label: "Coupons" },
      ],
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: [
        `Skipping warehouse QC because a ${slug.replace(/-/g, " ")} thread looked clean last month. Batches change; your item is unique.`,
        `Shipping single-item parcels because you were impatient. Freight dominates small haul economics — wait for a full box when you can.`,
        `Trusting a row price without opening BoonBuy checkout. Sellers update Taobao and Weidian listings without telling spreadsheet curators.`,
      ],
      links: [{ href: "/how-to-use-boonbuy", label: "How to use BoonBuy" }],
    },
    {
      heading: "2026 checklist",
      paragraphs: [
        `Verify invite and shipping promos on our coupon hub before you register or pay freight. Promotions rotate; screenshots expire.`,
        `Cross-check size charts in centimeters. Chinese apparel sizing is inconsistent across factories even within the same brand-inspired batch.`,
        `Save QC references from the product page and compare them to your warehouse photos before approving international shipping.`,
      ],
    },
    {
      heading: "What to do next",
      paragraphs: [
        `Browse trending finds if you want community-weighted heat, or filter by category if you already know the lane — shoes, hoodies, designer bags.`,
        `Join Telegram for speed and Discord for threaded QC debate. Both channels link back to catalog pages when a row is indexed.`,
        `When you are ready to buy, open the agent link from the listing you researched — not a generic marketplace search.`,
      ],
      links: [
        { href: "/trending-finds", label: "Trending" },
        { href: "/boonbuy-telegram", label: "Telegram" },
      ],
    },
  ],
  comparison: (slug, h1) => [
    {
      heading: "How we compare agents",
      paragraphs: [
        `${h1} rankings are not pay-to-win. We evaluate shipping quotes, QC workflow, discovery tools, and community fit — then tell you to pull live quotes anyway.`,
        `Agent promos change monthly. A comparison article is a map, not a contract. Re-run parcel quotes before every international shipment.`,
        `BoonBuy Finds is independent. We benefit when you discover listings here; we do not control BoonBuy fee tables or warehouse policies.`,
      ],
    },
    {
      heading: "Test haul strategy",
      paragraphs: [
        `Fund a small cart on each agent you are considering — one tee, one accessory, or one budget sneaker. Learn QC UI and support response before grail money moves.`,
        `Ship test parcels on the lines you plan to use long term. A cheap registration promo does not matter if your preferred line is suspended to your country.`,
      ],
      links: [{ href: "/how-to-use-agents", label: "How to use agents" }],
    },
    {
      heading: "When to switch agents",
      paragraphs: [
        `Switch when shipping quotes diverge by double-digit percentages on the same weight, or when support fails you on a dispute. Loyalty is optional; money is not.`,
        `Stay when discovery, QC habits, and wallet balance already match your haul rhythm. Migration friction is real — only move for concrete savings or service gains.`,
      ],
    },
  ],
  spreadsheet: (slug, h1) => [
    {
      heading: "Spreadsheet hygiene",
      paragraphs: [
        `Treat ${h1} rows like inventory, not gospel. Dead links, wrong batches, and price drift happen on every sheet — including indexed catalogs.`,
        `Label your personal notes: batch name, size chosen, QC thread URL. Future you will forget why a row looked good at 2 a.m.`,
      ],
    },
    {
      heading: "Sharing finds responsibly",
      paragraphs: [
        `Prefer boonbuyfinds.net product URLs when sharing publicly — friends get photos and context, not mystery Weidian short links.`,
        `Credit curators when you repost rows. Community sheets survive because maintainers fix links daily.`,
      ],
      links: [{ href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" }],
    },
    {
      heading: "From row to parcel",
      paragraphs: [
        `Research rows in bulk; purchase in focused sessions. Wallet top-ups plus cart management are easier when you batch decisions.`,
        `Plan international shipping before you buy the last item in a haul — dimensional weight surprises kill budget spreadsheets.`,
      ],
      links: [{ href: "/how-shipping-works", label: "Shipping guide" }],
    },
  ],
  category: (slug, h1) => [
    {
      heading: "How to use this category page",
      paragraphs: [
        `${h1} is a filtered slice of the full catalog — not every row in the database. Use brand pages and search when you need depth beyond this grid.`,
        `Open listings in new tabs, compare QC references, then buy one item at a time. Parallel carts across dozens of tabs create expensive mistakes.`,
      ],
      links: [{ href: "/categories", label: "All categories" }],
    },
    {
      heading: "Sizing and returns mindset",
      paragraphs: [
        `Apparel and footwear categories fail on sizing more than on factory flaws. Measure before you order; dispute at warehouse QC, not after international shipping.`,
      ],
      links: [{ href: "/guides/how-to-check-qc-photos", label: "QC guide" }],
    },
  ],
  guide: (slug, h1) => [
    {
      heading: "Prerequisites",
      paragraphs: [
        `Before ${h1.toLowerCase()}, skim what-is-boonbuy and how-to-use-boonbuy if you are new. Agents add steps on top of normal online shopping — wallets, QC, parcels.`,
      ],
      links: [
        { href: "/what-is-boonbuy", label: "What is BoonBuy" },
        { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
      ],
    },
    {
      heading: "Tools you will use",
      paragraphs: [
        `BoonBuy Finds for discovery, BoonBuy for checkout, Telegram for alerts, and this guide hub for reference when something confusing happens at customs or warehouse QC.`,
      ],
    },
    {
      heading: "When things go wrong",
      paragraphs: [
        `Screenshot statuses, photo timestamps, and support ticket IDs. Calm, factual tickets resolve faster than rage paragraphs.`,
        `International shipping turns small QC issues into expensive lessons — slow down at the warehouse step.`,
      ],
      links: [{ href: "/contact", label: "Contact us" }],
    },
  ],
  review: (slug, h1) => [
    {
      heading: "How we rank agents",
      paragraphs: [
        `${h1} reflects overseas buyer priorities in 2026: shipping value, QC clarity, paste-link accuracy, and discovery ecosystem — not brand marketing slides.`,
      ],
    },
    {
      heading: "Disclosure",
      paragraphs: [
        `BoonBuy Finds links to BoonBuy agent URLs. We are not owned by BoonBuy. Compare agents honestly; fund the wallet that quotes best for your next parcel.`,
      ],
      links: [{ href: "/about", label: "About" }],
    },
  ],
};

export function withMinimumWordCount<
  T extends {
    slug: string;
    h1: string;
    category: SeoArchitectureCategory;
    intro: string;
    sections: StaticPageSection[];
    faqs: { question: string; answer: string }[];
  }
>(page: T, minimum = 1500): T {
  const supplemental = SUPPLEMENT_BLOCKS[page.category](page.slug, page.h1);
  let sections = [...page.sections];
  let words = countArticleWords(page.intro, sections, page.faqs);

  for (const block of supplemental) {
    if (words >= minimum) break;
    sections = [...sections, block];
    words = countArticleWords(page.intro, sections, page.faqs);
  }

  return { ...page, sections };
}
