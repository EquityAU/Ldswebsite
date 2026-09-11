import { NextResponse } from "next/server";
import { isRegion, priceCart } from "@/lib/checkout";
import { createPaypalOrder, paypalConfigured } from "@/lib/paypal";


export const runtime = "nodejs";


export async function POST(req: Request) {
  if (!paypalConfigured()) {
    return NextResponse.json({ error: "PayPal is not configured yet. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET." }, { status: 503 });
  }

  let body: { lines?: unknown; region?: unknown };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const region = isRegion(body.region) ? body.region : "au";

  try {
    const cart = priceCart(body.lines, region);
    const order = await createPaypalOrder(cart);

    return NextResponse.json({ id: order.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not start PayPal checkout";
    const status = message.startsWith("PayPal") ? 502 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
