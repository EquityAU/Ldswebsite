import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { isRegion, priceCart, siteUrl } from "@/lib/checkout";
import { stripe, stripeConfigured } from "@/lib/stripe";


export const runtime = "nodejs";


const INTERNATIONAL_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  "NZ", "US", "CA", "GB", "IE", "FR", "DE", "NL", "BE", "ES", "IT", "PT", "AT", "CH", "SE", "NO", "DK", "FI", "PL", "CZ",
  "JP", "KR", "SG", "HK", "MY", "TH", "PH", "ID", "IN", "AE", "ZA", "BR", "MX", "AR", "CL",
];


export async function POST(req: Request) {
  if (!stripeConfigured()) {
    return NextResponse.json({ error: "Card checkout is not configured yet. Set STRIPE_SECRET_KEY." }, { status: 503 });
  }

  let body: { lines?: unknown; region?: unknown };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const region = isRegion(body.region) ? body.region : "au";

  let cart;

  try {
    cart = priceCart(body.lines, region);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid cart" }, { status: 400 });
  }

  const base = siteUrl();

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    currency: "aud",
    line_items: cart.lines.map((l) => ({
      quantity: l.line.qty,
      price_data: {
        currency: "aud",
        unit_amount: l.unitCents,
        product_data: {
          name: `${l.title} label · pack of ${l.line.pack}`,
          description: l.detail,
          metadata: { key: l.line.key },
        },
      },
    })),
    shipping_address_collection: {
      allowed_countries: region === "au" ? ["AU"] : INTERNATIONAL_COUNTRIES,
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: region === "au" ? (cart.shippingCents === 0 ? "Free tracked shipping" : "Tracked shipping (Australia Post)") : "Tracked international shipping",
          fixed_amount: { amount: cart.shippingCents, currency: "aud" },
          delivery_estimate:
            region === "au"
              ? { minimum: { unit: "business_day", value: 3 }, maximum: { unit: "business_day", value: 6 } }
              : { minimum: { unit: "business_day", value: 10 }, maximum: { unit: "business_day", value: 21 } },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    metadata: {
      cart: JSON.stringify(cart.lines.map((l) => ({ k: l.line.key, q: l.line.qty }))).slice(0, 500),
      region,
    },
    success_url: `${base}/checkout/success?provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/checkout/cancel`,
  });

  if (!session.url) return NextResponse.json({ error: "Stripe did not return a checkout URL" }, { status: 502 });

  return NextResponse.json({ url: session.url });
}
