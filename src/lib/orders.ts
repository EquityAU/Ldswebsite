export interface OrderRecord {
  provider: "stripe" | "paypal";
  reference: string;
  email?: string;
  name?: string;
  totalCents: number;
  currency: string;
  lines: Array<{ title: string; detail: string; qty: number; unitCents: number }>;
  shipping?: Record<string, string | undefined>;
}


// Fulfilment hook. Swap the console log for an email (Resend, Postmark) or a
// database write once the studio decides how it wants to receive orders.
export async function recordOrder(order: OrderRecord): Promise<void> {
  console.log("[order]", JSON.stringify(order));
}
