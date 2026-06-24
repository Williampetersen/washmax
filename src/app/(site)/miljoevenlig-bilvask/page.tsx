import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["miljoevenlig-bilvask"];

export const metadata = createSeoMetadata(page);

export default function MiljoevenligBilvaskPage() {
  return <SeoLandingPage page={page} />;
}
