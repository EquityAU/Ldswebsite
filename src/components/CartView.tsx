"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import { SHIPPING } from "@/data/taxonomy";
import { cartSubtotal, describeLine, lineTotal, lineUnitPrice } from "@/lib/cart";
import { getColour, getDesign, getFormat } from "@/lib/catalogue";
import type { ShippingRegion } from "@/lib/checkout";
import { amountToFreeShipping, money, shippingCents } from "@/lib/pricing";
import { useCart } from "./CartProvider";
import CheckoutButtons from "./CheckoutButtons";
import LabelPreview from "./LabelPreview";
import { Breadcrumbs, ButtonLink, Container, Heading } from "./ui";


export default function CartView() {
  const { lines, hydrated, setQty, remove } = useCart();
  const [region, setRegion] = useState<ShippingRegion>("au");

  const subtotal = cartSubtotal(lines);
  const shipping = shippingCents(subtotal, region === "intl");
  const toFree = amountToFreeShipping(subtotal);

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <Heading as="h1" className="mt-6 text-4xl sm:text-5xl">
        Your cart
      </Heading>

      {hydrated && lines.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-line bg-white/60 px-6 py-20 text-center">
          <p className="text-ink-soft">Nothing here yet.</p>
          <ButtonLink href="/shop" className="mt-6">
            Browse labels
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ul className="divide-y divide-line">
            {lines.map((line) => {
              const design = getDesign(line.designSlug);

              if (!design) return null;

              const { title, detail } = describeLine(line);

              return (
                <li key={line.key} className="flex gap-5 py-6">
                  <Link href={`/product/${line.designSlug}?format=${line.formatId}&fabric=${line.fabric}&colour=${line.colourId}`} className="w-32 shrink-0 rounded-xl bg-sand p-2 sm:w-40">
                    <LabelPreview design={design} format={getFormat(line.formatId)} fabric={line.fabric} colourHex={getColour(line.fabric, line.colourId).hex} className="w-full" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium">{title}</p>
                        <p className="mt-1 text-sm text-ink-muted">{detail}</p>
                        <p className="mt-1 text-sm text-ink-muted">{money(lineUnitPrice(line))} per pack</p>
                      </div>
                      <p className="shrink-0 font-medium">{money(lineTotal(line))}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center rounded-full border border-line bg-white">
                        <button type="button" onClick={() => setQty(line.key, line.qty - 1)} className="flex size-9 items-center justify-center rounded-full hover:bg-sand" aria-label="Decrease quantity">
                          <Minus className="size-4" />
                        </button>
                        <span className="w-10 text-center text-sm tabular-nums">{line.qty}</span>
                        <button type="button" onClick={() => setQty(line.key, line.qty + 1)} className="flex size-9 items-center justify-center rounded-full hover:bg-sand" aria-label="Increase quantity">
                          <Plus className="size-4" />
                        </button>
                      </div>

                      <button type="button" onClick={() => remove(line.key)} className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-clay">
                        <Trash2 className="size-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit rounded-card border border-line bg-white p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-medium">Summary</h2>

            <fieldset className="mt-5">
              <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Shipping to</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(
                  [
                    ["au", "Australia"],
                    ["intl", "International"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setRegion(id)}
                    aria-pressed={region === id}
                    className={clsx("rounded-xl border px-3 py-2 text-sm transition", region === id ? "border-ink bg-ink text-cream" : "border-line hover:border-ink/40")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : money(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd>{money(subtotal + shipping)} AUD</dd>
              </div>
            </dl>

            {region === "au" && toFree > 0 && (
              <p className="mt-3 text-xs text-ink-muted">
                Add {money(toFree)} more for free shipping. Free on Australian orders over {money(SHIPPING.freeThresholdCents)}.
              </p>
            )}

            <div className="mt-6">
              <CheckoutButtons lines={lines} region={region} />
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}
