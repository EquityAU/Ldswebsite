import type { Metadata } from "next";
import { ButtonLink, Container, Heading } from "@/components/ui";


export const metadata: Metadata = {
  title: "Checkout cancelled",
  robots: { index: false },
};


export default function CancelPage() {
  return (
    <Container className="max-w-2xl py-24 text-center">
      <Heading as="h1" className="text-4xl">
        No charge was made
      </Heading>
      <p className="mt-4 text-ink-soft">Your cart is exactly as you left it. Come back whenever you are ready.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/cart">Back to cart</ButtonLink>
        <ButtonLink href="/shop" variant="secondary">
          Keep browsing
        </ButtonLink>
      </div>
    </Container>
  );
}
