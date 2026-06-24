import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-amager"];

export const metadata = createSeoMetadata(page);

export default function BilvaskAmagerPage() {
  return <SeoLandingPage page={page} />;
}
