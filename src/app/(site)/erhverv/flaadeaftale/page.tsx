import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["erhverv/flaadeaftale"];

export const metadata = createSeoMetadata(page);

export default function ErhvervFlaadeaftalePage() {
  return <SeoLandingPage page={page} />;
}
