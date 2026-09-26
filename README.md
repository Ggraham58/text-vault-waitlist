# Text Vault — Early Access Landing Pages

Next.js (App Router) validation LPs for **Text Vault**: hub + Parents / Couples / Group arms, waitlist funnel, and Neon-backed analytics.

Soft claims only — designed for long-term / decentralized preservation. Never “forever,” “guaranteed,” or “can’t be deleted.”

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Neon serverless Postgres (`@neondatabase/serverless`)
- Deploy target: **GitHub + Vercel free tier**

## Routes

| Path | Purpose |
|------|---------|
| `/` | Hub linking to the three arms |
| `/parents` | Parents LP + vertical reel in hero |
| `/couples` | Couples LP |
| `/group` | Group gift LP |
| `POST /api/waitlist` | Persist waitlist signup |
| `POST /api/events` | Persist funnel events |
| `GET /api/admin/signups` | List signups (requires `ADMIN_KEY`) |

## Funnel events

Client fires (and server persists when `DATABASE_URL` is set):

- `page_view` (metadata includes `variant`: `parents` \| `couples` \| `group` \| `hub`)
- `hero_cta_click`
- `video_play`
- `waitlist_submit`
- `use_case_selected`
- `pricing_response`

Waitlist multi-step: **email → use-case → pricing**. Fields stored: `email`, `use_case`, `comment`, `pricing_response`, `variant`, `created_at`.

## Local development

```bash
# install
npm install
# or: bun install

cp .env.example .env.local
# fill DATABASE_URL + ADMIN_KEY (optional locally; waitlist needs DATABASE_URL)

npm run dev
# open http://localhost:3000
```

Build check:

```bash
npm run build
npm start
```

## Free Neon + Vercel setup

### 1. Neon (free Postgres)

1. Create an account at [https://console.neon.tech](https://console.neon.tech).
2. Create a project (any region).
3. Copy the connection string (**pooled** / serverless URL is fine).
4. Optionally paste `schema.sql` into the Neon SQL Editor and run it.  
   Tables are also **auto-created on first API request** if missing.

### 2. GitHub

1. Create a new empty repo (e.g. `text-vault`).
2. From this folder:

```bash
git init
git add .
git commit -m "Initial Text Vault early-access LPs"
git branch -M main
git remote add origin https://github.com/YOUR_USER/text-vault.git
git push -u origin main
```

### 3. Vercel (free)

1. Go to [https://vercel.com](https://vercel.com) → **Add New Project** → import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected).
3. Environment variables (Project → Settings → Environment Variables):

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon connection string |
| `ADMIN_KEY` | Long random secret (e.g. `openssl rand -hex 32`) |

4. Deploy. After deploy, test:

```bash
# waitlist
curl -X POST https://YOUR_DOMAIN/api/waitlist \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com","use_case":"message_to_child","pricing_response":"4.99","variant":"parents"}'

# admin
curl "https://YOUR_DOMAIN/api/admin/signups?key=YOUR_ADMIN_KEY"
# or: curl -H "x-admin-key: YOUR_ADMIN_KEY" https://YOUR_DOMAIN/api/admin/signups
```

## Brand

- Cream `#F7F3EE`, ink `#1C1917`, borders `#E7E0D6`, terracotta `#C4785A`
- Logo: TV monogram in `public/logo-selected.svg` and `public/1-tv-monogram.svg`
- Parents reel: `public/reel-parents.mp4` (CDN fallback kept in code)

## Contact

hello@textvault.app
