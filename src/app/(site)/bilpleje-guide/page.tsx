import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { buildArticleJsonLd, JsonLd } from "@/components/seo/json-ld";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilpleje-guide"];

export const metadata = createSeoMetadata(page);

export default function BilplejeGuidePage() {
  return (
    <>
      <JsonLd data={buildArticleJsonLd(page)} />
      <SeoLandingPage page={page} />
    </>
  );
}
