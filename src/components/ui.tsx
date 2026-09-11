import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";


export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}


type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-ink text-cream hover:bg-clay focus-visible:ring-clay",
  secondary: "bg-cream text-ink border border-ink/15 hover:border-ink/40 focus-visible:ring-ink",
  ghost: "text-ink hover:bg-sand focus-visible:ring-ink",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-50";


export function Button({ variant = "primary", className, ...props }: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button className={clsx(buttonBase, buttonStyles[variant], className)} {...props} />;
}


export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={clsx(buttonBase, buttonStyles[variant], className)} {...props} />;
}


export function Pill({ active, className, ...props }: ComponentProps<typeof Link> & { active?: boolean }) {
  return (
    <Link
      className={clsx(
        "inline-flex shrink-0 items-center rounded-full border px-3.5 py-1.5 text-sm transition",
        active ? "border-ink bg-ink text-cream" : "border-line bg-white text-ink-soft hover:border-ink/40 hover:text-ink",
        className,
      )}
      {...props}
    />
  );
}


export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={clsx("text-xs font-semibold uppercase tracking-[0.18em] text-clay", className)}>{children}</p>;
}


export function Heading({ as: Tag = "h2", children, className }: { as?: "h1" | "h2" | "h3"; children: ReactNode; className?: string }) {
  return <Tag className={clsx("font-display text-balance font-medium leading-[1.05] tracking-tight", className)}>{children}</Tag>;
}


export function Badge({ kind }: { kind: "bestseller" | "new" | "popular" }) {
  const label = { bestseller: "Bestseller", new: "New", popular: "Popular" }[kind];
  const tone = {
    bestseller: "bg-clay text-cream",
    new: "bg-sage text-cream",
    popular: "bg-ink text-cream",
  }[kind];

  return <span className={clsx("rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider", tone)}>{label}</span>;
}


export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
