import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageView } from "@/components/seo/content-page";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { contentPages, contentPagesBySlug } from "@/lib/content";
import { createContentMetadata } from "@/lib/content/metadata";
import { createSeoMetadata, seoPages, seoPagesBySlug } from "@/lib/seo-pages";

const physicalSeoSlugs = new Set([
  "bilvask-koebenhavn",
  "mobil-bilvask-koebenhavn",
  "bilvask-sjaelland",
  "indvendig-bilrengoering-koebenhavn",
  "haandvask-bil-koebenhavn",
]);

export function generateStaticParams() {
  const legacy = seoPages
    .filter((page) => !physicalSeoSlugs.has(page.slug) && !page.slug.includes("/"))
    .map((page) => ({ seoSlug: page.slug }));

  const content = contentPages.map((page) => ({ seoSlug: page.slug }));

  return [...legacy, ...content];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}): Promise<Metadata> {
  const { seoSlug } = await params;

  const contentPage = contentPagesBySlug[seoSlug];
  if (contentPage) {
    return createContentMetadata(contentPage);
  }

  const page = seoPagesBySlug[seoSlug];
  if (!page) {
    return {};
  }

  return createSeoMetadata(page);
}

export default async function SeoSlugPage({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}) {
  const { seoSlug } = await params;

  const contentPage = contentPagesBySlug[seoSlug];
  if (contentPage) {
    return <ContentPageView page={contentPage} />;
  }

  const page = seoPagesBySlug[seoSlug];
  if (!page) {
    notFound();
  }

  return <SeoLandingPage page={page} />;
}
