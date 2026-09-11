import type { MetadataRoute } from "next";
import { DESIGNS } from "@/data/designs";
import { facetSlugs, FACETS } from "@/lib/catalogue";
import { SITE } from "@/lib/site";


export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/shop", "/custom", "/about", "/faq", "/shipping-returns", "/contact"].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const collections = FACETS.flatMap((facet) =>
    facetSlugs(facet).map((slug) => ({
      url: `${SITE.url}/shop/${facet}/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const products = DESIGNS.map((d) => ({
    url: `${SITE.url}/product/${d.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...statics, ...collections, ...products];
}
