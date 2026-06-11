import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo-pages";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/booking`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...seoPages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    {
      url: `${siteConfig.url}/admin/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
