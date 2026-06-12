import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-hvidovre"];

export const metadata = createSeoMetadata(page);

export default function BilvaskHvidovrePage() {
  return <SeoLandingPage page={page} />;
}
