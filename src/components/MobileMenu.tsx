"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV, NAV_LINKS } from "@/lib/site";


export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center rounded-full hover:bg-sand"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <button type="button" aria-label="Close menu" className="flex-1 bg-ink/40" onClick={() => setOpen(false)} />

          <div className="animate-rise flex h-full w-[min(88vw,360px)] flex-col overflow-y-auto bg-cream shadow-lift">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <span className="font-display text-xl font-medium">Menu</span>
              <button type="button" onClick={() => setOpen(false)} className="flex size-10 items-center justify-center rounded-full hover:bg-sand" aria-label="Close menu">
                <X className="size-5" />
              </button>
            </div>

            <form action="/shop" className="border-b border-line p-4">
              <input
                name="q"
                type="search"
                placeholder="Search labels"
                className="h-11 w-full rounded-full border border-line bg-white px-4 text-sm outline-none focus:border-ink/40"
              />
            </form>

            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="block rounded-xl px-3 py-2.5 text-base font-medium hover:bg-sand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {NAV.map((group) => (
                <div key={group.label} className="mt-5">
                  <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-clay">{group.label}</p>
                  <ul className="mt-1.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="block rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-sand hover:text-ink">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
