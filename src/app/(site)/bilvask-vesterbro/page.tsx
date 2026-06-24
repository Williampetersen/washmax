import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-vesterbro"];

export const metadata = createSeoMetadata(page);

export default function BilvaskVesterbroPage() {
  return <SeoLandingPage page={page} />;
}
