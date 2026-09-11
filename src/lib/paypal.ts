import type { PricedCart } from "./checkout";


function baseUrl(): string {
  return process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}


export function paypalConfigured(): boolean {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}


async function accessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  if (!id || !secret) throw new Error("PayPal credentials are not set");

  const res = await fetch(`${baseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`PayPal auth failed: ${res.status}`);

  const data = (await res.json()) as { access_token: string };

  return data.access_token;
}


function dollars(cents: number): string {
  return (cents / 100).toFixed(2);
}


export async function createPaypalOrder(cart: PricedCart): Promise<{ id: string }> {
  const token = await accessToken();

  const res = await fetch(`${baseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "AUD",
            value: dollars(cart.totalCents),
            breakdown: {
              item_total: { currency_code: "AUD", value: dollars(cart.subtotalCents) },
              shipping: { currency_code: "AUD", value: dollars(cart.shippingCents) },
            },
          },
          items: cart.lines.map((l) => ({
            name: l.title.slice(0, 127),
            description: l.detail.slice(0, 127),
            quantity: String(l.line.qty),
            unit_amount: { currency_code: "AUD", value: dollars(l.unitCents) },
            category: "PHYSICAL_GOODS",
          })),
        },
      ],
      application_context: {
        brand_name: "Little Design Studio",
        shipping_preference: "GET_FROM_FILE",
        user_action: "PAY_NOW",
      },
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`PayPal create order failed: ${res.status} ${await res.text()}`);

  return (await res.json()) as { id: string };
}


export interface PaypalCapture {
  id: string;
  status: string;
  payer?: { email_address?: string; name?: { given_name?: string; surname?: string } };
  purchase_units?: Array<{
    shipping?: { name?: { full_name?: string }; address?: Record<string, string> };
    payments?: { captures?: Array<{ id: string; amount?: { value: string; currency_code: string } }> };
  }>;
}


export async function capturePaypalOrder(orderId: string): Promise<PaypalCapture> {
  const token = await accessToken();

  const res = await fetch(`${baseUrl()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`PayPal capture failed: ${res.status} ${await res.text()}`);

  return (await res.json()) as PaypalCapture;
}
