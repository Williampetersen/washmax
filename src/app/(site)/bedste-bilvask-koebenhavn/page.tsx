import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { buildArticleJsonLd, JsonLd } from "@/components/seo/json-ld";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bedste-bilvask-koebenhavn"];

export const metadata = createSeoMetadata(page);

export default function BedsteBilvaskKoebenhavnPage() {
  return (
    <>
      <JsonLd data={buildArticleJsonLd(page)} />
      <SeoLandingPage page={page} />
    </>
  );
}
