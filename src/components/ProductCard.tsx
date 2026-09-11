import Link from "next/link";
import type { Design } from "@/data/designs";
import type { FabricId, ShapeId, SizeGroupId } from "@/data/taxonomy";
import { designFormats, designShapes, preferredColour, preferredFormat } from "@/lib/catalogue";
import { fromPrice, moneyCompact } from "@/lib/pricing";
import LabelPreview from "./LabelPreview";
import { Badge } from "./ui";


interface Props {
  design: Design;
  shape?: ShapeId;
  size?: SizeGroupId;
  fabric?: FabricId;
  priority?: boolean;
}


export default function ProductCard({ design, shape, size, fabric }: Props) {
  const format = preferredFormat(design, shape, size);
  const fabricId = fabric ?? design.defaultFabric;
  const colour = preferredColour(design, fabricId);
  const shapes = designShapes(design);
  const cheapest = Math.min(...designFormats(design).map((f) => fromPrice(f.tier)));

  const params = new URLSearchParams();

  params.set("format", format.id);
  params.set("fabric", fabricId);

  return (
    <Link href={`/product/${design.slug}?${params}`} className="group block">
      <div className="relative overflow-hidden rounded-card bg-sand transition group-hover:shadow-card">
        <div className="aspect-[4/3] w-full">
          <LabelPreview design={design} format={format} fabric={fabricId} colourHex={colour.hex} className="h-full w-full transition duration-500 group-hover:scale-[1.04]" />
        </div>

        {design.badge && (
          <div className="absolute left-3 top-3">
            <Badge kind={design.badge} />
          </div>
        )}

        <span className="absolute bottom-3 right-3 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink-soft backdrop-blur">
          {format.widthMm} × {format.heightMm} mm
        </span>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-medium leading-snug">{design.name}</h3>
          <p className="mt-0.5 text-xs text-ink-muted">
            {shapes.length} {shapes.length === 1 ? "shape" : "shapes"} · velvet & suede
          </p>
        </div>
        <p className="shrink-0 text-sm text-ink-soft">
          from <span className="font-medium text-ink">{moneyCompact(cheapest)}</span>
        </p>
      </div>
    </Link>
  );
}
