import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyInviteCodeButton from "@/components/CopyInviteCodeButton";
import RegisterLink from "@/components/RegisterLink";
import SchemaScript from "@/components/SchemaScript";
import {
  BOONBUY_INVITE_CODE,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
} from "@/lib/constants";
import { getBoonBuyCouponsLastVerifiedLabel } from "@/lib/boonbuy-coupons-hub";
import { buildWebPageSchema } from "@/lib/schema";

const PATH = "/boonbuy-invite-code";

export default function BoonBuyInviteCodeLanding() {
  const lastVerified = getBoonBuyCouponsLastVerifiedLabel();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "BoonBuy Invite Code" },
  ];
  const description = `The BoonBuy invite code on BoonBuy Finds is ${BOONBUY_INVITE_CODE}. Use it at registration for the current new-account shipping offer (up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping). Last verified ${lastVerified}.`;

  return (
    <>
      <SchemaScript
        data={buildWebPageSchema({
          name: "BoonBuy Invite Code 2026",
          description,
          path: PATH,
        })}
      />
      <Breadcrumbs items={breadcrumbs} currentPath={PATH} />

      <article className="px-4 pb-16 pt-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <section className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-secondary-soft to-panel-hover p-6 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              BoonBuy registration
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              BoonBuy Invite Code 2026
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
              The BoonBuy invite code published by BoonBuy Finds is {BOONBUY_INVITE_CODE}.
              It attributes a new account. It does not change item prices by itself.
            </p>
            <div className="mx-auto mt-5 max-w-md rounded-2xl border border-accent/30 bg-background/70 px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                Invite code
              </p>
              <p className="mt-2 font-mono text-4xl font-black tracking-wide text-accent sm:text-5xl">
                {BOONBUY_INVITE_CODE}
              </p>
              <p className="mt-3 text-sm font-black text-foreground">
                Up to {BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping for eligible new accounts
              </p>
              <p className="mt-2 text-xs text-muted">Last verified {lastVerified}</p>
            </div>
            <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <CopyInviteCodeButton location="boonbuy_invite_code_copy" />
              <RegisterLink
                location="boonbuy_invite_code"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-black text-white hover:bg-accent-hover"
              >
                Sign Up With {BOONBUY_INVITE_CODE}
              </RegisterLink>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-border bg-surface/35 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Direct answer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              A BoonBuy invite code is the optional registration code on the signup form.
              BoonBuy Finds uses {BOONBUY_INVITE_CODE}. The matching signup URL already
              includes <span className="font-mono">inviteCode={BOONBUY_INVITE_CODE}</span>, so
              the field is filled when the link works. Shipping coupons are a separate step
              after the account exists.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black">What an invite code is</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              BoonBuy asks for an invitation code while you create an account. People also
              search that field as a referral code, invitation code, registration code, or
              signup code. Those phrases describe the same box. The code tells BoonBuy which
              signup path you used. It is not a product coupon you type at checkout.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black">Where the invite field is</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>Open the signup button on this page.</li>
              <li>Create a new BoonBuy account.</li>
              <li>
                If the invitation field is empty, type {BOONBUY_INVITE_CODE}.
              </li>
              <li>Finish registration, then check the account for shipping coupons.</li>
            </ol>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The signup URL is{" "}
              <span className="font-mono text-foreground">
                https://boonbuy.com/register?inviteCode={BOONBUY_INVITE_CODE}
              </span>
              . Prefer that link over typing a code from an old screenshot.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black">Invite code vs coupon</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The invite code is for registration. BoonBuy coupons are the shipping
              discounts you select later, when you pay freight for a parcel. The current
              new-account offer connected to this signup is up to{" "}
              {BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping. Confirm the live terms on
              BoonBuy. Coupon rules, where the discount appears, and why a coupon may not
              apply are on the coupons page.
            </p>
            <p className="mt-4">
              <Link href="/boonbuy-coupons" className="text-sm font-bold text-accent hover:underline">
                BoonBuy coupons and shipping offers
              </Link>
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black">Existing accounts and product prices</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              An invite code is entered when the account is created. BoonBuy Finds does not
              claim that an existing account can add {BOONBUY_INVITE_CODE} later. The code
              does not markdown catalog prices on this site. Item price, domestic shipping
              to the warehouse, and international freight are still quoted inside BoonBuy.
            </p>
            <p className="mt-3 text-xs text-muted">
              Last verified {lastVerified}. We do not publish an expiry date BoonBuy has
              not stated.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black">After you register</h2>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm">
              <li>
                <Link href="/boonbuy-spreadsheet" className="rounded-full border border-border px-3 py-1.5 font-bold hover:text-accent">
                  Spreadsheet
                </Link>
              </li>
              <li>
                <Link href="/boonbuy-finds" className="rounded-full border border-border px-3 py-1.5 font-bold hover:text-accent">
                  Finds
                </Link>
              </li>
              <li>
                <Link href="/boonbuy-qc" className="rounded-full border border-border px-3 py-1.5 font-bold hover:text-accent">
                  QC
                </Link>
              </li>
              <li>
                <Link href="/boonbuy-coupons" className="rounded-full border border-border px-3 py-1.5 font-bold hover:text-accent">
                  Coupons
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
