"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

type Item = { href: string; label: string; hint?: string };

export default function NavDropdown({ label, items }: { label: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const canHover = useRef(false);

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative h-full"
      onMouseEnter={() => canHover.current && setOpen(true)}
      onMouseLeave={() => canHover.current && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => (canHover.current ? true : !v))}
        className={clsx(
          "flex h-full items-center gap-1 rounded-full px-3 py-2 text-sm font-medium hover:bg-sand hover:text-ink",
          open ? "text-ink" : "text-ink-soft",
        )}
      >
        {label}
        <ChevronDown className={clsx("size-3.5 opacity-60 transition", open && "rotate-180")} />
      </button>

      <div
        id={id}
        className={clsx(
          "absolute left-0 top-full z-50 w-[420px] pt-2 transition",
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0",
        )}
      >
        <div className="rounded-card border border-line bg-white p-2 shadow-lift">
          <ul className="grid grid-cols-1 gap-0.5">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 hover:bg-sand">
                  <span className="block text-sm font-medium">{item.label}</span>
                  {item.hint && <span className="block text-xs text-ink-muted">{item.hint}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
