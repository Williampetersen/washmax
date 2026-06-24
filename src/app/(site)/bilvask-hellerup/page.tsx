import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-hellerup"];

export const metadata = createSeoMetadata(page);

export default function BilvaskHellerupPage() {
  return <SeoLandingPage page={page} />;
}
