import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-lyngby"];

export const metadata = createSeoMetadata(page);

export default function BilvaskLyngbyPage() {
  return <SeoLandingPage page={page} />;
}
