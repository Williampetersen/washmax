import { blogPosts } from "@/lib/blog-posts";
import { contentPagesByKind } from "@/lib/content";
import {
  addOns,
  fromKr,
  kr,
  packageOrder,
  packages,
  secondCarDiscountPercent,
  vehicleSizes,
} from "@/lib/pricing";
import { seoPages } from "@/lib/seo-pages";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const link = (title: string, path: string, note?: string) =>
  `- [${title}](${siteConfig.url}${path})${note ? `: ${note}` : ""}`;

export function GET() {
  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Facts",
    "",
    "- Service: mobil bilvask og bilpleje — vi kommer til kundens adresse (hjem eller arbejdsplads).",
    "- Dækningsområde: København, Frederiksberg, Storkøbenhavn og store dele af Sjælland.",
    "- Vand og strøm: CleanWash medbringer selv begge dele. Kunden skal ikke stille noget til rådighed.",
    `- Priser (inkl. moms): udvendig bilvask fra ${fromKr("outside")}, indvendig bilrengøring fra ${fromKr("inside")}, hele bilen med voks fra ${fromKr("whole")}.`,
    "- Betaling: efter udført vask, typisk med MobilePay. Erhvervskunder faktureres.",
    `- Rabat: bil nummer to i samme besøg får ${secondCarDiscountPercent} % rabat på grundprisen.`,
    "- Aflysning: gratis indtil 24 timer før det aftalte tidspunkt.",
    "- Booking: online på /booking med nummerpladeopslag, klar pris og valg af tidspunkt.",
    "- Åbningstider: alle ugens dage kl. 08:00-17:00.",
    `- Kontakt: ${siteConfig.phoneDisplay}, ${siteConfig.email}`,
    `- Virksomhed: ${siteConfig.legalName}, CVR ${siteConfig.vatId} (servicevirksomhed uden publikumsadresse)`,
    "- Sprog: dansk (engelske sider: /car-wash-copenhagen og /mobile-car-wash-copenhagen).",
    `- Fuldt indhold som tekst: ${siteConfig.url}/llms-full.txt`,
    "",
    "## Priser",
    "",
    "Prisen afhænger af pakke og bilens størrelse (bestemt af bilens totalvægt).",
    "",
    ...packageOrder.map(
      (id) =>
        `- ${packages[id].name} (ca. ${packages[id].minutes} min.): ` +
        vehicleSizes.map((size) => `${size.label} ${kr(packages[id].prices[size.id])}`).join(", ")
    ),
    "",
    "Tilvalg:",
    "",
    ...Object.values(addOns).map((item) => `- ${item.name}: ${kr(item.price)}`),
    "",
    "## Vigtigste sider",
    "",
    link("Book bilvask", "/booking"),
    link("Priser", "/bilvask-priser"),
    link("Om CleanWash", "/om-os"),
    link("Kontakt", "/kontakt"),
    link("Retur af leasingbil", "/retur-leasebil"),
    link("Erhvervs- og flådeaftaler", "/erhvervs-bilvask"),
    "",
    "## Ydelser og tilvalg",
    "",
    link("Alle ydelser og tilvalg", "/ydelser"),
    ...contentPagesByKind("service", "addon", "occasion").map((page) =>
      link(page.h1, `/${page.slug}`, page.description)
    ),
    "",
    "## Biltyper og bilmærker",
    "",
    link("Biltyper og bilmærker", "/biltyper"),
    ...contentPagesByKind("vehicle", "brand").map((page) => link(page.h1, `/${page.slug}`)),
    "",
    "## Erhverv",
    "",
    ...contentPagesByKind("business").map((page) =>
      link(page.h1, `/${page.slug}`, page.description)
    ),
    "",
    "## Områder",
    "",
    link("Alle serviceområder", "/serviceomraader"),
    ...contentPagesByKind("region", "area").map((page) => link(page.h1, `/${page.slug}`)),
    "",
    "## English",
    "",
    ...contentPagesByKind("english").map((page) =>
      link(page.h1, `/${page.slug}`, page.description)
    ),
    "",
    "## Øvrige sider",
    "",
    ...seoPages.map((page) => link(page.h1, `/${page.slug}`)),
    "",
    "## Blog",
    "",
    link("Alle artikler", "/blog"),
    ...blogPosts.map((post) => link(post.title, `/blog/${post.slug}`)),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
