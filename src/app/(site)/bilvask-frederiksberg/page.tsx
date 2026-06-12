import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-frederiksberg"];

export const metadata = createSeoMetadata(page);

export default function BilvaskFrederiksbergPage() {
  return <SeoLandingPage page={page} />;
}
