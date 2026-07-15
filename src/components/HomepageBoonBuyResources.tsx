import Link from "next/link";

const RESOURCES = [
  {
    href: "/brands",
    label: "Browse All Brands",
    description: "Nike, Moncler, Chrome Hearts, Stussy and more",
  },
  {
    href: "/boonbuy-spreadsheet",
    label: "BoonBuy Spreadsheet Guide",
    description: "Searchable catalog vs raw spreadsheet rows",
  },
  {
    href: "/boonbuy-qc",
    label: "BoonBuy QC Guide",
    description: "Reference QC and warehouse photo checks",
  },
  {
    href: "/boonbuy-sneakers",
    label: "Best BoonBuy Sneakers",
    description: "Nike, Jordan, Adidas and New Balance picks",
  },
  {
    href: "/boonbuy-jackets",
    label: "Best BoonBuy Jackets",
    description: "Puffers, shells and streetwear outerwear",
  },
  {
    href: "/best-boonbuy-finds",
    label: "Best BoonBuy Finds",
    description: "Editor picks updated daily",
  },
  {
    href: "/boonbuy-weidian",
    label: "BoonBuy Weidian Guide",
    description: "How to buy Weidian through BoonBuy",
  },
] as const;

export default function HomepageBoonBuyResources() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-black">Popular BoonBuy Resources</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Guides for BoonBuy spreadsheets, QC photos, sneakers, jackets, and marketplace
          buying — built for search and sharing.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface/30 p-4 transition hover:border-accent/40 hover:bg-surface/50"
              >
                <span className="font-bold text-foreground group-hover:text-accent">
                  {item.label}
                </span>
                <span className="mt-1 text-sm text-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
