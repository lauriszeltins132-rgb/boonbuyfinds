/** Single source of truth for BoonBuy referral / coupon signup links. */

export const BOONBUY_INVITE_CODE = "32IJIHM6P";

export const BOONBUY_SIGNUP_URL = `https://boonbuy.com/register?inviteCode=${BOONBUY_INVITE_CODE}`;

/** Primary coupon claim destination used by deals/coupon landing CTAs. */
export const BOONBUY_COUPON_URL = BOONBUY_SIGNUP_URL;

/** New-user shipping discount promoted across BoonBuy Finds. */
export const BOONBUY_SHIPPING_DISCOUNT_PERCENT = 45;

export const BOONBUY_SHIPPING_DISCOUNT_LABEL = `${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Off Shipping`;

export const BOONBUY_SHIPPING_DISCOUNT_SAVE_LABEL = `Save up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% on shipping`;

export const BOONBUY_SHIPPING_COUPON_CTA = `Claim ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Shipping Coupon ✅`;
