import { THEMES } from "@/data/designs";
import { FABRICS, SHAPES, SIZE_GROUPS } from "@/data/taxonomy";


export const SITE = {
  name: "Little Design Studio",
  tagline: "Pre-made velvet & vegan suede labels for makers",
  description:
    "Ready-to-ship laser debossed labels in lux velvet and vegan suede. Handmade, Made with Love, Made by Nan and more, packed in Canberra and shipped Australia-wide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.CONTACT_EMAIL ?? "littledesignstudio09@gmail.com",
  etsy: "https://www.etsy.com/au/shop/LittleDesignStudio",
  location: "Canberra, Australia",
  reviews: "1,000+ five-star reviews on Etsy",
};


export interface NavGroup {
  label: string;
  href: string;
  items: Array<{ label: string; href: string; hint?: string }>;
}


export const NAV: NavGroup[] = [
  {
    label: "Themes",
    href: "/shop",
    items: THEMES.map((t) => ({ label: t.name, href: `/shop/theme/${t.id}`, hint: t.blurb })),
  },
  {
    label: "Shapes",
    href: "/shop",
    items: SHAPES.map((s) => ({ label: s.plural, href: `/shop/shape/${s.id}`, hint: s.blurb })),
  },
  {
    label: "Sizes",
    href: "/shop",
    items: SIZE_GROUPS.map((s) => ({ label: `${s.name} · ${s.range}`, href: `/shop/size/${s.id}`, hint: s.blurb })),
  },
  {
    label: "Fabrics",
    href: "/shop",
    items: FABRICS.map((f) => ({ label: f.name, href: `/shop/fabric/${f.id}`, hint: f.tagline })),
  },
];


export const NAV_LINKS = [
  { label: "Shop all", href: "/shop" },
  { label: "Custom labels", href: "/custom" },
  { label: "About", href: "/about" },
];
