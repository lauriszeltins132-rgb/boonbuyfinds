import { BOONBUY_SHIPPING_DISCOUNT_PERCENT } from "@/lib/constants";

/**
 * Lightweight CTA copy variants for future A/B tests.
 * Baseline stays active until an experiment flag is enabled — collect
 * funnel data first; do not wire a full experimentation platform yet.
 */
export type CouponCtaVariantId = "claim_shipping" | "get_discount";

const COUPON_CTA_LABELS: Record<CouponCtaVariantId, string> = {
  claim_shipping: `Claim ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Shipping`,
  get_discount: `Get BoonBuy ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Shipping Discount`,
};

/** Active baseline — swap via env/flag later without redesigning pages. */
export const ACTIVE_COUPON_CTA_VARIANT: CouponCtaVariantId = "claim_shipping";

export function getCouponCtaLabel(
  variant: CouponCtaVariantId = ACTIVE_COUPON_CTA_VARIANT
): string {
  return COUPON_CTA_LABELS[variant];
}
