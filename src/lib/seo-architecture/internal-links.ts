import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

type HubBlock = {
  title: string;
  links: { href: string; label: string }[];
};

const CORE_HUB: HubBlock[] = [
  {
    title: "Home & catalog",
    links: [
      { href: "/", label: "Homepage" },
      { href: "/boonbuy", label: "What is BoonBuy?" },
      { href: "/finds", label: "Browse finds" },
      { href: "/boonbuy-finds", label: "BoonBuy finds" },
      { href: "/ai", label: "BoonBuy AI" },
      { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
      { href: "/boonbuy-qc", label: "BoonBuy QC" },
      { href: "/best-boonbuy-finds", label: "Best BoonBuy finds" },
      { href: "/collections", label: "Collections" },
      { href: "/trending", label: "Trending finds" },
      { href: "/latest-finds", label: "Latest finds" },
      { href: "/rep-finds", label: "Rep finds" },
      { href: "/most-saved-finds", label: "Most saved" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/boonbuy-telegram", label: "BoonBuy Telegram" },
      { href: "/boonbuy-discord", label: "BoonBuy Discord" },
      { href: "/telegram", label: "Telegram hub" },
    ],
  },
  {
    title: "Coupons & shipping",
    links: [
      { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
      { href: "/boonbuy-deals", label: "BoonBuy deals" },
      { href: "/boonbuy-shipping-coupon", label: "Shipping coupon" },
      { href: "/boonbuy-referral-code", label: "Referral code" },
      { href: "/boonbuy-shipping", label: "BoonBuy shipping" },
    ],
  },
  {
    title: "Guides & reviews",
    links: [
      { href: "/guides", label: "All guides" },
      { href: "/boonbuy", label: "BoonBuy hub" },
      { href: "/boonbuyfinds", label: "Boonbuyfinds" },
      { href: "/latest-finds", label: "Latest finds" },
      { href: "/sneaker-finds", label: "Sneaker finds" },
      { href: "/boonbuy-questions", label: "BoonBuy questions" },
      { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
      { href: "/boonbuy-warehouse", label: "Warehouse guide" },
      { href: "/boonbuy-returns", label: "Returns guide" },
      { href: "/boonbuy-payment", label: "Payment guide" },
      { href: "/best-shopping-agent", label: "Best shopping agent" },
      { href: "/about", label: "About" },
      { href: "/editorial-policy", label: "Editorial policy" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const COMPARISON_HUB: HubBlock = {
  title: "Agent comparisons",
  links: [
    { href: "/boonbuy-vs-litbuy", label: "BoonBuy vs LitBuy" },
    { href: "/litbuy-finds", label: "LitBuy finds" },
    { href: "/litbuy-spreadsheet", label: "LitBuy spreadsheet" },
    { href: "/boonbuy-vs-kakobuy", label: "BoonBuy vs Kakobuy" },
    { href: "/boonbuy-vs-mulebuy", label: "BoonBuy vs MuleBuy" },
    { href: "/boonbuy-vs-cnfans", label: "BoonBuy vs CNFans" },
    { href: "/boonbuy-vs-oopbuy", label: "BoonBuy vs OopBuy" },
    { href: "/boonbuy-vs-allchinabuy", label: "BoonBuy vs AllChinaBuy" },
    { href: "/boonbuy-vs-hoobuy", label: "BoonBuy vs Hoobuy" },
  ],
};

const SPREADSHEET_HUB: HubBlock = {
  title: "Spreadsheet hubs",
  links: [
    { href: "/spreadsheet", label: "Spreadsheet hub" },
    { href: "/best-spreadsheet", label: "Best spreadsheet" },
    { href: "/china-spreadsheet", label: "China spreadsheet" },
    { href: "/designer-spreadsheet", label: "Designer spreadsheet" },
    { href: "/shoe-spreadsheet", label: "Shoe spreadsheet" },
    { href: "/best-boonbuy-spreadsheet", label: "Best BoonBuy spreadsheet" },
  ],
};

const CATEGORY_HUB: HubBlock = {
  title: "Category picks",
  links: [
    { href: "/best-shoes", label: "Best shoes" },
    { href: "/best-sneakers", label: "Best sneakers" },
    { href: "/best-hoodies", label: "Best hoodies" },
    { href: "/best-jackets", label: "Best jackets" },
    { href: "/best-jerseys", label: "Best jerseys" },
    { href: "/best-boonbuy-tech", label: "Best tech" },
    { href: "/best-watches", label: "Best watches" },
    { href: "/best-accessories", label: "Best accessories" },
    { href: "/best-budget-finds", label: "Best budget finds" },
    { href: "/trending-finds", label: "Trending finds" },
  ],
};

export function getSeoArchitectureInternalLinks(page: SeoArchitecturePage): HubBlock[] {
  const hubs = [...CORE_HUB];

  if (page.category === "comparison") {
    hubs.push(COMPARISON_HUB);
  } else if (page.category === "spreadsheet") {
    hubs.push(SPREADSHEET_HUB);
  } else if (page.category === "category") {
    hubs.push(CATEGORY_HUB);
  } else if (page.category === "guide") {
    hubs.push({
      title: "Buying guides",
      links: [
        { href: "/how-to-buy-from-taobao", label: "Buy from Taobao" },
        { href: "/how-to-buy-from-weidian", label: "Buy from Weidian" },
        { href: "/how-shipping-works", label: "How shipping works" },
        { href: "/boonbuy-warehouse", label: "Warehouse" },
        { href: "/boonbuy-returns", label: "Returns" },
        { href: "/boonbuy-payment", label: "Payment" },
        { href: "/how-to-find-best-reps", label: "Find best reps" },
        { href: "/boonbuy-qc", label: "QC guide" },
      ],
    });
    hubs.push(CATEGORY_HUB);
  } else if (page.category === "review") {
    hubs.push({
      title: "Agent reviews",
      links: [
        { href: "/best-shopping-agent", label: "Best shopping agent" },
        { href: "/best-chinese-shopping-agent", label: "Best Chinese agent" },
        { href: "/best-agent-for-reps", label: "Best agent for reps" },
        { href: "/best-agent-for-taobao", label: "Best agent for Taobao" },
      ],
    });
  } else {
    hubs.push(COMPARISON_HUB, SPREADSHEET_HUB);
  }

  return hubs;
}
