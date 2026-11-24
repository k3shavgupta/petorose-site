import type { MetadataRoute } from "next";
import { products } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/products/"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about/"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/contact/"), changeFrequency: "yearly", priority: 0.7 },
  ];
  return [...pages, ...products.map((p) => ({ url: absoluteUrl(`/products/${p.slug}/`), changeFrequency: "monthly" as const, priority: 0.8 }))];
}
