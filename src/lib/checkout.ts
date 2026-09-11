import { COLOURS_BY_FABRIC, type FabricId } from "@/data/taxonomy";
import { describeLine, isCartLine, lineUnitPrice, type CartLine } from "./cart";
import { getDesign, getFormat } from "./catalogue";
import { isPackSize, shippingCents } from "./pricing";


export type ShippingRegion = "au" | "intl";


export interface PricedLine {
  line: CartLine;
  title: string;
  detail: string;
  unitCents: number;
  totalCents: number;
}


export interface PricedCart {
  lines: PricedLine[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  region: ShippingRegion;
}


export const MAX_LINE_QTY = 50;

export const MAX_LINES = 40;


export function isRegion(value: unknown): value is ShippingRegion {
  return value === "au" || value === "intl";
}


function validLine(line: CartLine): boolean {
  const design = getDesign(line.designSlug);

  if (!design || !design.formats.includes(line.formatId)) return false;

  const format = getFormat(line.formatId);

  if (!format.fabrics.includes(line.fabric)) return false;
  if (!COLOURS_BY_FABRIC[line.fabric as FabricId]?.some((c) => c.id === line.colourId)) return false;
  if (!isPackSize(line.pack)) return false;

  return Number.isInteger(line.qty) && line.qty >= 1 && line.qty <= MAX_LINE_QTY;
}


// Every price is recomputed from the catalogue here. The client only tells us
// what it wants, never what it costs.
export function priceCart(rawLines: unknown, region: ShippingRegion): PricedCart {
  if (!Array.isArray(rawLines) || rawLines.length === 0) throw new Error("Cart is empty");
  if (rawLines.length > MAX_LINES) throw new Error("Too many lines in cart");

  const lines = rawLines.map((raw): PricedLine => {
    if (!isCartLine(raw) || !validLine(raw)) throw new Error("Cart contains an invalid item");

    const unitCents = lineUnitPrice(raw);
    const { title, detail } = describeLine(raw);

    return { line: raw, title, detail, unitCents, totalCents: unitCents * raw.qty };
  });

  const subtotalCents = lines.reduce((sum, l) => sum + l.totalCents, 0);
  const shipping = shippingCents(subtotalCents, region === "intl");

  return { lines, subtotalCents, shippingCents: shipping, totalCents: subtotalCents + shipping, region };
}


export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}
