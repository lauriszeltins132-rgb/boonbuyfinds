import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuidesHubGrid from "@/components/guides/GuidesHubGrid";
import SchemaScript from "@/components/SchemaScript";
import { GUIDES_HUB, getAllGuides } from "@/lib/guides";
import { buildCollectionPageSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: GUIDES_HUB.title,
  description: GUIDES_HUB.metaDescription,
  path: GUIDES_HUB.path,
});

const GUIDE_CLUSTERS = [
  {
    title: "Beginner",
    links: [
      { href: "/boonbuy-questions", label: "BoonBuy questions hub" },
      { href: "/boonbuy", label: "What is BoonBuy?" },
      { href: "/what-is-boonbuy-finds", label: "What is BoonBuy Finds?" },
      { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
      { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
      { href: "/guides/how-to-check-qc-photos", label: "How QC photos work" },
      { href: "/boonbuy-shipping", label: "Shipping guide" },
    ],
  },
  {
    title: "Money saving",
    links: [
      { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
      { href: "/boonbuy-deals", label: "Latest BoonBuy deals" },
      { href: "/boonbuy-shipping-coupon", label: "Shipping coupon" },
      { href: "/guides/how-shipping-works-with-agents", label: "Shipping tips" },
      { href: "/boonbuy-referral-code", label: "Referral code" },
      { href: "/boonbuy-discount-code", label: "Discount code guide" },
    ],
  },
  {
    title: "Find guides",
    links: [
      { href: "/sneaker-finds", label: "Sneaker finds" },
      { href: "/clothing-finds", label: "Clothing finds" },
      { href: "/best-rep-finds", label: "Best rep finds" },
      { href: "/latest-finds", label: "Latest finds" },
      { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
    ],
  },
  {
    title: "Agent guides",
    links: [
      { href: "/boonbuy-warehouse", label: "Warehouse" },
      { href: "/boonbuy-payment", label: "Payment" },
      { href: "/boonbuy-returns", label: "Returns" },
      { href: "/is-boonbuy-legit", label: "Is BoonBuy legit?" },
      { href: "/boonbuy-review", label: "BoonBuy review" },
      { href: "/boonbuy-telegram", label: "Telegram" },
    ],
  },
] as const;

export default function GuidesHubPage() {
  const guides = getAllGuides();

  return (
    <>
      <SchemaScript
        data={buildCollectionPageSchema({
          name: GUIDES_HUB.h1,
          description: GUIDES_HUB.metaDescription,
          path: GUIDES_HUB.path,
          numberOfItems: guides.length,
        })}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides" },
        ]}
        currentPath={GUIDES_HUB.path}
      />

      <section className="px-4 pb-6 pt-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Learn
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{GUIDES_HUB.h1}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            {GUIDES_HUB.intro}
          </p>
          <p className="mt-3 text-sm text-muted">
            Written by the BoonBuy Finds Team ·{" "}
            <Link href="/about" className="font-bold text-accent hover:underline">
              Our mission
            </Link>
            {" · "}
            <Link
              href="/editorial-policy"
              className="font-bold text-accent hover:underline"
            >
              Editorial policy
            </Link>
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDE_CLUSTERS.map((cluster) => (
              <div
                key={cluster.title}
                className="rounded-2xl border border-border bg-surface/30 p-4"
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  {cluster.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {cluster.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm font-semibold text-foreground hover:text-accent"
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

      <GuidesHubGrid guides={guides} />
    </>
  );
}
