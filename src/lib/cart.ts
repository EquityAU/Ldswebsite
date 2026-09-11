import type { FabricId, PackSize } from "@/data/taxonomy";
import { getColour, getDesign, getFormat } from "./catalogue";
import { packPrice } from "./pricing";


export interface CartLine {
  key: string;
  designSlug: string;
  formatId: string;
  fabric: FabricId;
  colourId: string;
  pack: PackSize;
  qty: number;
}


export type CartLineInput = Omit<CartLine, "key" | "qty"> & { qty?: number };


export const CART_STORAGE_KEY = "lds-cart-v1";


export function lineKey(input: CartLineInput): string {
  return [input.designSlug, input.formatId, input.fabric, input.colourId, input.pack].join("|");
}


export function lineUnitPrice(line: CartLine): number {
  return packPrice(getFormat(line.formatId).tier, line.pack);
}


export function lineTotal(line: CartLine): number {
  return lineUnitPrice(line) * line.qty;
}


export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0);
}


export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}


export function describeLine(line: CartLine): { title: string; detail: string } {
  const design = getDesign(line.designSlug);
  const format = getFormat(line.formatId);
  const colour = getColour(line.fabric, line.colourId);
  const fabricName = line.fabric === "lux-velvet" ? "Lux Velvet" : "Vegan Suede";

  return {
    title: design?.name ?? line.designSlug,
    detail: `${format.name} ${format.widthMm} × ${format.heightMm} mm · ${fabricName} · ${colour.name} · Pack of ${line.pack}`,
  };
}


export function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;

  const v = value as Record<string, unknown>;

  return (
    typeof v.designSlug === "string" &&
    typeof v.formatId === "string" &&
    typeof v.fabric === "string" &&
    typeof v.colourId === "string" &&
    typeof v.pack === "number" &&
    typeof v.qty === "number"
  );
}
