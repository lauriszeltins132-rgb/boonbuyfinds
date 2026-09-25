import { SOCIAL_LINKS, TELEGRAM_CHANNEL_NAME } from "./constants";
import { SITE_ALT_URL, SITE_URL } from "./site";

/** Entity names for schema — keep website identity tight; misspellings stay secondary. */
export const SITE_ALTERNATE_NAMES = [
  "BoonBuyFinds",
  "boonbuyfinds.net",
  "boonbuyfinds",
  "boonbuy finds",
] as const;

export const SITE_ENTITY_DESCRIPTION =
  "BoonBuy Finds (boonbuyfinds.net) is the searchable catalog for BoonBuy product finds, QC photo references, spreadsheet-style listings, coupons, and verified BoonBuy checkout links.";


export const HERO_ENTITY_LINE =
  "Verified listings from Weidian and Taobao — searchable like a BoonBuy spreadsheet catalog, with QC finds updated regularly.";

/** One muted homepage line — natural phrasing for common misspellings, not a keyword list. */
export const HOMEPAGE_AKA_LINE = `Also known as ${TELEGRAM_CHANNEL_NAME} on Telegram and often searched as boonbuyfinds or boonbuy spreadsheet.`;

export const HOMEPAGE_ENTITY_FAQS = [
  {
    question: "What is BoonBuy Finds?",
    answer: `${SITE_ENTITY_DESCRIPTION} It turns spreadsheet-style catalogs into searchable pages with QC references, filters, and verified agent buy links.`,
  },
  {
    question: "What is the difference between BoonBuy Finds and a spreadsheet?",
    answer:
      "A raw BoonBuy spreadsheet is a long list of links and photos that is hard to search on mobile. BoonBuy Finds organizes the same type of products into brand pages, category filters, QC badges, and shareable collection links — so you can find Nike, Moncler, or sneaker picks in seconds instead of scrolling hundreds of rows.",
  },
  {
    question: "Is BoonBuy safe to use?",
    answer:
      "BoonBuy is a widely used shopping agent for Weidian and Taobao orders. BoonBuy Finds only links to marketplace listings through verified agent URLs — we do not sell products directly. Always review QC photos, compare batches, and use common sense before shipping a haul.",
  },
  {
    question: "How do I order from BoonBuy?",
    answer:
      "Create a free BoonBuy account, open a product from BoonBuy Finds, and add it to your cart through the agent link. Pay for the item, wait for warehouse QC photos, approve or exchange if needed, then combine items into a shipment. Our beginner guide walks through each step.",
  },
  {
    question: "Are QC photos real?",
    answer:
      "QC (quality control) photos are taken in the agent warehouse after your item arrives — not marketing renders from the seller. When a find on BoonBuy Finds includes a QC reference, it usually means other buyers have documented that listing. Your own QC set will still be taken when your order lands.",
  },
  {
    question: "Does BoonBuy ship worldwide?",
    answer:
      "Yes. BoonBuy and the other supported agents ship to most countries via lines like EMS, DHL, and economy options. Shipping cost depends on weight, dimensions, and your destination — use rehearsal packing when available to avoid surprises.",
  },
  {
    question: "Is BoonBuy Finds only for BoonBuy?",
    answer:
      "Yes. BoonBuy Finds is a BoonBuy-only catalog — every buy button opens a verified BoonBuy product link with QC workflow support and shipping coupons.",
  },
  {
    question: "How often are new finds added?",
    answer:
      "The catalog syncs regularly with new spreadsheet finds, QC links, and price updates. Fresh drops appear in Latest Finds and Trending sections on the homepage — check back often or join Telegram for alerts.",
  },
  {
    question: "What are the best BoonBuy finds right now?",
    answer:
      "Trending Today and Editor's Picks on the homepage highlight what buyers are clicking now. For brand-specific hauls, open collections like Best Nike Finds, Best Jordan Finds, or Best QC Approved Finds — each page is updated as the catalog syncs.",
  },
  {
    question: "Where do I find BoonBuy Telegram, coupons, and spreadsheet pages?",
    answer:
      "Use the homepage CTAs or these hub pages: /boonbuy-telegram, /boonbuy-coupons, /boonbuy-shipping-coupon, and /boonbuy-spreadsheet. Claim the current shipping discount when available, then shop verified finds.",
  },
] as const;

export function getOrganizationSameAsLinks(): string[] {
  return [
    SITE_URL,
    SITE_ALT_URL,
    SOCIAL_LINKS.telegram,
    SOCIAL_LINKS.telegram,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.tiktok,
  ];
}

export function getOrganizationKnowsAbout(): string[] {
  return [
    "BoonBuy",
    "BoonBuy Finds",
    "boonbuyfinds",
    "BoonBuy product discovery",
    "BoonBuy spreadsheet",
    "BoonBuy QC",
    "BoonBuy coupons",
    "shopping agents",
    "QC photos",
    "Weidian finds",
    "Taobao finds",
    "sneaker finds",
    "fashion finds",
    "verified BoonBuy shopping links",
    TELEGRAM_CHANNEL_NAME,
  ];
}
