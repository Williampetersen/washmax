import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["billig-bilvask-koebenhavn"];

export const metadata = createSeoMetadata(page);

export default function BilligBilvaskKoebenhavnPage() {
  return <SeoLandingPage page={page} />;
}
