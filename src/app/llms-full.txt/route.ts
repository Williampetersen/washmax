import { blogPosts } from "@/lib/blog-posts";
import { contentPages } from "@/lib/content";
import { addOns, kr, packageOrder, packages, secondCarDiscountPercent, vehicleSizes } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

// Full-text companion to /llms.txt: the complete copy of the service pages and
// guides as plain Markdown, so AI assistants can quote facts without parsing HTML.
export function GET() {
  const lines: string[] = [
    `# ${siteConfig.name} – fuldt indhold`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Fakta",
    "",
    "- CleanWash er en mobil bilvask, der kommer til kundens adresse i København, Storkøbenhavn og store dele af Sjælland.",
    "- CleanWash medbringer selv vand og strøm. Kunden skal ikke stille noget til rådighed.",
    "- Betaling sker efter udført vask, typisk med MobilePay. Erhvervskunder faktureres.",
    `- Bil nummer to i samme besøg får ${secondCarDiscountPercent} % rabat på grundprisen.`,
    "- Aflysning er gratis indtil 24 timer før det aftalte tidspunkt.",
    `- Kontakt: ${siteConfig.phoneDisplay}, ${siteConfig.email}. CVR ${siteConfig.vatId}.`,
    `- Booking: ${siteConfig.url}/booking`,
    "",
    "## Priser (inkl. moms)",
    "",
    ...packageOrder.map(
      (id) =>
        `- ${packages[id].name} (ca. ${packages[id].minutes} min.): ` +
        vehicleSizes.map((size) => `${size.label} ${kr(packages[id].prices[size.id])}`).join(", ")
    ),
    "",
    "Tilvalg:",
    "",
    ...Object.values(addOns).map((item) => `- ${item.name}: ${kr(item.price)} – ${item.text}`),
    "",
  ];

  for (const page of contentPages) {
    lines.push(`## ${page.h1}`, "", `URL: ${siteConfig.url}/${page.slug}`, "", page.answer, "", page.intro, "");
    for (const section of page.sections) {
      lines.push(`### ${section.h}`, "", ...section.p.flatMap((p) => [p, ""]));
      if (section.list) lines.push(...section.list.map((item) => `- ${item}`), "");
    }
    for (const faq of page.faqs) lines.push(`**${faq.q}**`, "", faq.a, "");
  }

  for (const post of blogPosts) {
    lines.push(`## ${post.title}`, "", `URL: ${siteConfig.url}/blog/${post.slug}`, "", ...post.intro.flatMap((p) => [p, ""]));
    lines.push(...post.keyTakeaways.map((item) => `- ${item}`), "");
    for (const section of post.sections) {
      lines.push(`### ${section.heading}`, "", ...section.paragraphs.flatMap((p) => [p, ""]));
    }
    for (const faq of post.faqs) lines.push(`**${faq.question}**`, "", faq.answer, "");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
