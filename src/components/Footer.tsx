import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Container } from "./ui";


const help = [
  { label: "Shipping & returns", href: "/shipping-returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Care guide", href: "/faq#care" },
  { label: "Contact", href: "/contact" },
];


export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sand/60">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-medium tracking-tight">Little Design Studio</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Laser debossed velvet and vegan suede labels, designed and made in {SITE.location}. Pre-made designs ship in 1 – 2 business days.
            Need something custom? We do that too.
          </p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${SITE.email}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">
              {SITE.email}
            </a>
          </p>
        </div>

        {NAV.slice(0, 2).map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">{group.label}</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">Help</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {help.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={SITE.etsy} target="_blank" rel="noreferrer" className="hover:text-ink">
                Our Etsy shop ↗
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Little Design Studio. All prices in AUD.</p>
          <p>Secure checkout with Stripe, PayPal, Apple Pay and Google Pay.</p>
        </Container>
      </div>
    </footer>
  );
}
