import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { recordOrder } from "@/lib/orders";
import { stripe, stripeConfigured } from "@/lib/stripe";


export const runtime = "nodejs";


export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");

  if (!stripeConfigured() || !secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const payload = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe().webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const items = await stripe().checkout.sessions.listLineItems(session.id, { limit: 100 });

    await recordOrder({
      provider: "stripe",
      reference: session.id,
      email: session.customer_details?.email ?? undefined,
      name: session.customer_details?.name ?? undefined,
      totalCents: session.amount_total ?? 0,
      currency: (session.currency ?? "aud").toUpperCase(),
      lines: items.data.map((item) => ({
        title: item.description ?? "",
        detail: "",
        qty: item.quantity ?? 1,
        unitCents: item.price?.unit_amount ?? 0,
      })),
      shipping: (session.collected_information?.shipping_details?.address ?? undefined) as Record<string, string | undefined> | undefined,
    });
  }

  return NextResponse.json({ received: true });
}
