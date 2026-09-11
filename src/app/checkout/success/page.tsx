import type { Metadata } from "next";
import { Check } from "lucide-react";
import ClearCart from "@/components/ClearCart";
import { ButtonLink, Container, Heading } from "@/components/ui";
import { money } from "@/lib/pricing";
import { stripe, stripeConfigured } from "@/lib/stripe";


export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};


type SearchParams = Promise<Record<string, string | string[] | undefined>>;


async function stripeSummary(sessionId: string) {
  if (!stripeConfigured()) return null;

  try {
    const session = await stripe().checkout.sessions.retrieve(sessionId);

    return {
      reference: session.id.slice(-8).toUpperCase(),
      email: session.customer_details?.email ?? null,
      total: session.amount_total ?? null,
    };
  } catch {
    return null;
  }
}


export default async function SuccessPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const provider = sp.provider === "paypal" ? "paypal" : "stripe";
  const sessionId = typeof sp.session_id === "string" ? sp.session_id : undefined;
  const paypalOrder = typeof sp.order === "string" ? sp.order : undefined;
  const summary = provider === "stripe" && sessionId ? await stripeSummary(sessionId) : null;
  const reference = summary?.reference ?? paypalOrder;

  return (
    <Container className="max-w-2xl py-24 text-center">
      <ClearCart />

      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-sage-soft text-sage">
        <Check className="size-7" />
      </span>

      <Heading as="h1" className="mt-6 text-4xl sm:text-5xl">
        Thank you, your labels are on their way
      </Heading>

      <p className="mt-4 text-lg text-ink-soft">
        We pack pre-made labels within 1 – 2 business days and send tracking as soon as they leave the studio.
      </p>

      {(reference || summary?.email || summary?.total) && (
        <dl className="mx-auto mt-8 inline-grid grid-cols-[auto_auto] gap-x-8 gap-y-1.5 rounded-card border border-line bg-white px-6 py-4 text-left text-sm">
          {reference && (
            <>
              <dt className="text-ink-muted">Reference</dt>
              <dd className="font-medium">{reference}</dd>
            </>
          )}
          {summary?.email && (
            <>
              <dt className="text-ink-muted">Receipt sent to</dt>
              <dd className="font-medium">{summary.email}</dd>
            </>
          )}
          {summary?.total != null && (
            <>
              <dt className="text-ink-muted">Total</dt>
              <dd className="font-medium">{money(summary.total)}</dd>
            </>
          )}
        </dl>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop">Keep shopping</ButtonLink>
        <ButtonLink href="/faq#sewing" variant="secondary">
          How to sew in your labels
        </ButtonLink>
      </div>
    </Container>
  );
}
