import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { buildArticleJsonLd, JsonLd } from "@/components/seo/json-ld";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["vaelg-den-rigtige-bilvask"];

export const metadata = createSeoMetadata(page);

export default function VaelgDenRigtigeBilvaskPage() {
  return (
    <>
      <JsonLd data={buildArticleJsonLd(page)} />
      <SeoLandingPage page={page} />
    </>
  );
}
