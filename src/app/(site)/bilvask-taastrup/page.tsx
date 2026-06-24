import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-taastrup"];

export const metadata = createSeoMetadata(page);

export default function BilvaskTaastrupPage() {
  return <SeoLandingPage page={page} />;
}
