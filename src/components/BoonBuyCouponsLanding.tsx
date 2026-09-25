import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RegisterLink from "@/components/RegisterLink";
import SchemaScript from "@/components/SchemaScript";
import GuestVsMemberTable from "@/components/conversion/GuestVsMemberTable";
import {
  BOONBUY_COUPON_BENEFITS,
  BOONBUY_COUPON_CLAIM_STEPS,
  BOONBUY_COUPONS_FAQS,
  BOONBUY_COUPONS_META,
  BOONBUY_COUPONS_OFFER,
  BOONBUY_COUPONS_PATH,
  BOONBUY_COUPONS_RELATED_RESOURCES,
  getBoonBuyCouponOfferRows,
  getBoonBuyCouponsLastVerifiedLabel,
} from "@/lib/boonbuy-coupons-hub";
import { SOCIAL_LINKS, TELEGRAM_CHANNEL_NAME } from "@/lib/constants";
import {
  buildAgentCouponWebPageSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
} from "@/lib/schema";

function ClaimButton({
  location,
  className,
  children,
}: {
  location: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <RegisterLink
      location={location}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-black text-white transition hover:scale-[1.02] hover:bg-accent-hover"
      }
    >
      {children ?? BOONBUY_COUPONS_OFFER.ctaLabel}
    </RegisterLink>
  );
}

function ProseSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-black tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export default function BoonBuyCouponsLanding() {
  const path = BOONBUY_COUPONS_PATH;
  const lastVerified = getBoonBuyCouponsLastVerifiedLabel();
  const offerRows = getBoonBuyCouponOfferRows();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "BoonBuy Coupons" },
  ];

  const howTo = buildHowToSchema({
    name: "How to claim the BoonBuy coupon",
    description: BOONBUY_COUPONS_META.description,
    path,
    steps: BOONBUY_COUPON_CLAIM_STEPS.map((step) => ({
      name: step.name,
      text: step.text,
    })),
  });

  return (
    <>
      <SchemaScript
        data={buildAgentCouponWebPageSchema({
          name: BOONBUY_COUPONS_META.h1,
          description: BOONBUY_COUPONS_META.description,
          path,
          couponUrl: BOONBUY_COUPONS_OFFER.couponUrl,
          offerHeadline: BOONBUY_COUPONS_OFFER.headline,
          offerDescription: BOONBUY_COUPONS_OFFER.description,
        })}
      />
      <SchemaScript data={buildBreadcrumbSchema(breadcrumbItems, path)} />
      <SchemaScript data={buildFaqSchema(BOONBUY_COUPONS_FAQS)} />
      {howTo ? <SchemaScript data={howTo} /> : null}

      <Breadcrumbs items={breadcrumbItems} currentPath={path} />

      <article className="px-4 pb-12 pt-4 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-2xl">
          {/* Hero */}
          <section className="overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-secondary-soft to-panel-hover p-6 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Verified BoonBuy offer
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {BOONBUY_COUPONS_META.h1}
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
              {BOONBUY_COUPONS_META.intro}
            </p>

            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-accent/25 bg-background/60 p-4 text-left backdrop-blur-sm">
              <p className="text-lg font-black text-accent">
                {BOONBUY_COUPONS_OFFER.headline}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {BOONBUY_COUPONS_OFFER.description}
              </p>
              <dl className="mt-4 grid gap-2 text-xs text-muted sm:text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold text-foreground/80">Type</dt>
                  <dd className="text-right">{BOONBUY_COUPONS_OFFER.typeLabel}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold text-foreground/80">Invite code</dt>
                  <dd className="font-mono text-right text-foreground">
                    {BOONBUY_COUPONS_OFFER.inviteCode}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold text-foreground/80">Eligibility</dt>
                  <dd className="text-right">New accounts via invite</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold text-foreground/80">Last verified</dt>
                  <dd className="text-right">{lastVerified}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <ClaimButton location="boonbuy_coupons_hero" />
            </div>
            <p className="mx-auto mt-3 max-w-md text-xs text-muted">
              Free to register · Confirm live terms on BoonBuy · No invented expiry dates
            </p>
          </section>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-center text-xs text-muted">
            <span className="rounded-full border border-border px-3 py-1.5">
              Source: BoonBuy Finds invite
            </span>
            <span className="rounded-full border border-border px-3 py-1.5">
              Up to {BOONBUY_COUPONS_OFFER.discountPercent}% shipping
            </span>
            <span className="rounded-full border border-border px-3 py-1.5">
              Updated {lastVerified}
            </span>
          </div>

          <ProseSection id="what-are-boonbuy-coupons" title="What are BoonBuy coupons?">
            <p>
              BoonBuy is a shopping agent for Weidian and Taobao orders. When people
              search for BoonBuy coupons, BoonBuy coupon codes, promo codes, or discount
              codes, they usually want a verified way to pay less on{" "}
              <strong className="font-semibold text-foreground">shipping</strong> — not a
              fake product markdown list.
            </p>
            <p>
              BoonBuy Finds (boonbuyfinds.net) is the catalog and guide layer: searchable
              finds, QC references, and verified BoonBuy checkout links. This page is the
              single canonical hub for the whole BoonBuy coupon search cluster in 2026 —
              including best coupons, coupon codes, promo codes, discount codes, invite
              codes, referral codes, and the current working shipping offer.
            </p>
          </ProseSection>

          <ProseSection
            id="best-boonbuy-coupons-2026"
            title="Best BoonBuy coupons 2026"
          >
            <p>
              The best BoonBuy coupon and best BoonBuy coupons searches for 2026 still
              resolve to one practical offer on BoonBuy Finds: the new-user shipping
              discount (up to {BOONBUY_COUPONS_OFFER.discountPercent}% off shipping) via
              invite code {BOONBUY_COUPONS_OFFER.inviteCode}.
            </p>
            <p>
              We do not publish thin “best coupon” doorways. If you landed here from best
              BoonBuy coupon, best BoonBuy coupons, BoonBuy coupons 2026, or best BoonBuy
              coupons 2026, this is the page that owns that intent.
            </p>
          </ProseSection>

          <ProseSection id="how-boonbuy-coupons-work" title="How BoonBuy coupon codes work">
            <p>
              Most “BoonBuy coupon” searches resolve to an{" "}
              <strong className="font-semibold text-foreground">invite / referral signup</strong>
              . You register through the verified link, the invite attaches to the new
              account, and shipping savings — when active — show up around freight checkout
              rather than as a product price slash on every listing.
            </p>
            <p>
              Before you pay, confirm the live quote inside BoonBuy. Parcel weight, volume,
              destination, and shipping line still drive the final freight total.
            </p>
          </ProseSection>

          <ProseSection
            id="promo-discount-codes"
            title="BoonBuy promo codes &amp; discount codes"
          >
            <p>
              BoonBuy promo code, promo codes, discount code, and discount codes usually
              mean the same thing as a BoonBuy coupon code: the verified registration path
              that can unlock shipping savings. There is no separate secret vault of product
              SKU codes on BoonBuy Finds.
            </p>
            <p>
              Use invite {BOONBUY_COUPONS_OFFER.inviteCode} with the claim button below.
              Prefer the full signup URL so the referral attaches correctly — typed codes
              from old screenshots often fail.
            </p>
          </ProseSection>

          <ProseSection id="boonbuy-shipping-discounts" title="BoonBuy shipping coupon &amp; shipping discount">
            <p>
              Shipping is often the largest cost after products. The current verified
              headline is up to {BOONBUY_COUPONS_OFFER.discountPercent}% off shipping for
              eligible new accounts via the BoonBuy Finds invite — that is the BoonBuy
              shipping coupon / shipping discount people search for.
            </p>
            <p>
              That discount is not a guarantee of {BOONBUY_COUPONS_OFFER.discountPercent}%
              off every box. Use this hub for registration offers across the coupon cluster,
              and the shipping-specific page when you are comparing freight in depth:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <Link href="/boonbuy-shipping-coupon" className="font-semibold text-accent hover:underline">
                  BoonBuy shipping coupon
                </Link>{" "}
                — shipping-focused claim guidance (kept separate on purpose)
              </li>
              <li>
                <Link href="/boonbuy-shipping" className="font-semibold text-accent hover:underline">
                  BoonBuy shipping
                </Link>{" "}
                — how lines, weight, and hauls work
              </li>
            </ul>
          </ProseSection>

          {/* Current / latest / working coupon */}
          <section id="current-working-coupon" className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Latest, current &amp; working BoonBuy coupon
            </h2>
            <div className="mt-5 rounded-2xl border border-border bg-surface/30 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                Status · Active when available
              </p>
              <p className="mt-2 text-lg font-black text-foreground">
                {BOONBUY_COUPONS_OFFER.headline}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>
                  <span className="font-semibold text-foreground">Offer: </span>
                  Up to {BOONBUY_COUPONS_OFFER.discountPercent}% off shipping
                </li>
                <li>
                  <span className="font-semibold text-foreground">Mechanism: </span>
                  Invite / referral registration ({BOONBUY_COUPONS_OFFER.inviteCode})
                </li>
                <li>
                  <span className="font-semibold text-foreground">Eligibility: </span>
                  {BOONBUY_COUPONS_OFFER.eligibility}
                </li>
                <li>
                  <span className="font-semibold text-foreground">Applies to: </span>
                  {BOONBUY_COUPONS_OFFER.appliesTo}
                </li>
                <li>
                  <span className="font-semibold text-foreground">Last checked: </span>
                  {lastVerified}
                </li>
              </ul>
              <div className="mt-6">
                <ClaimButton location="boonbuy_coupons_current_offer" />
              </div>
            </div>
          </section>

          {/* Comparison table */}
          <section id="coupon-comparison" className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              BoonBuy coupon comparison
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Only real offers from the BoonBuy Finds source of truth. Status reflects the
              verified invite promotion — always confirm live terms on BoonBuy.
            </p>
            <div className="mt-5 -mx-1 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface/40">
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Coupon / offer
                    </th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Benefit
                    </th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Status
                    </th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {offerRows.map((row) => (
                    <tr key={row.offer} className="border-b border-border/60">
                      <td className="px-3 py-3 font-semibold text-foreground">{row.offer}</td>
                      <td className="px-3 py-3 text-muted">{row.benefit}</td>
                      <td className="px-3 py-3">
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs text-muted">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How to claim */}
          <section id="how-to-claim" className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              How to claim the BoonBuy coupon
            </h2>
            <ol className="mt-5 space-y-4">
              {BOONBUY_COUPON_CLAIM_STEPS.map((step, index) => (
                <li key={step.name} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-bold text-foreground">{step.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <ClaimButton location="boonbuy_coupons_howto" />
            </div>
          </section>

          <section id="coupon-benefits" className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Coupon &amp; account benefits
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {BOONBUY_COUPON_BENEFITS.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-border bg-surface/20 p-4"
                >
                  <p className="font-bold text-foreground">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <ProseSection
            id="coupon-vs-invite"
            title="BoonBuy referral code &amp; invite code"
          >
            <p>
              Searchers mix these phrases: BoonBuy coupon code, promo code, discount code,
              referral code, and invite code. On BoonBuy Finds they point at the same
              verified registration path — invite{" "}
              <strong className="font-mono text-foreground">
                {BOONBUY_COUPONS_OFFER.inviteCode}
              </strong>
              .
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="font-semibold text-foreground">Invite / referral code</strong>{" "}
                ({BOONBUY_COUPONS_OFFER.inviteCode}) — entered or attached at signup.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Coupon / promo / discount</strong>{" "}
                — usually means the shipping savings that can follow that invite for
                eligible new accounts.
              </li>
            </ul>
            <p>
              We do not keep separate indexable pages for invite, referral, voucher, or
              promo phrasings. This hub is the canonical answer; thin aliases permanently
              redirect here.
            </p>
          </ProseSection>

          <ProseSection id="does-coupon-expire" title="Does the BoonBuy coupon expire?">
            <p>
              We do not invent a fixed expiration date. BoonBuy promotions can change.
              Treat the claim button and BoonBuy’s live signup terms as authoritative, and
              check this page again before a large haul — BoonBuy Finds updates the
              verified offer when it changes.
            </p>
          </ProseSection>

          <ProseSection
            id="coupon-not-working"
            title="Why a BoonBuy coupon may not work"
          >
            <ul className="list-disc space-y-2 pl-5">
              <li>The promotion changed or paused on BoonBuy’s side</li>
              <li>You already had a BoonBuy account (new-user eligibility)</li>
              <li>You registered without the invite URL / code</li>
              <li>Region or account restrictions apply</li>
              <li>You expected a product-price code; the discount appears later on shipping</li>
              <li>You are looking at an outdated screenshot from social media</li>
            </ul>
          </ProseSection>

          <ProseSection id="how-much-save" title="How much can you save?">
            <p>
              The verified headline is{" "}
              <strong className="font-semibold text-foreground">
                up to {BOONBUY_COUPONS_OFFER.discountPercent}% off shipping
              </strong>
              . “Up to” means the maximum promoted percentage when the offer applies — not
              a promise that every parcel drops by exactly that amount.
            </p>
            <p>
              Final freight still depends on weight, volumetric size, shipping line,
              destination, and BoonBuy’s live quote. Claim the invite first, then compare
              lines before you pay.
            </p>
            <div className="mt-5">
              <ClaimButton location="boonbuy_coupons_savings" />
            </div>
          </ProseSection>

          <ProseSection id="why-boonbuyfinds" title="Why use BoonBuy Finds for coupons?">
            <p>
              BoonBuy Finds is not a random coupon scraper. It pairs the verified invite
              with a searchable catalog, QC references, spreadsheet-style discovery,
              brand and category pages, and updated finds — so you claim savings and shop
              with the same workflow.
            </p>
          </ProseSection>

          {/* Mid CTA */}
          <section className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
            <p className="text-lg font-black text-foreground">
              Ready to claim the BoonBuy coupon?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Register with the verified invite, then browse finds with QC and checkout
              links.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <ClaimButton location="boonbuy_coupons_mid_cta" />
              <Link
                href="/boonbuy-finds"
                className="inline-flex items-center justify-center rounded-full border border-border-strong px-6 py-3.5 text-sm font-bold text-foreground hover:border-accent/40 hover:text-accent"
              >
                Browse BoonBuy Finds
              </Link>
            </div>
          </section>

          <ProseSection id="after-you-claim" title="After you claim — browse BoonBuy Finds">
            <p>
              Once your account is ready, open{" "}
              <Link href="/boonbuy-finds" className="font-semibold text-accent hover:underline">
                BoonBuy Finds
              </Link>
              , filter by brand or category, check QC when available, and use verified buy
              buttons. Pair with{" "}
              <Link href="/boonbuy-spreadsheet" className="font-semibold text-accent hover:underline">
                the spreadsheet hub
              </Link>{" "}
              if you still think in rows.
            </p>
          </ProseSection>

          {/* Related resources — curated, not keyword wall */}
          <section id="related-resources" className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Related BoonBuy resources
            </h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {BOONBUY_COUPONS_RELATED_RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
                  >
                    {link.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section id="faq" className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Frequently asked questions
            </h2>
            <div className="mt-5 space-y-3">
              {BOONBUY_COUPONS_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border bg-surface/20 px-4 py-3"
                >
                  <summary className="cursor-pointer list-none font-bold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-3">
                      {faq.question}
                      <span className="text-muted transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Why create account — lower */}
          <section id="why-create-account" className="mt-14 scroll-mt-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Why create a BoonBuy account
            </p>
            <h2 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
              Buy with verified links, QC access, and order tracking
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Coupons get you started. A free BoonBuy account is where you buy, review
              warehouse QC, and ship. Guest browsing on BoonBuy Finds is fine for
              discovery — members get the full agent workflow.
            </p>
            <div className="mt-6">
              <GuestVsMemberTable compact />
            </div>
            <div className="mt-6">
              <ClaimButton location="boonbuy_coupons_account" />
            </div>
          </section>

          {/* Telegram */}
          <section className="mt-12 rounded-2xl border border-border p-5 text-center sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Community
            </p>
            <h2 className="mt-2 text-lg font-black">BoonBuy Finds on Telegram</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Follow {TELEGRAM_CHANNEL_NAME} for drops and haul talk — then return here for
              the verified coupon path.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border-strong px-5 py-2.5 text-sm font-bold hover:border-accent/40 hover:text-accent"
              >
                Open Telegram
              </a>
              <Link
                href="/boonbuy-telegram"
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-bold hover:border-accent/40 hover:text-accent"
              >
                Telegram hub
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/10 to-transparent p-6 text-center sm:p-8">
            <h2 className="text-xl font-black sm:text-2xl">
              Claim your BoonBuy shipping coupon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Last verified {lastVerified}. Confirm live terms on BoonBuy before you rely
              on any percentage.
            </p>
            <div className="mt-6">
              <ClaimButton location="boonbuy_coupons_final" />
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
