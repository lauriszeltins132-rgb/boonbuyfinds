# Deploy BoonBuy Finds

## GitHub (one-time)

The project is pushed to branch **`boonbuyfinds`** on the litbuyfinds repo.

To create a **separate repository** (recommended):

1. Open https://github.com/new
2. Repository name: `boonbuyfinds`
3. Create empty repo (no README)
4. Run locally:

```bash
cd /path/to/boonbuyfinds
git remote set-url origin https://github.com/lauriszeltins132-rgb/boonbuyfinds.git
git push -u origin main
```

Or use GitHub **Import repository** and point at the `boonbuyfinds` branch.

## Vercel

1. Go to https://vercel.com/new
2. Import the `boonbuyfinds` GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Deploy

## Domains

In Vercel → Project → Settings → Domains, add:

| Domain | Role |
|--------|------|
| `boonbuyfinds.net` | Primary |
| `boonbuys.com` | Redirects to boonbuyfinds.net (configured in `next.config.ts`) |
| `www.boonbuyfinds.net` | Redirects to apex |

Point both domains' DNS to Vercel (A/CNAME records from Vercel dashboard).

## Before launch checklist

- [ ] Update `BOONBUY_SIGNUP_URL` in `src/lib/constants.ts` with your real BoonBuy invite code
- [ ] Update `SOCIAL_LINKS` with your Telegram / Discord / TikTok / Instagram
- [ ] Replace `public/logo.svg` with BoonBuy branding
- [ ] Set up `hello@boonbuyfinds.net` email

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000
