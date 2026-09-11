import { THEMES } from "@/data/designs";
import { FABRICS, SHAPES, SIZE_GROUPS } from "@/data/taxonomy";
import type { ShopFilters } from "@/lib/catalogue";
import { Pill } from "./ui";


function withParam(filters: ShopFilters, key: keyof ShopFilters, value?: string): string {
  const params = new URLSearchParams();

  for (const [k, v] of Object.entries({ ...filters, [key]: value })) {
    if (v) params.set(k, v);
  }

  const qs = params.toString();

  return qs ? `/shop?${qs}` : "/shop";
}


interface RowProps {
  label: string;
  active?: string;
  filterKey: keyof ShopFilters;
  filters: ShopFilters;
  options: Array<{ id: string; name: string }>;
}


function Row({ label, active, filterKey, filters, options }: RowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{label}</span>
      <div className="no-scrollbar flex gap-2 overflow-x-auto py-0.5">
        <Pill href={withParam(filters, filterKey, undefined)} active={!active}>
          All
        </Pill>
        {options.map((o) => (
          <Pill key={o.id} href={withParam(filters, filterKey, o.id)} active={active === o.id}>
            {o.name}
          </Pill>
        ))}
      </div>
    </div>
  );
}


export default function FilterBar({ filters }: { filters: ShopFilters }) {
  return (
    <div className="space-y-3">
      <Row label="Theme" filterKey="theme" active={filters.theme} filters={filters} options={THEMES.map((t) => ({ id: t.id, name: t.short }))} />
      <Row label="Shape" filterKey="shape" active={filters.shape} filters={filters} options={SHAPES} />
      <Row label="Size" filterKey="size" active={filters.size} filters={filters} options={SIZE_GROUPS} />
      <Row label="Fabric" filterKey="fabric" active={filters.fabric} filters={filters} options={FABRICS} />
    </div>
  );
}
