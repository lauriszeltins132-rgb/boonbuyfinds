import type { Metadata } from "next";
import BoonBuyInviteCodeLanding from "@/components/BoonBuyInviteCodeLanding";
import {
  BOONBUY_INVITE_CODE,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  SITE_NAME,
} from "@/lib/constants";
import { getBoonBuyCouponsLastVerifiedLabel } from "@/lib/boonbuy-coupons-hub";
import { SITE_URL } from "@/lib/site";

const PATH = "/boonbuy-invite-code";

export function generateMetadata(): Metadata {
  const verified = getBoonBuyCouponsLastVerifiedLabel();
  const title = `BoonBuy Invite Code 2026 | ${BOONBUY_INVITE_CODE} Referral Code`;
  const description = `BoonBuy invite code ${BOONBUY_INVITE_CODE} for new-account signup. Same field people call a referral, invitation, or registration code. Current welcome offer: up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping. Verified ${verified}.`;
  const canonical = `${SITE_URL}${PATH}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

export default function BoonBuyInviteCodePage() {
  return <BoonBuyInviteCodeLanding />;
}
