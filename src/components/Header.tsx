import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { NAV, NAV_LINKS, SITE } from "@/lib/site";
import { Container } from "./ui";
import CartButton from "./CartButton";
import MobileMenu from "./MobileMenu";


function Wordmark() {
  return (
    <Link href="/" className="flex items-baseline gap-1.5 whitespace-nowrap">
      <span className="font-display text-[22px] font-medium tracking-tight sm:text-2xl">Little Design Studio</span>
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-clay lg:inline">Labels</span>
    </Link>
  );
}


export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur">
      <div className="bg-ink text-center text-[12px] tracking-wide text-cream/90">
        <Container className="flex h-8 items-center justify-center gap-6 overflow-hidden whitespace-nowrap">
          <span>Free AU shipping over $60</span>
          <span className="hidden text-cream/40 sm:inline">·</span>
          <span className="hidden sm:inline">Ready to ship in 1 – 2 business days</span>
          <span className="hidden text-cream/40 md:inline">·</span>
          <span className="hidden md:inline">{SITE.reviews}</span>
        </Container>
      </div>

      <Container className="flex h-16 items-center gap-4">
        <MobileMenu />

        <Wordmark />

        <nav className="ml-6 hidden h-full items-center gap-1 lg:flex" aria-label="Primary">
          <Link href="/shop" className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft hover:bg-sand hover:text-ink">
            Shop all
          </Link>

          {NAV.map((group) => (
            <div key={group.label} className="group relative h-full">
              <button className="flex h-full items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink-soft hover:bg-sand hover:text-ink group-focus-within:text-ink">
                {group.label}
                <ChevronDown className="size-3.5 opacity-60 transition group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 top-full z-50 w-[420px] translate-y-1 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-card border border-line bg-white p-2 shadow-lift">
                  <ul className="grid grid-cols-1 gap-0.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="block rounded-xl px-3 py-2 hover:bg-sand">
                          <span className="block text-sm font-medium">{item.label}</span>
                          {item.hint && <span className="block text-xs text-ink-muted">{item.hint}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {NAV_LINKS.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft hover:bg-sand hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <form action="/shop" className="relative hidden md:block">
            <label htmlFor="site-search" className="sr-only">
              Search labels
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search “made by nan”"
              className="h-10 w-52 rounded-full border border-line bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-ink-muted focus:w-64 focus:border-ink/40"
            />
          </form>

          <CartButton />
        </div>
      </Container>
    </header>
  );
}
