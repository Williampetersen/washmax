#!/usr/bin/env node
// Fast content check that does not need a build:  npm run seo:check
//
// Loads the page registries straight from the TypeScript sources and verifies that
//   - every slug is unique and every internal link points to a page that exists
//   - titles and descriptions are unique and have sensible lengths
//   - no two pages share a meaningful part of their copy
// It also prints how many pages and words each section of the site has.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const require = createRequire(path.join(root, "package.json"));
const ts = require("typescript");
const verbose = process.argv.includes("--verbose");

// ── Transpile the data modules into a temp folder so Node can import them ────
const srcDir = path.join(root, "src");
const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "cleanwash-content-"));
const files = [
  "lib/site.ts",
  "lib/pricing.ts",
  "lib/seo-pages.ts",
  "lib/blog-posts.ts",
  ...fs
    .readdirSync(path.join(srcDir, "lib"))
    .filter((f) => /^blog-posts-.*\.ts$/.test(f))
    .map((f) => `lib/${f}`),
  ...fs
    .readdirSync(path.join(srcDir, "lib", "content"))
    .filter((f) => f.endsWith(".ts") && f !== "links.ts" && f !== "metadata.ts")
    .map((f) => `lib/content/${f}`),
];

for (const rel of files) {
  const source = fs.readFileSync(path.join(srcDir, rel), "utf8");
  let { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      isolatedModules: true,
      verbatimModuleSyntax: false,
    },
  });
  const fromDir = path.dirname(path.join(outDir, rel));
  outputText = outputText.replace(/from\s+["']([^"']+)["']/g, (match, spec) => {
    let target;
    if (spec.startsWith("@/")) target = path.join(outDir, spec.slice(2));
    else if (spec.startsWith(".")) target = path.resolve(fromDir, spec);
    else return match;
    let relPath = path.relative(fromDir, target).split(path.sep).join("/");
    if (!relPath.startsWith(".")) relPath = "./" + relPath;
    return `from "${relPath}.mjs"`;
  });
  const outFile = path.join(outDir, rel.replace(/\.ts$/, ".mjs"));
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, outputText);
}

const load = (rel) => import(pathToFileURL(path.join(outDir, rel)).href);
const { seoPages } = await load("lib/seo-pages.mjs");
const { blogPosts } = await load("lib/blog-posts.mjs");
const { contentPages } = await load("lib/content/index.mjs");
fs.rmSync(outDir, { recursive: true, force: true });

// ── Known routes ─────────────────────────────────────────────────────────────
const siteDir = path.join(srcDir, "app", "(site)");
const physical = new Set(["/"]);
(function walk(dir, prefix) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("[")) continue;
    const route = `${prefix}/${entry.name}`;
    if (fs.existsSync(path.join(dir, entry.name, "page.tsx"))) physical.add(route);
    walk(path.join(dir, entry.name), route);
  }
})(siteDir, "");

const routes = new Set(physical);
for (const p of seoPages) routes.add(`/${p.slug}`);
for (const p of contentPages) routes.add(`/${p.slug}`);
for (const p of blogPosts) routes.add(`/blog/${p.slug}`);

const errors = [];
const warnings = [];

// ── Slugs ────────────────────────────────────────────────────────────────────
const slugOwners = new Map();
const claim = (slug, owner) => {
  if (slugOwners.has(slug)) errors.push(`slug "${slug}" is defined twice (${slugOwners.get(slug)} and ${owner})`);
  slugOwners.set(slug, owner);
};
for (const p of seoPages) claim(p.slug, "seo-pages");
for (const p of contentPages) claim(p.slug, "content");
const blogSlugs = new Set();
for (const p of blogPosts) {
  if (blogSlugs.has(p.slug)) errors.push(`blog slug "${p.slug}" is defined twice`);
  blogSlugs.add(p.slug);
}
for (const p of contentPages) {
  if (!/^[a-z0-9-]+$/.test(p.slug)) errors.push(`/${p.slug}: slug has characters outside a-z, 0-9 and "-"`);
}

// ── Links ────────────────────────────────────────────────────────────────────
const checkLink = (from, href) => {
  if (!routes.has(href)) errors.push(`${from}: link to missing page ${href}`);
};
for (const p of contentPages) {
  for (const href of p.related) checkLink(`/${p.slug}`, href);
  if (new Set(p.related).size !== p.related.length) warnings.push(`/${p.slug}: repeated related link`);
  if (p.related.includes(`/${p.slug}`)) errors.push(`/${p.slug}: links to itself`);
}
for (const p of seoPages) for (const l of p.relatedLinks) checkLink(`/${p.slug}`, String(l.href));
for (const p of blogPosts) {
  for (const l of p.relatedLinks) checkLink(`/blog/${p.slug}`, String(l.href));
  for (const slug of p.relatedPosts) {
    if (!blogSlugs.has(slug)) errors.push(`/blog/${p.slug}: related post "${slug}" does not exist`);
  }
}

// Area names in "nearby" that have no page of their own are shown as plain text.
const areaNames = new Set(contentPages.filter((p) => p.area).map((p) => p.area.name));
const legacyAreas = [
  "København", "Frederiksberg", "Amager", "Østerbro", "Nørrebro", "Vesterbro", "Valby", "Hellerup",
  "Hvidovre", "Lyngby", "Roskilde", "Køge", "Taastrup", "Hillerød", "Hørsholm", "Helsingør", "Næstved",
  "Slagelse", "Sjælland",
];
for (const name of legacyAreas) areaNames.add(name);
for (const p of contentPages) {
  for (const name of p.area?.nearby ?? []) {
    if (!areaNames.has(name)) warnings.push(`/${p.slug}: nearby area "${name}" has no page`);
  }
}

// ── Titles and descriptions ──────────────────────────────────────────────────
const BRAND = " | CleanWash";
const entries = [
  ...contentPages.map((p) => ({ route: `/${p.slug}`, title: p.title + BRAND, description: p.description, h1: p.h1 })),
  ...blogPosts.map((p) => ({ route: `/blog/${p.slug}`, title: p.metaTitle + BRAND, description: p.description, h1: p.title })),
  ...seoPages.map((p) => ({
    route: `/${p.slug}`,
    title: p.title.includes("CleanWash") ? p.title : p.title + BRAND,
    description: p.description,
    h1: p.h1,
    legacy: true,
  })),
];
const unique = (key, label) => {
  const seen = new Map();
  for (const e of entries) {
    const value = e[key].trim().toLowerCase();
    if (seen.has(value)) errors.push(`duplicate ${label}: ${seen.get(value)} and ${e.route} ("${e[key].slice(0, 70)}")`);
    seen.set(value, e.route);
  }
};
unique("title", "title");
unique("description", "description");
unique("h1", "h1");
for (const e of entries) {
  if (e.legacy) continue;
  if (e.title.length > 62) warnings.push(`${e.route}: title is ${e.title.length} chars`);
  if (e.description.length > 160) warnings.push(`${e.route}: description is ${e.description.length} chars`);
  if (e.description.length < 110) warnings.push(`${e.route}: description is only ${e.description.length} chars`);
}

// ── Copy: word counts and overlap between pages ──────────────────────────────
const copyOf = {
  content: (p) => [p.intro, p.answer, ...p.sections.flatMap((s) => [s.h, ...s.p, ...(s.list ?? [])]), ...p.faqs.flatMap((f) => [f.q, f.a])],
  blog: (p) => [...p.intro, ...p.keyTakeaways, ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs]), ...p.faqs.flatMap((f) => [f.question, f.answer])],
  seo: (p) => [p.heroIntro, ...p.shortSummary, ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs]), ...p.faqs.flatMap((f) => [f.question, f.answer]), ...p.benefits.map((b) => b.text)],
};
const docs = [
  ...contentPages.map((p) => ({ route: `/${p.slug}`, group: p.kind, parts: copyOf.content(p) })),
  ...blogPosts.map((p) => ({ route: `/blog/${p.slug}`, group: "blog", parts: copyOf.blog(p) })),
  ...seoPages.map((p) => ({ route: `/${p.slug}`, group: "legacy", parts: copyOf.seo(p) })),
];
const words = (s) => s.split(/\s+/).filter(Boolean).length;
const sentences = (parts) =>
  parts
    .flatMap((part) => part.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim().toLowerCase())
    .filter((s) => words(s) >= 5);

const sentenceUse = new Map();
for (const d of docs) {
  d.words = d.parts.reduce((sum, part) => sum + words(part), 0);
  d.sentences = new Set(sentences(d.parts));
  for (const s of d.sentences) sentenceUse.set(s, (sentenceUse.get(s) || 0) + 1);
}

// A sentence that is used word for word on several pages is worth knowing about.
const repeated = [...sentenceUse.entries()].filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1]);

const pairs = [];
for (let i = 0; i < docs.length; i++) {
  for (let j = i + 1; j < docs.length; j++) {
    const a = docs[i].sentences;
    const b = docs[j].sentences;
    let common = 0;
    for (const s of a) if (b.has(s)) common++;
    const overlap = common / Math.max(1, Math.min(a.size, b.size));
    if (overlap >= 0.15) pairs.push({ a: docs[i].route, b: docs[j].route, overlap, common });
  }
}
pairs.sort((x, y) => y.overlap - x.overlap);
for (const pair of pairs) {
  const msg = `${pair.a} and ${pair.b} share ${pair.common} sentences (${(pair.overlap * 100).toFixed(0)}%)`;
  if (pair.overlap >= 0.4) errors.push(`near-duplicate copy: ${msg}`);
  else warnings.push(`similar copy: ${msg}`);
}
for (const d of docs) {
  if (d.group !== "legacy" && d.words < 300) warnings.push(`${d.route}: only ${d.words} words of copy`);
}

// ── Report ───────────────────────────────────────────────────────────────────
const groups = new Map();
for (const d of docs) {
  const g = groups.get(d.group) ?? { pages: 0, words: 0 };
  g.pages++;
  g.words += d.words;
  groups.set(d.group, g);
}
console.log("Section      Pages   Words   Avg");
for (const [name, g] of groups) {
  console.log(
    `${name.padEnd(12)} ${String(g.pages).padStart(5)} ${String(g.words).padStart(7)} ${String(Math.round(g.words / g.pages)).padStart(5)}`
  );
}
const newDocs = docs.filter((d) => d.group !== "legacy");
console.log(`\nPages in registries: ${docs.length} (${contentPages.length} content, ${blogPosts.length} blog, ${seoPages.length} legacy)`);
console.log(`Words of copy:       ${docs.reduce((s, d) => s + d.words, 0).toLocaleString("en")}`);
console.log(`Sentences used on 4+ pages: ${repeated.length}`);
if (verbose) {
  for (const [s, n] of repeated.slice(0, 30)) console.log(`  ${n}×  ${s.slice(0, 110)}`);
  const shortest = [...newDocs].sort((a, b) => a.words - b.words).slice(0, 15);
  console.log("\nShortest pages:");
  for (const d of shortest) console.log(`  ${String(d.words).padStart(5)}  ${d.route}`);
}

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings.slice(0, verbose ? 500 : 30)) console.log("  - " + w);
  if (!verbose && warnings.length > 30) console.log(`  … ${warnings.length - 30} more (use --verbose)`);
}
if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const e of errors.slice(0, verbose ? 500 : 80)) console.log("  ✗ " + e);
  process.exit(1);
}
console.log("\n✓ Content check passed.");
