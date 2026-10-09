import { blogPosts } from "@/lib/blog-posts";
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
    "- Priser: Udvendig vask fra 349 kr, komplet bilvask fra 599 kr, premium bilpleje fra 849 kr.",
    "- Booking: online på /booking med nummerpladeopslag, klar pris og valg af tidspunkt.",
    "- Åbningstider: alle ugens dage kl. 08:00-17:00.",
    `- Kontakt: ${siteConfig.phoneDisplay}, ${siteConfig.email}`,
    `- Virksomhed: ${siteConfig.legalName}, CVR ${siteConfig.vatId} (servicevirksomhed uden publikumsadresse)`,
    "- Sprog: dansk (engelsk side: /car-wash-copenhagen).",
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
    "## Services og områder",
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
