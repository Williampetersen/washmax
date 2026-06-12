import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["express-bilvask"];

export const metadata = createSeoMetadata(page);

export default function ExpressBilvaskPage() {
  return <SeoLandingPage page={page} />;
}
