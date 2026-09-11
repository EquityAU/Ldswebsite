"use client";

import { useMemo, useState } from "react";
import { Check, Ruler, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import type { Design } from "@/data/designs";
import { COLOURS_BY_FABRIC, FABRICS, PACK_SIZES, type FabricId, type PackSize } from "@/data/taxonomy";
import { designFormats, findColour, getFormat, getShape } from "@/lib/catalogue";
import { money, packPrice, perLabel, savingsPercent } from "@/lib/pricing";
import { useCart } from "./CartProvider";
import LabelPreview from "./LabelPreview";
import { Button } from "./ui";


interface Props {
  design: Design;
  initialFormat: string;
  initialFabric: FabricId;
  initialColour: string;
}


export default function ProductConfigurator({ design, initialFormat, initialFabric, initialColour }: Props) {
  const { add } = useCart();
  const formats = useMemo(() => designFormats(design), [design]);

  const [fabric, setFabric] = useState<FabricId>(initialFabric);
  const [formatId, setFormatId] = useState(initialFormat);
  const [colourId, setColourId] = useState(initialColour);
  const [pack, setPack] = useState<PackSize>(25);
  const [trueSize, setTrueSize] = useState(false);
  const [added, setAdded] = useState(false);

  const format = getFormat(formatId);
  const colours = COLOURS_BY_FABRIC[fabric];
  const colour = findColour(fabric, colourId) ?? colours[0];
  const price = packPrice(format.tier, pack);

  const byShape = useMemo(() => {
    const groups = new Map<string, typeof formats>();

    for (const f of formats) groups.set(f.shape, [...(groups.get(f.shape) ?? []), f]);

    return [...groups.entries()];
  }, [formats]);

  function chooseFabric(next: FabricId) {
    setFabric(next);

    if (!findColour(next, colourId)) setColourId(COLOURS_BY_FABRIC[next][0].id);
  }

  function addToCart() {
    add({ designSlug: design.slug, formatId, fabric, colourId: colour.id, pack });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-card bg-sand">
          <div className="aspect-[4/3]">
            <LabelPreview design={design} format={format} fabric={fabric} colourHex={colour.hex} fit={trueSize ? "scale" : "contain"} className="h-full w-full" />
          </div>

          <button
            type="button"
            onClick={() => setTrueSize((v) => !v)}
            className={clsx(
              "absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur transition",
              trueSize ? "bg-ink text-cream" : "bg-white/80 text-ink-soft hover:bg-white",
            )}
          >
            <Ruler className="size-3.5" />
            {trueSize ? "Relative size" : "Fill preview"}
          </button>

          <span className="absolute bottom-3 right-3 rounded-full bg-white/80 px-3 py-1.5 text-xs text-ink-soft backdrop-blur">
            {colour.name} {fabric === "lux-velvet" ? "velvet" : "suede"} · {format.widthMm} × {format.heightMm} mm
          </span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          Preview is a rendering of the debossed design. Real velvet has a deeper pile and catches the light; suede is flatter and more matte.
        </p>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-2xl font-medium">{money(price)}</p>
          <p className="text-sm text-ink-muted">
            {money(perLabel(format.tier, pack))} per label · pack of {pack}
          </p>
        </div>

        <fieldset className="mt-8">
          <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Fabric</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {FABRICS.map((f) => {
              const active = f.id === fabric;

              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => chooseFabric(f.id)}
                  className={clsx("rounded-xl border p-3 text-left transition", active ? "border-ink bg-white shadow-card" : "border-line bg-white/60 hover:border-ink/40")}
                  aria-pressed={active}
                >
                  <span className="block text-sm font-medium">{f.name}</span>
                  <span className="mt-0.5 block text-xs text-ink-muted">{f.feel}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Shape & size</legend>
          <div className="mt-3 space-y-3">
            {byShape.map(([shape, list]) => (
              <div key={shape} className="flex flex-wrap items-center gap-2">
                <span className="w-20 shrink-0 text-sm text-ink-soft">{getShape(shape as never).name}</span>
                {list.map((f) => {
                  const active = f.id === formatId;

                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormatId(f.id)}
                      className={clsx(
                        "rounded-full border px-3 py-1.5 text-xs transition",
                        active ? "border-ink bg-ink text-cream" : "border-line bg-white text-ink-soft hover:border-ink/40 hover:text-ink",
                      )}
                      aria-pressed={active}
                      title={f.note}
                    >
                      {f.name} · {f.widthMm} × {f.heightMm}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          {format.note && <p className="mt-2 text-xs text-ink-muted">{format.note}</p>}
        </fieldset>

        <fieldset className="mt-7">
          <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Colour <span className="ml-1 font-normal normal-case tracking-normal text-ink-soft">· {colour.name}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {colours.map((c) => {
              const active = c.id === colour.id;

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColourId(c.id)}
                  className={clsx("swatch-fabric relative size-9 rounded-full ring-1 ring-black/10 transition hover:scale-105", active && "ring-2 ring-ink ring-offset-2 ring-offset-cream")}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                  aria-pressed={active}
                  title={c.name}
                >
                  {active && <Check className={clsx("absolute inset-0 m-auto size-4", c.hex < "#888888" ? "text-white" : "text-ink")} />}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Pack size</legend>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {PACK_SIZES.map((size) => {
              const active = size === pack;
              const saving = savingsPercent(format.tier, size);

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setPack(size)}
                  className={clsx("rounded-xl border px-2 py-3 text-center transition", active ? "border-ink bg-white shadow-card" : "border-line bg-white/60 hover:border-ink/40")}
                  aria-pressed={active}
                >
                  <span className="block text-base font-medium">{size}</span>
                  <span className="block text-xs text-ink-muted">{money(packPrice(format.tier, size))}</span>
                  {saving > 0 && <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-sage">Save {saving}%</span>}
                </button>
              );
            })}
          </div>
        </fieldset>

        <Button onClick={addToCart} className="mt-8 h-13 w-full text-base">
          {added ? (
            <>
              <Check className="size-5" />
              Added to cart
            </>
          ) : (
            <>
              <ShoppingBag className="size-5" />
              Add to cart · {money(price)}
            </>
          )}
        </Button>

        <ul className="mt-5 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <Check className="size-4 text-sage" />
            Ships in 1 – 2 business days
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 text-sage" />
            Free AU shipping over $60
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 text-sage" />
            Machine and dryer safe
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 text-sage" />
            Card, Apple Pay, Google Pay, PayPal
          </li>
        </ul>
      </div>
    </div>
  );
}
