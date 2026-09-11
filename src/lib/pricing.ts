import { PACK_PRICES, PACK_SIZES, SHIPPING, type PackSize, type PriceTier } from "@/data/taxonomy";


export function packPrice(tier: PriceTier, pack: PackSize): number {
  return PACK_PRICES[tier][pack];
}


export function perLabel(tier: PriceTier, pack: PackSize): number {
  return packPrice(tier, pack) / pack;
}


export function fromPrice(tier: PriceTier): number {
  return packPrice(tier, PACK_SIZES[0]);
}


export function savingsPercent(tier: PriceTier, pack: PackSize): number {
  const base = perLabel(tier, PACK_SIZES[0]);
  const current = perLabel(tier, pack);

  return Math.round((1 - current / base) * 100);
}


export function isPackSize(value: number): value is PackSize {
  return (PACK_SIZES as number[]).includes(value);
}


export function shippingCents(subtotalCents: number, international = false): number {
  if (international) return SHIPPING.internationalCents;

  return subtotalCents >= SHIPPING.freeThresholdCents ? 0 : SHIPPING.domesticCents;
}


export function amountToFreeShipping(subtotalCents: number): number {
  return Math.max(0, SHIPPING.freeThresholdCents - subtotalCents);
}


const aud = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });


export function money(cents: number): string {
  return aud.format(cents / 100);
}


export function moneyCompact(cents: number): string {
  return cents % 100 === 0 ? `$${cents / 100}` : money(cents);
}
