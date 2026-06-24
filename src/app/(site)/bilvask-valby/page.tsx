import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-valby"];

export const metadata = createSeoMetadata(page);

export default function BilvaskValbyPage() {
  return <SeoLandingPage page={page} />;
}
