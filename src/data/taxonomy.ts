export type FabricId = "lux-velvet" | "vegan-suede";

export type ShapeId = "rectangle" | "square" | "circle" | "heart" | "fold-over" | "tag";

export type SizeGroupId = "mini" | "small" | "standard" | "large" | "fold-over";

export type PriceTier = "mini" | "small" | "standard" | "large" | "fold-over";

export type PackSize = 10 | 25 | 50 | 100;


export interface Fabric {
  id: FabricId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  origin: string;
  feel: string;
}


export interface Colour {
  id: string;
  name: string;
  hex: string;
  family: "neutral" | "warm" | "cool" | "green" | "pink";
}


export interface Shape {
  id: ShapeId;
  name: string;
  plural: string;
  blurb: string;
}


export interface SizeGroup {
  id: SizeGroupId;
  name: string;
  blurb: string;
  range: string;
}


export interface Format {
  id: string;
  name: string;
  shape: ShapeId;
  widthMm: number;
  heightMm: number;
  sizeGroup: SizeGroupId;
  tier: PriceTier;
  fabrics: FabricId[];
  hole?: boolean;
  fold?: boolean;
  note?: string;
}


// ── Fabrics ────────────────────────────────────────────────────────────────

export const FABRICS: Fabric[] = [
  {
    id: "lux-velvet",
    name: "Lux Velvet",
    shortName: "Velvet",
    tagline: "Plush, rich and unmistakably premium",
    description:
      "Our signature lux velvet has a deep, soft pile that catches the light. Designs are debossed into the pile with a German-engineered industrial laser, leaving a crisp, permanent, tone-on-tone finish that reads beautifully on knits, quilts and garments.",
    origin: "Laser debossed in Canberra, Australia",
    feel: "Soft pile, luxurious hand-feel",
  },
  {
    id: "vegan-suede",
    name: "Vegan Suede",
    shortName: "Suede",
    tagline: "Matte, modern and eco-friendly",
    description:
      "A 100% eco-friendly vegan ultra-suede sourced from Italy. It has a smooth matte face with a subtle nap, sews like a dream by hand or machine, and shrugs off the washing machine and dryer without fading or fraying.",
    origin: "Italian ultra-suede, made in Canberra, Australia",
    feel: "Smooth matte face, buttery drape",
  },
];


// ── Colours ────────────────────────────────────────────────────────────────

export const VELVET_COLOURS: Colour[] = [
  { id: "black", name: "Black", hex: "#1a1a1c", family: "neutral" },
  { id: "charcoal", name: "Charcoal", hex: "#45464a", family: "neutral" },
  { id: "ivory", name: "Ivory", hex: "#efe7d8", family: "neutral" },
  { id: "blush", name: "Blush", hex: "#e8b7b3", family: "pink" },
  { id: "dusty-rose", name: "Dusty Rose", hex: "#c48a92", family: "pink" },
  { id: "mustard", name: "Mustard", hex: "#c99a2e", family: "warm" },
  { id: "burnt-orange", name: "Burnt Orange", hex: "#b8552b", family: "warm" },
  { id: "terracotta", name: "Terracotta", hex: "#b06a4c", family: "warm" },
  { id: "olive", name: "Olive", hex: "#6f7340", family: "green" },
  { id: "emerald", name: "Emerald", hex: "#1f6f4f", family: "green" },
  { id: "forest", name: "Forest", hex: "#22493a", family: "green" },
  { id: "teal", name: "Teal", hex: "#1f5f6a", family: "cool" },
  { id: "navy", name: "Navy", hex: "#1e2a4a", family: "cool" },
  { id: "royal-blue", name: "Royal Blue", hex: "#2c4a9e", family: "cool" },
  { id: "lilac", name: "Lilac", hex: "#b7a3cc", family: "cool" },
  { id: "plum", name: "Plum", hex: "#5a2b4d", family: "pink" },
  { id: "burgundy", name: "Burgundy", hex: "#6b1f2c", family: "warm" },
  { id: "chocolate", name: "Chocolate", hex: "#4a2f24", family: "warm" },
];


export const SUEDE_COLOURS: Colour[] = [
  { id: "black", name: "Black", hex: "#232325", family: "neutral" },
  { id: "slate", name: "Slate", hex: "#5d6169", family: "neutral" },
  { id: "stone", name: "Stone", hex: "#a39d93", family: "neutral" },
  { id: "cream", name: "Cream", hex: "#ebe3d4", family: "neutral" },
  { id: "sand", name: "Sand", hex: "#d6c3a3", family: "warm" },
  { id: "camel", name: "Camel", hex: "#b48a5a", family: "warm" },
  { id: "tan", name: "Tan", hex: "#a0673f", family: "warm" },
  { id: "chocolate", name: "Chocolate", hex: "#53382b", family: "warm" },
  { id: "blush", name: "Blush", hex: "#e4bcb4", family: "pink" },
  { id: "dusty-pink", name: "Dusty Pink", hex: "#c9979b", family: "pink" },
  { id: "mustard", name: "Mustard", hex: "#c79b3b", family: "warm" },
  { id: "rust", name: "Rust", hex: "#a2512f", family: "warm" },
  { id: "sage", name: "Sage", hex: "#9aa88c", family: "green" },
  { id: "olive", name: "Olive", hex: "#6c6f44", family: "green" },
  { id: "forest", name: "Forest", hex: "#2e4b3d", family: "green" },
  { id: "teal", name: "Teal", hex: "#2e6470", family: "cool" },
  { id: "navy", name: "Navy", hex: "#24304f", family: "cool" },
  { id: "denim", name: "Denim", hex: "#4f6a93", family: "cool" },
  { id: "lavender", name: "Lavender", hex: "#b3a6c7", family: "cool" },
  { id: "plum", name: "Plum", hex: "#5c3352", family: "pink" },
  { id: "burgundy", name: "Burgundy", hex: "#702a35", family: "warm" },
];


export const COLOURS_BY_FABRIC: Record<FabricId, Colour[]> = {
  "lux-velvet": VELVET_COLOURS,
  "vegan-suede": SUEDE_COLOURS,
};


// ── Shapes ─────────────────────────────────────────────────────────────────

export const SHAPES: Shape[] = [
  {
    id: "rectangle",
    name: "Rectangle",
    plural: "Rectangles",
    blurb: "The classic seam label. Sits flat along a hem, neckline or side seam.",
  },
  {
    id: "square",
    name: "Square",
    plural: "Squares",
    blurb: "Neat and modern. Perfect for a monogram, an icon or a two-line stack.",
  },
  {
    id: "circle",
    name: "Circle",
    plural: "Circles",
    blurb: "Soft and friendly. A favourite for knitwear, toys and baby pieces.",
  },
  {
    id: "heart",
    name: "Heart",
    plural: "Hearts",
    blurb: "Made with love, literally. The go-to shape for gifts and keepsakes.",
  },
  {
    id: "fold-over",
    name: "Fold-over",
    plural: "Fold-overs",
    blurb: "Folds over the edge of a hem or seam so the design shows on both sides.",
  },
  {
    id: "tag",
    name: "Hang tag",
    plural: "Hang tags",
    blurb: "A punched hole for twine or a safety pin. Ideal for market stalls and gifting.",
  },
];


// ── Size groups ────────────────────────────────────────────────────────────

export const SIZE_GROUPS: SizeGroup[] = [
  { id: "mini", name: "Mini", range: "2 – 2.5 cm", blurb: "Tiny accents for cuffs, collars and little things." },
  { id: "small", name: "Small", range: "2.5 – 5 cm", blurb: "Slim seam labels for a single line of text." },
  { id: "standard", name: "Standard", range: "3.5 – 5 cm", blurb: "Our most popular sizes. Room for a phrase and an icon." },
  { id: "large", name: "Large", range: "4.5 – 7 cm", blurb: "Statement labels for quilts, blankets and bags." },
  { id: "fold-over", name: "Fold-over", range: "folded 2 – 3 cm", blurb: "Loop-style labels that wrap the edge of a seam." },
];


// ── Formats ────────────────────────────────────────────────────────────────

const BOTH: FabricId[] = ["lux-velvet", "vegan-suede"];


export const FORMATS: Format[] = [
  { id: "rect-50x12", name: "Slim", shape: "rectangle", widthMm: 50, heightMm: 12.5, sizeGroup: "small", tier: "small", fabrics: BOTH, note: '2" × ½"' },
  { id: "rect-46x16", name: "Classic", shape: "rectangle", widthMm: 46, heightMm: 16, sizeGroup: "small", tier: "small", fabrics: BOTH },
  { id: "rect-70x12", name: "Wide strip", shape: "rectangle", widthMm: 70, heightMm: 12, sizeGroup: "small", tier: "small", fabrics: BOTH },
  { id: "rect-27x17", name: "Compact", shape: "rectangle", widthMm: 27.5, heightMm: 17.5, sizeGroup: "small", tier: "small", fabrics: BOTH },
  { id: "rect-37x17", name: "Petite", shape: "rectangle", widthMm: 37.5, heightMm: 17.5, sizeGroup: "standard", tier: "standard", fabrics: BOTH },
  { id: "rect-50x20", name: "Standard", shape: "rectangle", widthMm: 50, heightMm: 20, sizeGroup: "standard", tier: "standard", fabrics: BOTH },
  { id: "rect-60x30", name: "Large", shape: "rectangle", widthMm: 60, heightMm: 30, sizeGroup: "large", tier: "large", fabrics: BOTH },
  { id: "sq-20", name: "Mini square", shape: "square", widthMm: 20, heightMm: 20, sizeGroup: "mini", tier: "mini", fabrics: BOTH },
  { id: "sq-30", name: "Square", shape: "square", widthMm: 30, heightMm: 30, sizeGroup: "standard", tier: "standard", fabrics: BOTH },
  { id: "circle-20", name: "Mini circle", shape: "circle", widthMm: 20, heightMm: 20, sizeGroup: "mini", tier: "mini", fabrics: BOTH },
  { id: "circle-35", name: "Circle", shape: "circle", widthMm: 35, heightMm: 35, sizeGroup: "standard", tier: "standard", fabrics: BOTH },
  { id: "circle-45", name: "Large circle", shape: "circle", widthMm: 45, heightMm: 45, sizeGroup: "large", tier: "large", fabrics: BOTH },
  { id: "heart-25", name: "Mini heart", shape: "heart", widthMm: 25, heightMm: 23, sizeGroup: "mini", tier: "mini", fabrics: BOTH },
  { id: "heart-35", name: "Heart", shape: "heart", widthMm: 35, heightMm: 32, sizeGroup: "standard", tier: "standard", fabrics: BOTH },
  { id: "fold-32x38", name: "Fold-over", shape: "fold-over", widthMm: 32, heightMm: 38, sizeGroup: "fold-over", tier: "fold-over", fabrics: BOTH, fold: true, note: '1¼" × 1½", shows 32 × 19 mm folded' },
  { id: "fold-20x40", name: "Slim fold-over", shape: "fold-over", widthMm: 20, heightMm: 40, sizeGroup: "fold-over", tier: "fold-over", fabrics: BOTH, fold: true, note: "shows 20 × 20 mm folded" },
  { id: "tag-30x50", name: "Hang tag", shape: "tag", widthMm: 30, heightMm: 50, sizeGroup: "large", tier: "large", fabrics: BOTH, hole: true },
];


// ── Pack pricing (AUD cents) ───────────────────────────────────────────────

export const PACK_SIZES: PackSize[] = [10, 25, 50, 100];


export const PACK_PRICES: Record<PriceTier, Record<PackSize, number>> = {
  mini: { 10: 1200, 25: 2400, 50: 4000, 100: 7000 },
  small: { 10: 1400, 25: 2800, 50: 4800, 100: 8500 },
  standard: { 10: 1600, 25: 3200, 50: 5500, 100: 9800 },
  large: { 10: 1900, 25: 3800, 50: 6600, 100: 11800 },
  "fold-over": { 10: 1700, 25: 3400, 50: 5800, 100: 10400 },
};


export const SHIPPING = {
  currency: "aud",
  freeThresholdCents: 6000,
  domesticCents: 650,
  internationalCents: 1495,
  domesticEta: "3 – 6 business days",
  internationalEta: "10 – 21 business days",
};
