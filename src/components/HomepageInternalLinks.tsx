import Link from "next/link";

const SECTIONS = [
  {
    title: "Start here",
    links: [
      { href: "/boonbuy", label: "BoonBuy" },
      { href: "/boonbuy-coupons", label: "Coupons" },
      { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
      { href: "/trending", label: "Trending" },
      { href: "/latest-finds", label: "Latest" },
      { href: "/brands", label: "Brands" },
      { href: "/categories", label: "Categories" },
      { href: "/best-boonbuy-finds", label: "Best finds" },
      { href: "/finds", label: "Browse finds" },
    ],
  },
  {
    title: "Top collections",
    links: [
      { href: "/collections/best-nike-finds", label: "Best Nike finds" },
      { href: "/collections/best-moncler-finds", label: "Best Moncler finds" },
      { href: "/collections/best-sneakers", label: "Sneaker finds" },
      { href: "/collections/best-hoodies", label: "Best hoodies" },
      { href: "/collections/best-qc-approved-finds", label: "QC approved" },
      { href: "/collections/best-under-50", label: "Under $50" },
    ],
  },
  {
    title: "BoonBuy resources",
    links: [
      { href: "/boonbuy-qc", label: "BoonBuy QC" },
      { href: "/boonbuy-shipping", label: "Shipping" },
      { href: "/boonbuy-questions", label: "Questions" },
      { href: "/boonbuy-review", label: "Review" },
      { href: "/what-is-boonbuy-finds", label: "What is BoonBuy Finds?" },
      { href: "/boonbuy-telegram", label: "Telegram" },
      { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
    ],
  },
] as const;

/**
 * Authority internal links — compact chips inside <details> so the page does
 * not look like an SEO sitemap, while all <a href> remain in SSR HTML.
 */
export default function HomepageInternalLinks() {
  return (
    <section className="px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <details className="group rounded-2xl border border-border/80 bg-surface/20 p-4 sm:p-5">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-base font-black sm:text-lg">Explore more</h2>
            <p className="mt-1 text-sm text-muted">
              Collections, finds hubs, brands, guides, and BoonBuy resources.
            </p>
            <span className="mt-2 inline-block text-sm font-bold text-accent group-open:hidden">
              Show links
            </span>
          </summary>

          <div className="mt-4 grid gap-5 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  {section.title}
                </h3>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {section.links.map((link) => (
                    <li key={`${section.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="inline-flex rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-foreground/85 hover:border-accent/40 hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
