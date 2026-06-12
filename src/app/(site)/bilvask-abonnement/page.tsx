import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { createSeoMetadata, seoPagesBySlug } from "@/lib/seo-pages";

const page = seoPagesBySlug["bilvask-abonnement"];

export const metadata = createSeoMetadata(page);

export default function BilvaskAbonnementPage() {
  return <SeoLandingPage page={page} />;
}
