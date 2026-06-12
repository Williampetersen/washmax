import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPages, seoPagesBySlug } from "@/lib/seo-pages";

const physicalSeoSlugs = new Set([
  "bilvask-koebenhavn",
  "mobil-bilvask-koebenhavn",
  "bilvask-sjaelland",
  "indvendig-bilrengoering-koebenhavn",
  "haandvask-bil-koebenhavn",
]);

export function generateStaticParams() {
  return seoPages
    .filter((page) => !physicalSeoSlugs.has(page.slug) && !page.slug.includes("/"))
    .map((page) => ({
      seoSlug: page.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}) {
  const { seoSlug } = await params;
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
  const page = seoPagesBySlug[seoSlug];

  if (!page) {
    notFound();
  }

  return <SeoLandingPage page={page} />;
}
