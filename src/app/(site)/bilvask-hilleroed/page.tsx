import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-hilleroed"];

export const metadata = createSeoMetadata(page);

export default function BilvaskHilleroedPage() {
  return <SeoLandingPage page={page} />;
}
