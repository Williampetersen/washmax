import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["haandvask-bil-koebenhavn"];

export const metadata = createSeoMetadata(page);

export default function HaandvaskBilKoebenhavnPage() {
  return <SeoLandingPage page={page} />;
}
