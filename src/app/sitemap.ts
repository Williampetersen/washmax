import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { contentPages, contentPriority } from "@/lib/content";
import { CONTENT_UPDATED } from "@/lib/content/types";
import { seoPages } from "@/lib/seo-pages";
import { siteConfig } from "@/lib/site";

const url = (path: string) => `${siteConfig.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"),                   changeFrequency: "weekly",  priority: 1.0 },
    { url: url("/booking"),            changeFrequency: "weekly",  priority: 0.95 },
    { url: url("/om-os"),              changeFrequency: "monthly", priority: 0.75 },
    { url: url("/velg-storrelse"),     changeFrequency: "monthly", priority: 0.80 },
    { url: url("/retur-leasebil"),     changeFrequency: "monthly", priority: 0.75 },
    { url: url("/blog"),               changeFrequency: "weekly",  priority: 0.70 },
    { url: url("/serviceomraader"),    changeFrequency: "monthly", priority: 0.85 },
    { url: url("/ydelser"),            changeFrequency: "monthly", priority: 0.85 },
    { url: url("/biltyper"),           changeFrequency: "monthly", priority: 0.75 },
    { url: url("/handelsbetingelser"), changeFrequency: "yearly",  priority: 0.30 },
    { url: url("/persondatapolitik"),  changeFrequency: "yearly",  priority: 0.30 },
  ];

  // Prices and page templates were last revised on CONTENT_UPDATED.
  const revised = new Date(CONTENT_UPDATED);

  const seoPageEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: url(`/${page.slug}`),
    lastModified: revised,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));

  const contentPageEntries: MetadataRoute.Sitemap = contentPages.map((page) => ({
    url: url(`/${page.slug}`),
    lastModified: new Date(page.updated),
    changeFrequency: "monthly" as const,
    priority: contentPriority[page.kind],
  }));

  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...seoPageEntries, ...contentPageEntries, ...blogPostEntries];
}
