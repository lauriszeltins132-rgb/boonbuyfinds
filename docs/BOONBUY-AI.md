# BoonBuy AI — Repository Audit & Architecture

**Date:** 2026-07-21  
**Site:** https://boonbuyfinds.net  
**Branch:** `cursor/boonbuy-ai-assistant-158a`

## 1) Repository audit

| Area | Finding |
|------|---------|
| Framework | Next.js **15.3+** (App Router), React **19**, TypeScript **strict** |
| Data | File-based catalog: `src/data/products.json` (~3.1k products) from spreadsheet import — **no Postgres** |
| Product type | `id`, `product_name`, `category`, `category_slug`, `price`, `affiliate_link`, `qc_link`, `image`, `sheet`, `group` |
| Brand | Derived at runtime from product name (`extractBrand`) — not a DB column |
| Search today | Lexical `filterProducts` (tokens + brand + price + QC) + autocomplete index |
| Product UI | Reuse `ProductCard`, `ProductGrid`, buy/agent CTAs |
| API routes | analytics, daily-drop, catalog audit, processed-image — **no AI yet** |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` already wired |
| Auth | **None** (wishlist/preferences in localStorage) |
| Design | Cream/orange BoonBuy theme — **do not redesign** |
| Env | No `.env` / secrets in repo historically |
| AI deps (before) | None (`ai`, gateway, zod added for this feature) |

## 2) Architecture decisions (pragmatic production)

1. **No new product database.** Ground all recommendations in `getAllProducts()` / existing filters.
2. **Hybrid search v1 = deterministic + lexical + synonym expansion + ranking** over the JSON catalog.  
   Vector/pgvector deferred — requires Postgres we do not have. Embedding hooks left optional via env.
3. **Vercel AI SDK + AI Gateway** for chat/tool-calling when `AI_GATEWAY_API_KEY` is set.
4. **Graceful degradation:** if no AI key / budget exceeded, `/api/ai/search` and rule-based chat fallback still return real products.
5. **In-memory rate limits** (per hashed IP). Optional Redis later via `RATE_LIMIT_REDIS_URL`.
6. **No automatic SEO doorway pages** from user queries. Indexable `/ai` hub only.
7. **Admin queue / full auth admin** scoped as Phase-2 follow-up (no auth layer today). Cron endpoints protected by `CRON_SECRET`.

## 3) Database changes

**None required for v1.** No migration.

Optional later: Postgres + pgvector for embeddings if catalog grows past in-memory ranking comfort.

## 4) Environment variables

See `.env.example`. Required for LLM chat: `AI_GATEWAY_API_KEY`, `AI_PRIMARY_MODEL`. Search tools work without them.

## 5) Package additions

- `ai` (Vercel AI SDK)
- `@ai-sdk/gateway`
- `@ai-sdk/react`
- `zod`

## 6) Risks

| Risk | Mitigation |
|------|------------|
| AI cost abuse | Rate limits, daily budget, max tokens, tool-call caps |
| Invented products | Tools return only catalog IDs; system prompt forbids invention |
| Affiliate URL mutation | Tools pass through existing `affiliate_link` unchanged |
| Homepage JS weight | Dynamic import floating AI; `/ai` page owns heavy chat |
| Prompt injection via product text | Treat product fields as data; tools use fixed queries |
| No API key in prod | Search-only fallback stays useful |

## 8) Local testing

```bash
cp .env.example .env.local
# Optional: set AI_GATEWAY_API_KEY for full LLM chat
npm run dev
# Open http://localhost:3000/ai
npm run test:ai
npm run build
```

Without `AI_GATEWAY_API_KEY`, chat uses deterministic catalogue search (still real products).

## 9) Vercel production checklist

1. Set env vars in Vercel project settings (AI_GATEWAY_API_KEY, models, CRON_SECRET).
2. Deploy `main` after merge.
3. Verify `https://boonbuyfinds.net/ai` returns 200.
4. Verify `POST /api/ai/search` with `{ "query": "black shoes under 50" }`.
5. Verify floating AI button on homepage (does not block mobile dock).
6. Confirm Speed Insights / Analytics still load.
7. Cron: `GET /api/ai/cron/index-health` with `Authorization: Bearer $CRON_SECRET`.

## 10) Rollback

Revert the merge commit for `cursor/boonbuy-ai-assistant-158a` or remove `AiLauncher` / `AiHeroEntry` imports and `/ai` route if needed. Catalogue and existing pages are unchanged.

## Remaining optional improvements

- Postgres + pgvector embeddings
- Redis rate limits
- Admin SEO draft queue + auth
- Collection-page “Refine with AI” chip strip
- E2E Playwright suite with mocked model
- Conversation persistence with consent
