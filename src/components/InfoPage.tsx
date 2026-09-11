import type { ReactNode } from "react";
import { Breadcrumbs, Container, Eyebrow, Heading } from "./ui";


interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}


export default function InfoPage({ eyebrow, title, intro, children }: Props) {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />

      <div className="mt-6 max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h1" className="mt-2 text-4xl sm:text-5xl">
          {title}
        </Heading>
        {intro && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>}
      </div>

      <div className="prose-lds mt-10 max-w-3xl">{children}</div>
    </Container>
  );
}
