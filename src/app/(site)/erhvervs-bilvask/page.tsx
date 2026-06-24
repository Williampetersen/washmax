import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["erhvervs-bilvask"];

export const metadata = createSeoMetadata(page);

export default function ErhvervsBilvaskPage() {
  return <SeoLandingPage page={page} />;
}
