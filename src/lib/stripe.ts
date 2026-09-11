import Stripe from "stripe";


let client: Stripe | undefined;


export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");

  client ??= new Stripe(key, { typescript: true });

  return client;
}


export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
