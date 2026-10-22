# Conversion funnel measurement (October 2026)

Affiliate discovery site: a visitor who lands, clicks through to BoonBuy, and leaves can look like a bounce while being a success. Prefer outbound CTA events over bounce rate.

## Analytics stack

- **Vercel Web Analytics** via `@vercel/analytics` (package `^2.0.1`, current stable)
- Custom events: `track()` from `@vercel/analytics` plus optional first-party store at `POST /api/analytics/event`
- Client helper: `src/lib/analytics-events.ts`
- Events fire only on real user actions (clicks / copy / search submit) — never on render

## Funnel events

| Event | Meaning |
| --- | --- |
| `coupon_claim_click` | Coupon / shipping-offer CTA → BoonBuy register |
| `coupon_code_copy` | User copied invite code (`JOINUP`) |
| `boonbuy_signup_click` | Any JOINUP register click |
| `product_outbound_click` | Product “View on BoonBuy” outbound |
| `spreadsheet_browse_click` | Spreadsheet hub → browse / search catalog |
| `qc_product_click` | QC link click from product UI |
| `telegram_join_click` | Telegram join CTA |
| `search_used` | Catalog search used (no free-text query sent) |
| `brand_product_click` | Product outbound from `/brands/*` |

Lightweight metadata when useful: `page` (pathname), `cta_location`. No PII.

## How to read Vercel

In Vercel project → Analytics → Custom Events, filter by event name and optional `page` / `cta_location`.

Combine with page visitors for CTR:

```
Coupon outbound CTR     = coupon_claim_click / visitors on /boonbuy-coupons
Code copy rate          = coupon_code_copy / visitors on /boonbuy-coupons
Signup CTR (any page)   = boonbuy_signup_click / visitors on that page
Spreadsheet engagement  = spreadsheet_browse_click / visitors on /boonbuy-spreadsheet
Product outbound CTR    = product_outbound_click / visitors on product pages
Brand product CTR       = brand_product_click / visitors on /brands/*
Search engagement       = search_used / site visitors
Telegram join CTR       = telegram_join_click / visitors on /boonbuy-telegram
```

### Priority pages

- `/boonbuy-coupons`
- `/boonbuy-spreadsheet`
- `/boonbuy-shipping-coupon`
- `/boonbuy-finds`
- `/boonbuy-qc`
- `/brands/*`
- Product detail pages (`/find/*`)

### Example (coupon)

```
/boonbuy-coupons visitors: 39
coupon_claim_click: 12
boonbuy_signup_click: 8
→ claim CTR ≈ 31%
```

## JOINUP outbound

Canonical register URL (do not change invite code):

`https://boonbuy.com/register?inviteCode=JOINUP`

Wired through `BOONBUY_SIGNUP_URL` / `RegisterLink`.

## Mobile sticky CTA

High-intent pages only (`/boonbuy-coupons`, `/boonbuy-spreadsheet`, `/boonbuy-shipping-coupon`):
dismissible bottom bar above the mobile dock. Tracks via `RegisterLink` locations ending in `_sticky`.

## CTA copy variants (later)

`src/lib/cta-variants.ts` holds baseline vs alternate coupon CTA labels.
Keep baseline until enough event volume; then flip `ACTIVE_COUPON_CTA_VARIANT`.

## Interpreting results

1. **Traffic problem** — few visitors on commercial landers
2. **Page conversion problem** — visitors high, outbound events low
3. **Downstream BoonBuy problem** — outbound high, affiliate conversions still weak

Only (1) and (2) are fully visible from this site’s analytics; (3) needs BoonBuy/affiliate reporting.
