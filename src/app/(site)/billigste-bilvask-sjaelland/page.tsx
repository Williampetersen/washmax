import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { buildArticleJsonLd, JsonLd } from "@/components/seo/json-ld";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["billigste-bilvask-sjaelland"];

export const metadata = createSeoMetadata(page);

export default function BilligsteBilvaskSjaellandPage() {
  return (
    <>
      <JsonLd data={buildArticleJsonLd(page)} />
      <SeoLandingPage page={page} />
    </>
  );
}
