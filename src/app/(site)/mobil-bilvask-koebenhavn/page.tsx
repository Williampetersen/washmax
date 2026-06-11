import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["mobil-bilvask-koebenhavn"];

export const metadata = createSeoMetadata(page);

export default function MobilBilvaskKoebenhavnPage() {
  return <SeoLandingPage page={page} />;
}
