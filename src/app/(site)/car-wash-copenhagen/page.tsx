import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["car-wash-copenhagen"];

export const metadata = createSeoMetadata(page);

export default function CarWashCopenhagenPage() {
  return <SeoLandingPage page={page} />;
}
