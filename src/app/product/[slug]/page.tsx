import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DESIGNS } from "@/data/designs";
import { designFormats, designsForTheme, findColour, findFabric, getDesign, getFabric, getTheme, preferredColour } from "@/lib/catalogue";
import { fromPrice, money } from "@/lib/pricing";
import { SITE } from "@/lib/site";
import ProductConfigurator from "@/components/ProductConfigurator";
import ProductGrid from "@/components/ProductGrid";
import { Breadcrumbs, Container, Eyebrow, Heading, Badge } from "@/components/ui";


type Params = Promise<{ slug: string }>;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;


function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}


export function generateStaticParams() {
  return DESIGNS.map((d) => ({ slug: d.slug }));
}


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const design = getDesign((await params).slug);

  if (!design) return {};

  const cheapest = Math.min(...designFormats(design).map((f) => fromPrice(f.tier)));

  return {
    title: `${design.name} label`,
    description: `${design.description} Pre-made in lux velvet or vegan suede, from ${money(cheapest)} a pack.`,
  };
}


const details = [
  {
    title: "Material & finish",
    body: "Lux velvet has a soft, deep pile; vegan suede is a 100% eco-friendly Italian ultra-suede with a smooth matte face. Both are laser debossed tone-on-tone with a German-engineered industrial laser, so the design is permanent and will not peel, crack or fade.",
  },
  {
    title: "How to attach",
    body: "Hand stitch or machine sew around the edge with a matching thread. For fold-over labels, fold along the crease and catch both sides in a seam. Hang tags come with a punched hole for twine or a safety pin.",
  },
  {
    title: "Care",
    body: "Machine wash cold on a gentle cycle and tumble dry low, or follow the care instructions of the garment. Velvet can be steamed to lift the pile after washing.",
  },
  {
    title: "Packs & shipping",
    body: "Packs of 10, 25, 50 or 100 identical labels. Orders ship from Canberra in 1 – 2 business days with tracking. Australian shipping is free over $60.",
  },
];


export default async function ProductPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const design = getDesign(slug);

  if (!design) notFound();

  const formats = designFormats(design);
  const requestedFormat = formats.find((f) => f.id === single(sp.format));
  const initialFormat = requestedFormat?.id ?? design.defaultFormat;
  const initialFabric = findFabric(single(sp.fabric))?.id ?? design.defaultFabric;
  const initialColour = (findColour(initialFabric, single(sp.colour)) ?? preferredColour(design, initialFabric)).id;
  const theme = getTheme(design.themes[0]);
  const related = designsForTheme(theme.id)
    .filter((d) => d.slug !== design.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${design.name} label`,
    description: design.description,
    brand: { "@type": "Brand", name: SITE.name },
    material: [getFabric("lux-velvet").name, getFabric("vegan-suede").name],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: (Math.min(...formats.map((f) => fromPrice(f.tier))) / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Container className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: theme.short, href: `/shop/theme/${theme.id}` }, { label: design.name }]} />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Eyebrow>{theme.name}</Eyebrow>
        {design.badge && <Badge kind={design.badge} />}
      </div>
      <Heading as="h1" className="mt-2 text-4xl sm:text-5xl">
        {design.name}
      </Heading>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{design.description}</p>

      <div className="mt-10">
        <ProductConfigurator design={design} initialFormat={initialFormat} initialFabric={initialFabric} initialColour={initialColour} />
      </div>

      <section className="mt-16 grid gap-3 md:grid-cols-2">
        {details.map((d) => (
          <details key={d.title} className="group rounded-card border border-line bg-white p-5 open:shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              {d.title}
              <span className="text-ink-muted transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{d.body}</p>
          </details>
        ))}
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <Eyebrow>More from {theme.name}</Eyebrow>
          <Heading className="mt-2 text-3xl">You might also like</Heading>
          <div className="mt-8">
            <ProductGrid designs={related} />
          </div>
        </section>
      )}
    </Container>
  );
}
