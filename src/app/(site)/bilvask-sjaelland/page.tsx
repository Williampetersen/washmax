import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-sjaelland"];

export const metadata = createSeoMetadata(page);

export default function BilvaskSjaellandPage() {
  return <SeoLandingPage page={page} />;
}
