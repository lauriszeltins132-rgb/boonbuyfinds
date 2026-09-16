import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaScript from "@/components/SchemaScript";
import {
  BOONBUY_COUPON_URL,
  BOONBUY_OFFER_DESCRIPTION,
  BOONBUY_OFFER_HEADLINE,
  BOONBUY_SHIPPING_COUPON_CTA,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  BOONBUY_SIGNUP_URL,
} from "@/lib/constants";
import { formatDatasetAge, getDatasetSyncedIso } from "@/lib/catalog-meta";
import {
  buildAgentCouponWebPageSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { CONTENT_REVIEW_NOTE } from "@/lib/trust";

const PATH = "/boonbuy-deals";

const FAQS = [
  {
    question: "What deals are available through BoonBuyFinds?",
    answer: `Current offers available through BoonBuyFinds include new-user shipping coupons — up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when your BoonBuy account is eligible. Confirm terms on BoonBuy at signup and before paying freight.`,
  },
  {
    question: "Is this an official BoonBuy store?",
    answer:
      "No. BoonBuy Finds is an independent discovery catalog that partners with BoonBuy for verified invite links and product discovery. Checkout happens on BoonBuy.",
  },
  {
    question: "How do I claim a BoonBuy offer?",
    answer:
      "Use the claim button on this page or the coupons hub to open the verified registration path. After your account is eligible, browse finds, open a BoonBuy product link, and apply available shipping benefits when you pay freight.",
  },
  {
    question: "Do deals change?",
    answer:
      "Yes. Shipping promotions and eligibility can change on BoonBuy. This page reflects the current offers we promote through BoonBuyFinds — always verify inside your BoonBuy account.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: `BoonBuy Deals | Coupons & Offers via BoonBuyFinds`,
  description: `Current offers available through BoonBuyFinds — BoonBuy shipping coupons up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off, verified invite links, and how to claim before your haul.`,
  path: PATH,
});

export const revalidate = 3600;

export default function BoonBuyDealsPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "BoonBuy", href: "/boonbuy" },
    { label: "Deals" },
  ];
  const syncedIso = getDatasetSyncedIso();

  return (
    <>
      <SchemaScript
        data={[
          buildAgentCouponWebPageSchema({
            name: "BoonBuy Deals",
            description: `Current offers available through BoonBuyFinds, including shipping coupons up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off when eligible.`,
            path: PATH,
            couponUrl: BOONBUY_COUPON_URL,
            offerHeadline: BOONBUY_OFFER_HEADLINE,
            offerDescription: BOONBUY_OFFER_DESCRIPTION,
          }),
          buildBreadcrumbSchema(breadcrumbs, PATH),
          buildFaqSchema([...FAQS]),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} currentPath={PATH} />

      <article className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Partner offers
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            BoonBuy Deals
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Current offers available through BoonBuyFinds help new and returning
            shoppers unlock shipping discounts, then browse verified finds, QC
            context, and guides before checkout on BoonBuy.
          </p>

          <aside className="mt-6 rounded-2xl border border-accent/25 bg-accent/5 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Current offer
            </h2>
            <p className="mt-2 text-lg font-black text-foreground">
              {BOONBUY_OFFER_HEADLINE}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {BOONBUY_OFFER_DESCRIPTION}
            </p>
            <p className="mt-3 text-xs text-muted">
              Last checked with catalog sync {formatDatasetAge()} (
              <time dateTime={syncedIso}>{syncedIso.slice(0, 10)}</time>). Terms
              and eligibility are set by BoonBuy.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={BOONBUY_COUPON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90"
              >
                {BOONBUY_SHIPPING_COUPON_CTA}
              </a>
              <Link
                href="/boonbuy-coupons"
                className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-bold hover:border-accent/40 hover:text-accent"
              >
                Coupon hub
              </Link>
            </div>
          </aside>

          <section className="mt-10">
            <h2 className="text-xl font-black">Partner introduction</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              BoonBuy Finds is a dedicated BoonBuy discovery platform. We help
              shoppers find products, QC references, spreadsheet-style catalogs,
              and current offers available through BoonBuyFinds — then continue
              to BoonBuy for payment, warehouse QC, and shipping.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We do not invent discounts. If an offer is shown here, it is one we
              currently promote via our verified invite path. Always confirm the
              live terms inside BoonBuy.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black">How to claim offers</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>Open the claim button to register or sign in on BoonBuy.</li>
              <li>Confirm any shipping coupon appears in your BoonBuy account.</li>
              <li>
                Browse finds on BoonBuy Finds, then open a verified BoonBuy product
                link.
              </li>
              <li>
                Review warehouse QC before shipping, and apply eligible shipping
                benefits when you pay freight.
              </li>
            </ol>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={BOONBUY_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
              >
                Register on BoonBuy
              </a>
              <Link
                href="/how-to-buy"
                className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
              >
                How to buy
              </Link>
              <Link
                href="/boonbuy"
                className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
              >
                What is BoonBuy?
              </Link>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black">Shop with BoonBuy Finds tools</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                { href: "/finds", label: "Browse finds" },
                { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
                { href: "/boonbuy-qc", label: "QC photos" },
                { href: "/ai", label: "BoonBuy AI" },
                { href: "/best-boonbuy-finds", label: "Best finds" },
                { href: "/latest-finds", label: "Latest finds" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="text-xl font-black">Frequently asked questions</h2>
            <dl className="mt-5 space-y-5">
              {FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-bold text-foreground">{faq.question}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="mt-8 text-sm text-muted">{CONTENT_REVIEW_NOTE}</p>
        </div>
      </article>
    </>
  );
}
