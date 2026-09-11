import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { THEMES } from "@/data/designs";
import { FABRICS, SHAPES } from "@/data/taxonomy";
import { bestsellers, designsForTheme, getDesign, getColour, getFormat, preferredColour, preferredFormat } from "@/lib/catalogue";
import { SITE } from "@/lib/site";
import LabelPreview from "@/components/LabelPreview";
import ProductGrid from "@/components/ProductGrid";
import TrustBar from "@/components/TrustBar";
import { ButtonLink, Container, Eyebrow, Heading } from "@/components/ui";


const heroLabels = [
  { slug: "made-with-love-script", format: "rect-46x16", fabric: "lux-velvet", colour: "blush", rotate: -6 },
  { slug: "made-by-nan", format: "rect-50x12", fabric: "lux-velvet", colour: "ivory", rotate: 4 },
  { slug: "hand-made-with-love", format: "heart-35", fabric: "lux-velvet", colour: "burgundy", rotate: -3 },
  { slug: "handmade-stack", format: "circle-35", fabric: "vegan-suede", colour: "sage", rotate: 5 },
  { slug: "custom-made", format: "rect-50x12", fabric: "vegan-suede", colour: "black", rotate: -2 },
  { slug: "hand-knitted", format: "rect-46x16", fabric: "lux-velvet", colour: "mustard", rotate: 3 },
] as const;


function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(180,87,58,0.10),transparent_70%)]" />

      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="max-w-xl">
          <Eyebrow>Pre-made · ready to ship</Eyebrow>
          <Heading as="h1" className="mt-4 text-5xl sm:text-6xl lg:text-7xl">
            Labels that finish the piece.
          </Heading>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Lux velvet and vegan suede labels, laser debossed in Canberra. Pick a phrase, choose a colour, and sew it into something you made. No
            minimums, no artwork, no waiting.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop">
              Shop all labels
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/shop/theme/with-love" variant="secondary">
              Made with love
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            From $12 a pack · Free AU shipping over $60 ·{" "}
            <a href={SITE.etsy} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-ink">
              {SITE.reviews}
            </a>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {heroLabels.map((item, i) => {
            const design = getDesign(item.slug)!;

            return (
              <Link
                key={item.slug}
                href={`/product/${item.slug}?format=${item.format}&fabric=${item.fabric}&colour=${item.colour}`}
                className={`rounded-card bg-white/70 p-2 shadow-card transition hover:-translate-y-1 hover:shadow-lift ${i % 2 ? "mt-6" : ""}`}
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <LabelPreview design={design} format={getFormat(item.format)} fabric={item.fabric} colourHex={getColour(item.fabric, item.colour).hex} className="w-full" />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


function ThemeCard({ id }: { id: (typeof THEMES)[number]["id"] }) {
  const theme = THEMES.find((t) => t.id === id)!;
  const designs = designsForTheme(id);
  const feature = designs.find((d) => d.badge) ?? designs[0];
  const format = preferredFormat(feature);
  const colour = preferredColour(feature, feature.defaultFabric);

  return (
    <Link href={`/shop/theme/${id}`} className="group flex flex-col rounded-card border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="aspect-[4/3] rounded-xl bg-sand">
        <LabelPreview design={feature} format={format} fabric={feature.defaultFabric} colourHex={colour.hex} className="h-full w-full transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-medium">{theme.name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{theme.blurb}</p>
        </div>
        <span className="mt-1 shrink-0 text-xs text-ink-muted">{designs.length} designs</span>
      </div>
    </Link>
  );
}


function Themes() {
  const featured = ["handmade", "with-love", "family", "craft", "custom", "baby"] as const;

  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Shop by theme</Eyebrow>
            <Heading className="mt-3 text-4xl">Find the words for your work</Heading>
          </div>
          <Link href="/shop" className="text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-ink">
            All {THEMES.length} themes
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((id) => (
            <ThemeCard key={id} id={id} />
          ))}
        </div>
      </Container>
    </section>
  );
}


function Bestsellers() {
  return (
    <section className="bg-white/60 py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Bestsellers</Eyebrow>
            <Heading className="mt-3 text-4xl">What makers are sewing in this month</Heading>
          </div>
          <Link href="/shop" className="text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-ink">
            Shop all
          </Link>
        </div>

        <div className="mt-10">
          <ProductGrid designs={bestsellers(8)} />
        </div>
      </Container>
    </section>
  );
}


function Shapes() {
  const sample: Record<string, { slug: string; colour: string }> = {
    rectangle: { slug: "made-with-love-script", colour: "navy" },
    square: { slug: "limited-edition", colour: "ivory" },
    circle: { slug: "love-in-every-stitch", colour: "dusty-rose" },
    heart: { slug: "with-love", colour: "burgundy" },
    "fold-over": { slug: "made-with-love-for-you", colour: "emerald" },
    tag: { slug: "a-gift-for-you", colour: "mustard" },
  };

  return (
    <section className="py-20">
      <Container>
        <Eyebrow>Shop by shape</Eyebrow>
        <Heading className="mt-3 text-4xl">Six shapes, cut to the millimetre</Heading>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SHAPES.map((shape) => {
            const design = getDesign(sample[shape.id].slug)!;
            const format = preferredFormat(design, shape.id);

            return (
              <Link key={shape.id} href={`/shop/shape/${shape.id}`} className="group rounded-card bg-sand p-3 text-center transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="aspect-square">
                  <LabelPreview design={design} format={format} fabric="lux-velvet" colourHex={getColour("lux-velvet", sample[shape.id].colour).hex} className="h-full w-full transition duration-500 group-hover:scale-[1.05]" />
                </div>
                <p className="mt-2 text-sm font-medium">{shape.plural}</p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


function Fabrics() {
  return (
    <section className="bg-ink py-20 text-cream">
      <Container>
        <Eyebrow className="text-clay-soft">Two fabrics</Eyebrow>
        <Heading className="mt-3 max-w-2xl text-4xl">Soft enough for baby skin, tough enough for the dryer</Heading>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FABRICS.map((fabric) => {
            const design = getDesign(fabric.id === "lux-velvet" ? "handmade-script" : "slow-made")!;
            const colour = getColour(fabric.id, fabric.id === "lux-velvet" ? "plum" : "sand");

            return (
              <Link key={fabric.id} href={`/shop/fabric/${fabric.id}`} className="group grid gap-6 rounded-card border border-cream/10 bg-cream/5 p-6 transition hover:bg-cream/10 sm:grid-cols-[1fr_1.2fr]">
                <div className="rounded-xl bg-cream/10 p-2">
                  <LabelPreview design={design} format={getFormat("rect-46x16")} fabric={fabric.id} colourHex={colour.hex} className="w-full" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium">{fabric.name}</h3>
                  <p className="mt-1 text-sm text-clay-soft">{fabric.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-cream/75">{fabric.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
                    Shop {fabric.shortName.toLowerCase()} labels
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


function HowItWorks() {
  const steps = [
    { n: "01", title: "Pick a phrase", body: "Over a hundred pre-made designs across twelve themes. Handmade, Made by Nan, Custom Made and more." },
    { n: "02", title: "Choose fabric & colour", body: "Lux velvet or vegan suede, in up to twenty-one colours. Every label is laser debossed tone-on-tone." },
    { n: "03", title: "Sew it in", body: "Hand stitch or machine sew along the edge. Labels arrive in one to two business days, ready to go." },
  ];

  return (
    <section className="py-20">
      <Container>
        <Eyebrow>How it works</Eyebrow>
        <Heading className="mt-3 text-4xl">Three steps to a finished piece</Heading>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="rounded-card border border-line bg-white p-6">
              <span className="font-display text-3xl text-clay">{step.n}</span>
              <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}


function CustomCta() {
  return (
    <section className="pb-8">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-card bg-clay-soft p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-xl">
            <Eyebrow>Custom labels</Eyebrow>
            <Heading className="mt-3 text-3xl">Want your own logo or wording?</Heading>
            <p className="mt-3 text-ink-soft">
              We have debossed thousands of custom designs for makers across Australia and the world. Send us your artwork and we will take it from there.
            </p>
          </div>
          <ButtonLink href="/custom" className="shrink-0">
            Start a custom order
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}


export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Themes />
      <Bestsellers />
      <Shapes />
      <Fabrics />
      <HowItWorks />
      <CustomCta />
    </>
  );
}
