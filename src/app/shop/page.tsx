import type { Metadata } from "next";
import { filterDesigns, findFabric, findShape, findSizeGroup, findTheme, type ShopFilters } from "@/lib/catalogue";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import { Breadcrumbs, Container, Eyebrow, Heading } from "@/components/ui";


export const metadata: Metadata = {
  title: "Shop all pre-made labels",
  description: "Browse every pre-made velvet and vegan suede label. Filter by theme, shape, size and fabric.",
};


type SearchParams = Promise<Record<string, string | string[] | undefined>>;


function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}


export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;

  const filters: ShopFilters = {
    theme: findTheme(single(sp.theme))?.id,
    shape: findShape(single(sp.shape))?.id,
    size: findSizeGroup(single(sp.size))?.id,
    fabric: findFabric(single(sp.fabric))?.id,
    q: single(sp.q)?.trim() || undefined,
  };

  const designs = filterDesigns(filters);
  const active = Object.values(filters).filter(Boolean).length;

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>All labels</Eyebrow>
          <Heading as="h1" className="mt-2 text-4xl sm:text-5xl">
            {filters.q ? `Results for “${filters.q}”` : "Every pre-made label"}
          </Heading>
        </div>
        <p className="text-sm text-ink-muted">
          {designs.length} {designs.length === 1 ? "design" : "designs"}
          {active > 0 && ` · ${active} ${active === 1 ? "filter" : "filters"}`}
        </p>
      </div>

      <div className="mt-8 rounded-card border border-line bg-white/70 p-4">
        <FilterBar filters={filters} />
      </div>

      <div className="mt-10">
        <ProductGrid designs={designs} shape={filters.shape} size={filters.size} fabric={filters.fabric} emptyMessage="Nothing matches that combination. Try clearing a filter or searching a different phrase." />
      </div>
    </Container>
  );
}
