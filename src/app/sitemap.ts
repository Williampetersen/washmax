import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo-pages";
import { siteConfig } from "@/lib/site";

const url = (path: string) => `${siteConfig.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"),               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: url("/booking"),        lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: url("/velg-storrelse"), lastModified: now, changeFrequency: "monthly", priority: 0.80 },
    { url: url("/bilvask-pris"),   lastModified: now, changeFrequency: "monthly", priority: 0.90 },
    { url: url("/om-os"),          lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: url("/kontakt"),        lastModified: now, changeFrequency: "monthly", priority: 0.70 },
    { url: url("/erhvervs-bilvask"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: url("/handelsbetingelser"), lastModified: now, changeFrequency: "yearly", priority: 0.30 },
    { url: url("/persondatapolitik"),  lastModified: now, changeFrequency: "yearly", priority: 0.30 },
  ];

  const seoPageEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: url(`/${page.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));

  return [...staticPages, ...seoPageEntries];
}
