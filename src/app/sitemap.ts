import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo-pages";
import { blogPosts } from "@/lib/blog-posts";
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
    { url: url("/handelsbetingelser"), changeFrequency: "yearly",  priority: 0.30 },
    { url: url("/persondatapolitik"),  changeFrequency: "yearly",  priority: 0.30 },
  ];

  const seoPageEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: url(`/${page.slug}`),
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));

  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...seoPageEntries, ...blogPostEntries];
}
