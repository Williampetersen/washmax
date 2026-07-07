import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-slagelse"];

export const metadata = createSeoMetadata(page);

export default function BilvaskSlagelsePage() {
  return <SeoLandingPage page={page} />;
}
