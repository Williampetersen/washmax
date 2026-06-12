import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["polering-bil-koebenhavn"];

export const metadata = createSeoMetadata(page);

export default function PoleringBilKoebenhavnPage() {
  return <SeoLandingPage page={page} />;
}
