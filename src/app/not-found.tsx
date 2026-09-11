import { ButtonLink, Container, Heading } from "@/components/ui";


export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">404</p>
      <Heading as="h1" className="mt-3 text-4xl">
        That label has come unstitched
      </Heading>
      <p className="mt-4 text-ink-soft">We could not find the page you were looking for.</p>
      <ButtonLink href="/shop" className="mt-8">
        Back to the shop
      </ButtonLink>
    </Container>
  );
}
