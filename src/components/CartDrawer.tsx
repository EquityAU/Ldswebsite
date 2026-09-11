"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import LabelPreview from "./LabelPreview";
import { ButtonLink } from "./ui";
import { cartSubtotal, describeLine, lineTotal, type CartLine } from "@/lib/cart";
import { getColour, getDesign, getFormat } from "@/lib/catalogue";
import { amountToFreeShipping, money } from "@/lib/pricing";


function DrawerLine({ line }: { line: CartLine }) {
  const { setQty, remove } = useCart();
  const design = getDesign(line.designSlug);
  const { title, detail } = describeLine(line);

  if (!design) return null;

  return (
    <li className="flex gap-4 py-4">
      <Link href={`/product/${line.designSlug}`} className="w-24 shrink-0 rounded-xl bg-sand p-1.5">
        <LabelPreview design={design} format={getFormat(line.formatId)} fabric={line.fabric} colourHex={getColour(line.fabric, line.colourId).hex} className="w-full" />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{detail}</p>
          </div>
          <p className="shrink-0 text-sm font-medium">{money(lineTotal(line))}</p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center rounded-full border border-line">
            <button type="button" onClick={() => setQty(line.key, line.qty - 1)} className="flex size-8 items-center justify-center rounded-full hover:bg-sand" aria-label="Decrease quantity">
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm tabular-nums">{line.qty}</span>
            <button type="button" onClick={() => setQty(line.key, line.qty + 1)} className="flex size-8 items-center justify-center rounded-full hover:bg-sand" aria-label="Increase quantity">
              <Plus className="size-3.5" />
            </button>
          </div>

          <button type="button" onClick={() => remove(line.key)} className="flex items-center gap-1 text-xs text-ink-muted hover:text-clay">
            <Trash2 className="size-3.5" />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}


export default function CartDrawer() {
  const { lines, open, setOpen } = useCart();
  const subtotal = cartSubtotal(lines);
  const toFree = amountToFreeShipping(subtotal);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" aria-label="Close cart" className="flex-1 bg-ink/40" onClick={() => setOpen(false)} />

      <aside className="animate-rise flex h-full w-[min(92vw,440px)] flex-col bg-cream shadow-lift" aria-label="Shopping cart">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <h2 className="font-display text-xl font-medium">Your cart</h2>
          <button type="button" onClick={() => setOpen(false)} className="flex size-10 items-center justify-center rounded-full hover:bg-sand" aria-label="Close cart">
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-ink-soft">Your cart is empty.</p>
            <ButtonLink href="/shop" onClick={() => setOpen(false)}>
              Browse labels
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="border-b border-line bg-sand/60 px-5 py-2.5 text-center text-xs text-ink-soft">
              {toFree > 0 ? (
                <>
                  Add <strong className="text-ink">{money(toFree)}</strong> more for free Australian shipping
                </>
              ) : (
                <>You have unlocked free Australian shipping</>
              )}
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map((line) => (
                <DrawerLine key={line.key} line={line} />
              ))}
            </ul>

            <div className="border-t border-line p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Subtotal</span>
                <span className="text-lg font-medium">{money(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">Shipping calculated at checkout. Pay with card, Apple Pay, Google Pay or PayPal.</p>
              <ButtonLink href="/cart" className="mt-4 w-full" onClick={() => setOpen(false)}>
                Review & checkout
              </ButtonLink>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
