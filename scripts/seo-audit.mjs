#!/usr/bin/env node
// SEO audit of the built site. Run `npm run build` first, then `npm run seo:audit`.
//
// Reads the prerendered HTML in .next/server/app and checks, for every indexable page:
//   - unique <title>, meta description and H1, with sensible lengths
//   - a self-referencing canonical URL
//   - valid JSON-LD
//   - internal links that point to pages that exist
//   - at least one inbound internal link (no orphans)
//   - how much of the copy is unique to the page, and near-duplicate page pairs
//
// Exits with code 1 when a hard error is found, so it can gate a deploy.

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, ".next", "server", "app");
const SITE = process.env.APP_URL || "https://cleanwash.dk";
const verbose = process.argv.includes("--verbose");

if (!fs.existsSync(appDir)) {
  console.error("No build found. Run `npm run build` first.");
  process.exit(2);
}

// ── Collect prerendered pages ────────────────────────────────────────────────
const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
})(appDir);

const toRoute = (file) => {
  let rel = path.relative(appDir, file).split(path.sep).join("/").replace(/\.html$/, "");
  if (rel === "index") return "/";
  rel = rel.replace(/\/index$/, "");
  return "/" + rel;
};

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

const stripTags = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
};

const pages = [];
for (const file of htmlFiles) {
  const route = toRoute(file);
  if (route.startsWith("/_") || route === "/404" || route === "/500") continue;
  const html = fs.readFileSync(file, "utf8");

  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const metaTags = html.match(/<meta[^>]+>/gi) || [];
  const description =
    metaTags.map((t) => (attr(t, "name") === "description" ? attr(t, "content") : null)).find(Boolean) || "";
  const robots =
    metaTags.map((t) => (attr(t, "name") === "robots" ? attr(t, "content") : null)).find(Boolean) || "";
  const linkTags = html.match(/<link[^>]+>/gi) || [];
  const canonical =
    linkTags.map((t) => (attr(t, "rel") === "canonical" ? attr(t, "href") : null)).find(Boolean) || "";

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
  const mainHtml = (html.match(/<main[\s\S]*?<\/main>/i) || [""])[0];
  const text = stripTags(mainHtml);

  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1]
  );
  const links = [...html.matchAll(/<a[^>]+href="([^"#?]+)[^"]*"/gi)]
    .map((m) => decode(m[1]))
    .filter((href) => href.startsWith("/") && !href.startsWith("//"));

  pages.push({
    route,
    title,
    description,
    robots,
    canonical,
    h1s,
    text,
    jsonLd,
    links: [...new Set(links.map((l) => (l.length > 1 ? l.replace(/\/$/, "") : l)))],
    noindex: /noindex/i.test(robots),
  });
}

const indexable = pages.filter((p) => !p.noindex);
const routeSet = new Set(pages.map((p) => p.route));

// Routes that exist but are rendered on demand (not prerendered to HTML).
const dynamicPrefixes = ["/api/", "/admin", "/agent", "/kunde/", "/invoices/", "/booking", "/min-konto", "/tak"];
const staticFiles = ["/sitemap.xml", "/robots.txt", "/llms.txt"];
const isKnown = (href) =>
  routeSet.has(href) ||
  staticFiles.includes(href) ||
  dynamicPrefixes.some((p) => href === p.replace(/\/$/, "") || href.startsWith(p)) ||
  fs.existsSync(path.join(root, "public", decodeURIComponent(href)));

const errors = [];
const warnings = [];
const err = (route, msg) => errors.push(`${route}  ${msg}`);
const warn = (route, msg) => warnings.push(`${route}  ${msg}`);

// ── Per-page checks ──────────────────────────────────────────────────────────
for (const p of indexable) {
  if (!p.title) err(p.route, "missing <title>");
  else if (p.title.length > 65) warn(p.route, `title is ${p.title.length} chars: "${p.title}"`);

  if (!p.description) err(p.route, "missing meta description");
  else if (p.description.length > 165) warn(p.route, `description is ${p.description.length} chars`);
  else if (p.description.length < 70) warn(p.route, `description is only ${p.description.length} chars`);

  if (p.h1s.length !== 1) err(p.route, `has ${p.h1s.length} <h1> elements`);

  const expected = p.route === "/" ? SITE : SITE + p.route;
  const canonical = p.canonical.replace(/\/$/, "");
  if (!canonical) err(p.route, "missing canonical");
  else if (canonical !== expected) err(p.route, `canonical points elsewhere: ${p.canonical}`);

  for (const block of p.jsonLd) {
    try {
      JSON.parse(block);
    } catch {
      err(p.route, "invalid JSON-LD");
    }
  }
  if (p.jsonLd.length === 0) warn(p.route, "no JSON-LD");

  for (const href of p.links) {
    if (!isKnown(href)) err(p.route, `broken internal link → ${href}`);
  }
}

// ── Duplicates across pages ──────────────────────────────────────────────────
const dupes = (key, label) => {
  const seen = new Map();
  for (const p of indexable) {
    const value = (key(p) || "").trim().toLowerCase();
    if (!value) continue;
    if (!seen.has(value)) seen.set(value, []);
    seen.get(value).push(p.route);
  }
  for (const [value, routes] of seen) {
    if (routes.length > 1) errors.push(`duplicate ${label} on ${routes.join(", ")}: "${value.slice(0, 80)}"`);
  }
};
dupes((p) => p.title, "title");
dupes((p) => p.description, "description");
dupes((p) => p.h1s[0], "h1");

// ── Orphans ──────────────────────────────────────────────────────────────────
const inbound = new Map(indexable.map((p) => [p.route, 0]));
for (const p of pages) {
  for (const href of p.links) {
    if (href !== p.route && inbound.has(href)) inbound.set(href, inbound.get(href) + 1);
  }
}
for (const [route, count] of inbound) {
  if (count === 0 && route !== "/") err(route, "orphan page: no internal links point to it");
}

// ── Content uniqueness ───────────────────────────────────────────────────────
// Sentences that appear on many pages (navigation, price table, steps, CTA) are
// treated as shared layout and left out. What remains is the page's own copy.
const sentencesOf = (text) =>
  text
    .split(/(?<=[.!?:])\s+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.split(" ").length >= 6);

const sentenceCount = new Map();
const pageSentences = new Map();
for (const p of indexable) {
  const set = new Set(sentencesOf(p.text));
  pageSentences.set(p.route, set);
  for (const s of set) sentenceCount.set(s, (sentenceCount.get(s) || 0) + 1);
}

const stats = [];
for (const p of indexable) {
  const set = pageSentences.get(p.route);
  let own = 0;
  let shared = 0;
  let ownWords = 0;
  for (const s of set) {
    if (sentenceCount.get(s) === 1) {
      own++;
      ownWords += s.split(" ").length;
    } else shared++;
  }
  stats.push({
    route: p.route,
    words: p.text.split(" ").length,
    ownWords,
    ownShare: set.size ? own / set.size : 0,
  });
}

// Content pages are expected to carry a real amount of copy of their own.
const utility = new Set(["/", "/blog", "/serviceomraader", "/ydelser", "/biltyper", "/kontakt"]);
for (const s of stats) {
  if (utility.has(s.route)) continue;
  if (s.ownWords < 200) warn(s.route, `only ${s.ownWords} words of copy unique to this page`);
}

// Near-duplicates: pairs of pages that share a large part of their own sentences.
const meaningful = new Map();
for (const [route, set] of pageSentences) {
  // Ignore layout sentences that appear on more than 5% of the pages.
  const limit = Math.max(8, Math.round(indexable.length * 0.05));
  meaningful.set(route, new Set([...set].filter((s) => sentenceCount.get(s) <= limit)));
}
const routes = [...meaningful.keys()];
const pairs = [];
for (let i = 0; i < routes.length; i++) {
  const a = meaningful.get(routes[i]);
  if (a.size < 5) continue;
  for (let j = i + 1; j < routes.length; j++) {
    const b = meaningful.get(routes[j]);
    if (b.size < 5) continue;
    let common = 0;
    for (const s of a) if (b.has(s)) common++;
    const overlap = common / Math.min(a.size, b.size);
    if (overlap >= 0.25) pairs.push({ a: routes[i], b: routes[j], overlap });
  }
}
pairs.sort((x, y) => y.overlap - x.overlap);
for (const pair of pairs) {
  const msg = `${pair.a} and ${pair.b} share ${(pair.overlap * 100).toFixed(0)}% of their sentences`;
  if (pair.overlap >= 0.5) errors.push(`near-duplicate: ${msg}`);
  else warnings.push(`similar: ${msg}`);
}

// ── Report ───────────────────────────────────────────────────────────────────
const total = stats.reduce((sum, s) => sum + s.words, 0);
const totalOwn = stats.reduce((sum, s) => sum + s.ownWords, 0);
const sorted = [...stats].sort((a, b) => a.ownWords - b.ownWords);

console.log(`Pages built:           ${pages.length}`);
console.log(`Indexable pages:       ${indexable.length}`);
console.log(`Words in main content: ${total.toLocaleString("en")}`);
console.log(`Words unique to one page: ${totalOwn.toLocaleString("en")}`);
console.log(
  `Median unique words per page: ${sorted[Math.floor(sorted.length / 2)]?.ownWords ?? 0}`
);
console.log(`Near-duplicate pairs (≥50%): ${pairs.filter((p) => p.overlap >= 0.5).length}`);
console.log(`Similar pairs (25–50%):      ${pairs.filter((p) => p.overlap < 0.5).length}`);

if (verbose) {
  console.log("\nLeast unique pages:");
  for (const s of sorted.slice(0, 25)) {
    console.log(`  ${String(s.ownWords).padStart(5)} own words  ${(s.ownShare * 100).toFixed(0).padStart(3)}%  ${s.route}`);
  }
}

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings.slice(0, verbose ? 500 : 40)) console.log("  - " + w);
  if (!verbose && warnings.length > 40) console.log(`  … ${warnings.length - 40} more (use --verbose)`);
}

if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const e of errors.slice(0, verbose ? 500 : 60)) console.log("  ✗ " + e);
  process.exit(1);
}

console.log("\n✓ No errors.");
