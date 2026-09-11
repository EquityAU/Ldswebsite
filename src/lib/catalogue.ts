import { DESIGNS, THEMES, type Design, type Theme, type ThemeId } from "@/data/designs";
import {
  COLOURS_BY_FABRIC,
  FABRICS,
  FORMATS,
  SHAPES,
  SIZE_GROUPS,
  type Colour,
  type Fabric,
  type FabricId,
  type Format,
  type Shape,
  type ShapeId,
  type SizeGroup,
  type SizeGroupId,
} from "@/data/taxonomy";


export type Facet = "shape" | "theme" | "size" | "fabric";

export const FACETS: Facet[] = ["shape", "theme", "size", "fabric"];


const formatById = new Map(FORMATS.map((f) => [f.id, f]));

const designBySlug = new Map(DESIGNS.map((d) => [d.slug, d]));


// ── Lookups ────────────────────────────────────────────────────────────────

export function getFormat(id: string): Format {
  const format = formatById.get(id);

  if (!format) throw new Error(`Unknown format: ${id}`);

  return format;
}


export function findFormat(id: string | undefined): Format | undefined {
  return id ? formatById.get(id) : undefined;
}


export function getDesign(slug: string): Design | undefined {
  return designBySlug.get(slug);
}


export function getFabric(id: FabricId): Fabric {
  return FABRICS.find((f) => f.id === id)!;
}


export function findFabric(id: string | undefined): Fabric | undefined {
  return FABRICS.find((f) => f.id === id);
}


export function getShape(id: ShapeId): Shape {
  return SHAPES.find((s) => s.id === id)!;
}


export function findShape(id: string | undefined): Shape | undefined {
  return SHAPES.find((s) => s.id === id);
}


export function findSizeGroup(id: string | undefined): SizeGroup | undefined {
  return SIZE_GROUPS.find((s) => s.id === id);
}


export function getTheme(id: ThemeId): Theme {
  return THEMES.find((t) => t.id === id)!;
}


export function findTheme(id: string | undefined): Theme | undefined {
  return THEMES.find((t) => t.id === id);
}


export function getColour(fabric: FabricId, colourId: string): Colour {
  const colours = COLOURS_BY_FABRIC[fabric];

  return colours.find((c) => c.id === colourId) ?? colours[0];
}


export function findColour(fabric: FabricId, colourId: string | undefined): Colour | undefined {
  return COLOURS_BY_FABRIC[fabric].find((c) => c.id === colourId);
}


// ── Design queries ─────────────────────────────────────────────────────────

export function designFormats(design: Design): Format[] {
  return design.formats.map(getFormat);
}


export function designShapes(design: Design): ShapeId[] {
  return [...new Set(designFormats(design).map((f) => f.shape))];
}


export function designSizeGroups(design: Design): SizeGroupId[] {
  return [...new Set(designFormats(design).map((f) => f.sizeGroup))];
}


export function designsForShape(shape: ShapeId): Design[] {
  return DESIGNS.filter((d) => designShapes(d).includes(shape));
}


export function designsForSize(size: SizeGroupId): Design[] {
  return DESIGNS.filter((d) => designSizeGroups(d).includes(size));
}


export function designsForTheme(theme: ThemeId): Design[] {
  return DESIGNS.filter((d) => d.themes.includes(theme));
}


export function designsForFabric(fabric: FabricId): Design[] {
  return DESIGNS.filter((d) => designFormats(d).some((f) => f.fabrics.includes(fabric)));
}


export function preferredFormat(design: Design, shape?: ShapeId, size?: SizeGroupId): Format {
  const fallback = getFormat(design.defaultFormat);
  const fits = (f: Format) => (!shape || f.shape === shape) && (!size || f.sizeGroup === size);

  if (fits(fallback)) return fallback;

  const matches = designFormats(design).filter(fits);

  return matches.find((f) => f.sizeGroup === "standard") ?? matches[0] ?? fallback;
}


export function preferredColour(design: Design, fabric: FabricId): Colour {
  return findColour(fabric, design.defaultColour) ?? COLOURS_BY_FABRIC[fabric][0];
}


export function bestsellers(limit = 8): Design[] {
  const ranked = [...DESIGNS].sort((a, b) => rank(a) - rank(b));

  return ranked.slice(0, limit);
}


function rank(design: Design): number {
  if (design.badge === "bestseller") return 0;
  if (design.badge === "popular") return 1;
  if (design.badge === "new") return 2;

  return 3;
}


export function searchDesigns(query: string): Design[] {
  const q = query.trim().toLowerCase();

  if (!q) return DESIGNS;

  return DESIGNS.filter((d) => {
    const haystack = [d.name, ...d.lines, ...d.keywords, ...d.themes].join(" ").toLowerCase();

    return haystack.includes(q);
  });
}


export interface ShopFilters {
  shape?: ShapeId;
  size?: SizeGroupId;
  theme?: ThemeId;
  fabric?: FabricId;
  q?: string;
}


export function filterDesigns(filters: ShopFilters): Design[] {
  let results = filters.q ? searchDesigns(filters.q) : DESIGNS;

  if (filters.theme) results = results.filter((d) => d.themes.includes(filters.theme!));
  if (filters.shape) results = results.filter((d) => designShapes(d).includes(filters.shape!));
  if (filters.size) results = results.filter((d) => designSizeGroups(d).includes(filters.size!));
  if (filters.fabric) results = results.filter((d) => designFormats(d).some((f) => f.fabrics.includes(filters.fabric!)));

  return results;
}


export function facetSlugs(facet: Facet): string[] {
  switch (facet) {
    case "shape":
      return SHAPES.map((s) => s.id);
    case "theme":
      return THEMES.map((t) => t.id);
    case "size":
      return SIZE_GROUPS.map((s) => s.id);
    case "fabric":
      return FABRICS.map((f) => f.id);
  }
}
