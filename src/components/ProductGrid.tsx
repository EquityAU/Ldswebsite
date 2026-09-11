import type { Design } from "@/data/designs";
import type { FabricId, ShapeId, SizeGroupId } from "@/data/taxonomy";
import ProductCard from "./ProductCard";


interface Props {
  designs: Design[];
  shape?: ShapeId;
  size?: SizeGroupId;
  fabric?: FabricId;
  emptyMessage?: string;
}


export default function ProductGrid({ designs, shape, size, fabric, emptyMessage = "No labels match those filters yet." }: Props) {
  if (designs.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-line bg-white/60 px-6 py-16 text-center text-ink-soft">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {designs.map((design) => (
        <li key={design.slug}>
          <ProductCard design={design} shape={shape} size={size} fabric={fabric} />
        </li>
      ))}
    </ul>
  );
}
