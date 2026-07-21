# Deploy BoonBuy Finds

## Fastest path (use now — no new repo needed)

Code lives on branch **`boonbuyfinds`** in your existing GitHub repo:

**https://github.com/lauriszeltins132-rgb/litbuyfinds/tree/boonbuyfinds**

### Vercel deploy from branch

1. Go to **https://vercel.com/new**
2. Import **`lauriszeltins132-rgb/litbuyfinds`**
3. Set **Production Branch** → `boonbuyfinds` (Settings → Git → Production Branch)
4. Deploy

This keeps LitBuy Finds on `main` and BoonBuy Finds on `boonbuyfinds` — two separate Vercel projects, same GitHub repo.

---

## Optional: separate GitHub repo

1. Open https://github.com/new → name **`boonbuyfinds`** (empty repo)
2. Run:

```bash
cd /home/ubuntu/boonbuyfinds
git remote set-url origin https://github.com/lauriszeltins132-rgb/boonbuyfinds.git
git push -u origin main
```

3. Import that repo in Vercel instead

---

## Domains

In Vercel → Project → Settings → Domains:

| Domain | Role |
|--------|------|
| `boonbuyfinds.net` | Primary |
| `boonbuys.com` | Redirects to boonbuyfinds.net (`next.config.ts`) |
| `www.boonbuyfinds.net` | Redirects to apex |

Add DNS records from the Vercel dashboard at your registrar.

---

## Before launch

- [x] `BOONBUY_SIGNUP_URL` / invite code — `src/lib/boonbuy-affiliate.ts` (`BOONFINDS`)
- [x] `SOCIAL_LINKS` — Telegram `@RNFinds`, Discord, Instagram, TikTok in `src/lib/constants.ts`
- [ ] `public/logo.svg` — BoonBuy branding

## SEO

See **`SEO-SEARCH-CONSOLE.md`** for the Search Console priority URL checklist, target queries, and 30-day ranking plan.

## Local dev

```bash
npm install && npm run dev
```
