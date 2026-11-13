import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { ContentPage } from "./types";

export function createContentMetadata(page: ContentPage): Metadata {
  const canonical = `/${page.slug}`;
  const isEnglish = page.kind === "english";
  const fullTitle = `${page.title} | ${siteConfig.name}`;

  return {
    // The root layout appends " | CleanWash" to plain string titles.
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description: page.description,
      url: canonical,
      type: "website",
      locale: isEnglish ? "en_GB" : "da_DK",
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: page.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
