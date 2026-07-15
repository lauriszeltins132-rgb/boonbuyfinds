/** Single source of truth for BoonBuy referral / coupon signup links. */

export const BOONBUY_INVITE_CODE = "BOONFINDS";

export const BOONBUY_SIGNUP_URL = `https://boonbuy.com/register?inviteCode=${BOONBUY_INVITE_CODE}`;

/** Primary coupon claim destination used by deals/coupon landing CTAs. */
export const BOONBUY_COUPON_URL = BOONBUY_SIGNUP_URL;
