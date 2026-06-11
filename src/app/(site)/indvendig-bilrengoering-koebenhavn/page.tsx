import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["indvendig-bilrengoering-koebenhavn"];

export const metadata = createSeoMetadata(page);

export default function IndvendigBilrengoeringKoebenhavnPage() {
  return <SeoLandingPage page={page} />;
}
