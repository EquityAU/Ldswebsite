import { NextResponse } from "next/server";
import { isRegion, priceCart } from "@/lib/checkout";
import { recordOrder } from "@/lib/orders";
import { capturePaypalOrder, paypalConfigured } from "@/lib/paypal";


export const runtime = "nodejs";


export async function POST(req: Request) {
  if (!paypalConfigured()) return NextResponse.json({ error: "PayPal is not configured" }, { status: 503 });

  let body: { orderId?: unknown; lines?: unknown; region?: unknown };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof body.orderId !== "string" || !body.orderId) return NextResponse.json({ error: "Missing order id" }, { status: 400 });

  try {
    const capture = await capturePaypalOrder(body.orderId);

    if (capture.status !== "COMPLETED") return NextResponse.json({ error: `PayPal order is ${capture.status}` }, { status: 402 });

    const unit = capture.purchase_units?.[0];
    const captured = unit?.payments?.captures?.[0];
    const cart = priceCart(body.lines, isRegion(body.region) ? body.region : "au");

    await recordOrder({
      provider: "paypal",
      reference: captured?.id ?? capture.id,
      email: capture.payer?.email_address,
      name: unit?.shipping?.name?.full_name ?? [capture.payer?.name?.given_name, capture.payer?.name?.surname].filter(Boolean).join(" "),
      totalCents: captured?.amount ? Math.round(parseFloat(captured.amount.value) * 100) : cart.totalCents,
      currency: captured?.amount?.currency_code ?? "AUD",
      lines: cart.lines.map((l) => ({ title: l.title, detail: l.detail, qty: l.line.qty, unitCents: l.unitCents })),
      shipping: unit?.shipping?.address,
    });

    return NextResponse.json({ id: capture.id, status: capture.status });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Could not capture PayPal order" }, { status: 502 });
  }
}
