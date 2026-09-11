# Little Design Studio · pre-made labels shop

An e-commerce storefront for ready-to-ship laser debossed labels in lux velvet and vegan suede, built for the makers behind [LittleDesignStudio on Etsy](https://www.etsy.com/au/shop/LittleDesignStudio).

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4
- Catalogue of 111 pre-made designs across 12 themes, 6 shapes, 5 size groups and 2 fabrics, all defined in code (no CMS or database needed to launch)
- Every product image is rendered on the fly as an SVG label preview, so new designs never need photography
- Checkout with Stripe (cards, Apple Pay, Google Pay) and PayPal, with all prices recomputed server-side


## Running locally

```bash
pnpm install
cp .env.example .env.local   # then fill in keys
pnpm dev
```

Open http://localhost:3000. `pnpm build && pnpm start` runs the production build, `pnpm typecheck` and `pnpm lint` run the checks.


## Payments setup

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where it comes from |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The public URL of the deployed site, used for checkout redirects |
| `STRIPE_SECRET_KEY` | Stripe dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe dashboard → Developers → Webhooks → endpoint `/api/webhooks/stripe`, event `checkout.session.completed` |
| `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` | PayPal developer dashboard → Apps & Credentials |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Same client ID again, exposed to the browser for the PayPal buttons |
| `PAYPAL_ENV` | `sandbox` while testing, `live` in production |

**Apple Pay and Google Pay** are handled by Stripe Checkout. Turn them on under Stripe dashboard → Settings → Payment methods, and register the production domain under Settings → Payment method domains. They then appear automatically on supported devices; no extra code is required.

**PayPal** uses PayPal's own buttons on the cart page because Stripe's PayPal integration is not available to Australian accounts. Orders are created and captured through `/api/checkout/paypal/*`.

Until the keys are set the cart page still renders; the card button returns a friendly "not configured" message and the PayPal buttons stay hidden.


## Where orders go

Both providers call `recordOrder()` in `src/lib/orders.ts` after a successful payment. Right now it logs the order to the server console. Swap that for an email (Resend, Postmark) or a database write to receive orders wherever the studio prefers. Stripe also emails receipts itself when enabled in the dashboard.


## Editing the catalogue

Everything a shop owner would change lives in two files:

- `src/data/taxonomy.ts` — fabrics, colour palettes (with hex values), shapes, size formats in millimetres, pack prices and shipping rates.
- `src/data/designs.ts` — the pre-made designs. Each entry is a phrase, a font style, an optional icon, the themes it belongs to and which formats it is offered in.

Adding a design is one object in the relevant theme list. It appears in the shop, the curated pages, the sitemap and the product routes on the next build.

Prices and colour names are launch placeholders taken from the Etsy shop's public listings where available; confirm them against the studio's real cost sheet before going live.


## Project layout

```
src/app            routes (home, shop, curated collections, product, cart, checkout, info pages, API)
src/components     header, footer, cart, product configurator, SVG label renderer
src/data           catalogue: taxonomy and designs
src/lib            catalogue queries, pricing, cart, checkout validation, Stripe and PayPal clients
```

Curated collections are served from one dynamic route, `/shop/{shape|theme|size|fabric}/{slug}`, and are statically generated at build time along with every product page.
