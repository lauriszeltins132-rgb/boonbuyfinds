import Link from "next/link";

const SECTIONS = [
  {
    title: "Top collections",
    links: [
      { href: "/collections/best-nike-finds", label: "Best Nike finds" },
      { href: "/collections/best-jordan-finds", label: "Best Jordan finds" },
      { href: "/sneaker-finds", label: "Sneaker finds" },
      { href: "/collections/best-qc-approved-finds", label: "QC approved" },
      { href: "/collections/trending-this-week", label: "Trending this week" },
      { href: "/collections/best-under-50", label: "Under $50" },
    ],
  },
  {
    title: "Finds hubs",
    links: [
      { href: "/finds", label: "Browse finds" },
      { href: "/latest-finds", label: "Latest finds" },
      { href: "/sneaker-finds", label: "Sneaker finds" },
      { href: "/clothing-finds", label: "Clothing finds" },
      { href: "/streetwear-finds", label: "Streetwear finds" },
      { href: "/hoodie-finds", label: "Hoodie finds" },
      { href: "/jacket-finds", label: "Jacket finds" },
      { href: "/bag-finds", label: "Bag finds" },
      { href: "/rep-finds", label: "Rep finds" },
      { href: "/best-rep-finds", label: "Best rep finds" },
    ],
  },
  {
    title: "Popular brands",
    links: [
      { href: "/brands/nike", label: "Nike" },
      { href: "/brands/jordan", label: "Jordan" },
      { href: "/brands/moncler", label: "Moncler" },
      { href: "/brands/stussy", label: "Stussy" },
      { href: "/brands/chrome-hearts", label: "Chrome Hearts" },
      { href: "/brands/louis-vuitton", label: "Louis Vuitton" },
    ],
  },
  {
    title: "BoonBuy SEO hub",
    links: [
      { href: "/boonbuy", label: "What is BoonBuy?" },
      { href: "/boonbuy-questions", label: "BoonBuy questions" },
      { href: "/boonbuy-review", label: "BoonBuy review" },
      { href: "/what-is-boonbuy-finds", label: "What is BoonBuy Finds?" },
      { href: "/finds", label: "Browse finds" },
      { href: "/boonbuy-finds", label: "BoonBuy Finds" },
      { href: "/boonbuy-coupons", label: "BoonBuy Coupons" },
      { href: "/boonbuy-deals", label: "BoonBuy Deals" },
      { href: "/boonbuy-spreadsheet", label: "BoonBuy Spreadsheet" },
      { href: "/boonbuy-qc", label: "BoonBuy QC" },
      { href: "/best-boonbuy-finds", label: "Best BoonBuy finds" },
      { href: "/boonbuy-discord", label: "BoonBuy Discord" },
      { href: "/boonbuy-telegram", label: "BoonBuy Telegram" },
      { href: "/ai", label: "BoonBuy AI" },
    ],
  },
  {
    title: "Guides & fresh finds",
    links: [
      { href: "/guides", label: "All guides" },
      { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
      { href: "/guides/how-to-check-qc-photos", label: "QC photos guide" },
      { href: "/latest-finds", label: "Latest finds" },
      { href: "/trending", label: "Trending" },
      { href: "/boonbuy-warehouse", label: "Warehouse" },
      { href: "/boonbuy-shipping", label: "Shipping" },
      { href: "/categories", label: "Categories" },
    ],
  },
] as const;

export default function HomepageInternalLinks() {
  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-border/80 bg-surface/20 p-5 sm:p-6">
        <h2 className="text-lg font-black sm:text-xl">Explore the catalog</h2>
        <p className="mt-1 text-sm text-muted">
          Jump to finds hubs, brands, categories, and guides — the same authority path as a full discovery platform.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-foreground/85 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
