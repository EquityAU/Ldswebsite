import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { THEMES, type Design } from "@/data/designs";
import { COLOURS_BY_FABRIC, FABRICS, FORMATS, SHAPES, SIZE_GROUPS, type FabricId, type ShapeId, type SizeGroupId } from "@/data/taxonomy";
import {
  designsForFabric,
  designsForShape,
  designsForSize,
  designsForTheme,
  facetSlugs,
  FACETS,
  findFabric,
  findShape,
  findSizeGroup,
  findTheme,
  type Facet,
} from "@/lib/catalogue";
import ProductGrid from "@/components/ProductGrid";
import { Breadcrumbs, Container, Eyebrow, Heading, Pill } from "@/components/ui";


type Params = Promise<{ facet: string; slug: string }>;


interface Collection {
  facet: Facet;
  title: string;
  eyebrow: string;
  intro: string;
  designs: Design[];
  shape?: ShapeId;
  size?: SizeGroupId;
  fabric?: FabricId;
  siblings: Array<{ id: string; name: string }>;
  aside?: React.ReactNode;
}


function isFacet(value: string): value is Facet {
  return (FACETS as string[]).includes(value);
}


function resolve(facet: Facet, slug: string): Collection | undefined {
  switch (facet) {
    case "shape": {
      const shape = findShape(slug);

      if (!shape) return;

      const formats = FORMATS.filter((f) => f.shape === shape.id);

      return {
        facet,
        title: `${shape.name} labels`,
        eyebrow: "Shop by shape",
        intro: shape.blurb,
        designs: designsForShape(shape.id),
        shape: shape.id,
        siblings: SHAPES.map((s) => ({ id: s.id, name: s.plural })),
        aside: (
          <ul className="flex flex-wrap gap-2">
            {formats.map((f) => (
              <li key={f.id} className="rounded-full bg-white px-3 py-1.5 text-xs text-ink-soft ring-1 ring-line">
                {f.name} · {f.widthMm} × {f.heightMm} mm
              </li>
            ))}
          </ul>
        ),
      };
    }
    case "theme": {
      const theme = findTheme(slug);

      if (!theme) return;

      return {
        facet,
        title: theme.name,
        eyebrow: "Shop by theme",
        intro: theme.hero,
        designs: designsForTheme(theme.id),
        siblings: THEMES.map((t) => ({ id: t.id, name: t.short })),
      };
    }
    case "size": {
      const size = findSizeGroup(slug);

      if (!size) return;

      const formats = FORMATS.filter((f) => f.sizeGroup === size.id);

      return {
        facet,
        title: `${size.name} labels`,
        eyebrow: `Shop by size · ${size.range}`,
        intro: size.blurb,
        designs: designsForSize(size.id),
        size: size.id,
        siblings: SIZE_GROUPS.map((s) => ({ id: s.id, name: s.name })),
        aside: (
          <ul className="flex flex-wrap gap-2">
            {formats.map((f) => (
              <li key={f.id} className="rounded-full bg-white px-3 py-1.5 text-xs text-ink-soft ring-1 ring-line">
                {f.name} · {f.widthMm} × {f.heightMm} mm
              </li>
            ))}
          </ul>
        ),
      };
    }
    case "fabric": {
      const fabric = findFabric(slug);

      if (!fabric) return;

      return {
        facet,
        title: `${fabric.name} labels`,
        eyebrow: "Shop by fabric",
        intro: fabric.description,
        designs: designsForFabric(fabric.id),
        fabric: fabric.id,
        siblings: FABRICS.map((f) => ({ id: f.id, name: f.name })),
        aside: (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{COLOURS_BY_FABRIC[fabric.id].length} colours</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {COLOURS_BY_FABRIC[fabric.id].map((c) => (
                <li key={c.id} title={c.name} className="swatch-fabric size-6 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
              ))}
            </ul>
          </div>
        ),
      };
    }
  }
}


export function generateStaticParams() {
  return FACETS.flatMap((facet) => facetSlugs(facet).map((slug) => ({ facet, slug })));
}


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { facet, slug } = await params;
  const collection = isFacet(facet) ? resolve(facet, slug) : undefined;

  if (!collection) return {};

  return {
    title: collection.title,
    description: collection.intro,
  };
}


export default async function CollectionPage({ params }: { params: Params }) {
  const { facet, slug } = await params;
  const collection = isFacet(facet) ? resolve(facet, slug) : undefined;

  if (!collection) notFound();

  const facetLabel = { shape: "Shapes", theme: "Themes", size: "Sizes", fabric: "Fabrics" }[collection.facet];

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: facetLabel }, { label: collection.title }]} />

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <Eyebrow>{collection.eyebrow}</Eyebrow>
          <Heading as="h1" className="mt-2 text-4xl sm:text-5xl">
            {collection.title}
          </Heading>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{collection.intro}</p>
        </div>

        {collection.aside && <div className="lg:justify-self-end">{collection.aside}</div>}
      </section>

      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto border-y border-line py-3">
        {collection.siblings.map((s) => (
          <Pill key={s.id} href={`/shop/${collection.facet}/${s.id}`} active={s.id === slug}>
            {s.name}
          </Pill>
        ))}
        <Link href="/shop" className="ml-auto shrink-0 self-center pl-4 text-sm text-ink-muted hover:text-ink">
          All labels →
        </Link>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-ink-muted">{collection.designs.length} designs</p>
      </div>

      <div className="mt-4">
        <ProductGrid designs={collection.designs} shape={collection.shape} size={collection.size} fabric={collection.fabric} />
      </div>
    </Container>
  );
}
