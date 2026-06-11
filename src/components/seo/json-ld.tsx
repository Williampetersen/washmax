import { absoluteUrl, type SeoPageConfig } from "@/lib/seo-pages";
import { siteConfig } from "@/lib/site";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | {
      [key: string]: JsonValue;
    };

export function JsonLd({ data }: { data: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function buildSeoJsonLd(page: SeoPageConfig) {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  const businessId = `${siteConfig.url}#localbusiness`;
  const serviceId = `${pageUrl}#service`;
  const faqId = `${pageUrl}#faq`;

  const localBusiness = {
    "@type": ["AutoWash", "LocalBusiness"],
    "@id": businessId,
    name: "Clean Wash",
    alternateName: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    openingHours: "Mo-Su 08:00-17:00",
    areaServed: page.schemaAreaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/booking"),
      name: "Book bilvask online",
    },
    // TODO: Add postalAddress when Clean Wash has a confirmed public business address.
  };

  const service = {
    "@type": "Service",
    "@id": serviceId,
    name: page.serviceType,
    serviceType: page.serviceType,
    description: page.description,
    url: pageUrl,
    provider: {
      "@id": businessId,
    },
    areaServed: page.schemaAreaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/booking"),
      name: "Book bilvask hos Clean Wash",
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: pageUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, service, faqPage, breadcrumbList],
  };
}
