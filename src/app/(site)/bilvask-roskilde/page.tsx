import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-roskilde"];

export const metadata = createSeoMetadata(page);

export default function BilvaskRoskildePage() {
  return <SeoLandingPage page={page} />;
}
