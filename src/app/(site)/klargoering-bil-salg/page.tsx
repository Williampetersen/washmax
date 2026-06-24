import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["klargoering-bil-salg"];

export const metadata = createSeoMetadata(page);

export default function KlargoeringBilSalgPage() {
  return <SeoLandingPage page={page} />;
}
