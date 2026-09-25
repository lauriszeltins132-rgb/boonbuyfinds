import type { Metadata } from "next";
import BoonBuyCouponsLanding from "@/components/BoonBuyCouponsLanding";
import {
  BOONBUY_COUPONS_META,
  BOONBUY_COUPONS_PATH,
} from "@/lib/boonbuy-coupons-hub";
import {
  PROMO_BANNER_ALT,
  PROMO_OG_IMAGE_URL,
  SITE_NAME,
} from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

const canonical = `${SITE_URL}${BOONBUY_COUPONS_PATH}`;

export const metadata: Metadata = {
  title: { absolute: BOONBUY_COUPONS_META.title },
  description: BOONBUY_COUPONS_META.description,
  alternates: { canonical },
  robots: { index: true, follow: true },
  keywords: [
    "boonbuy coupon",
    "boonbuy coupons",
    "boonbuy coupon code",
    "boonbuy promo code",
    "boonbuy discount code",
    "boonbuy shipping coupon",
    "boonbuy shipping discount",
    "best boonbuy coupon",
    "working boonbuy coupon",
    "boonbuy referral code",
    "boonbuy invite code",
    "boonbuy coupon 2026",
  ],
  openGraph: {
    title: BOONBUY_COUPONS_META.title,
    description: BOONBUY_COUPONS_META.description,
    url: canonical,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: PROMO_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: PROMO_BANNER_ALT,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BOONBUY_COUPONS_META.title,
    description: BOONBUY_COUPONS_META.description,
    images: [PROMO_OG_IMAGE_URL],
  },
};

export default function BoonBuyCouponsPage() {
  return <BoonBuyCouponsLanding />;
}
