#!/usr/bin/env node
// Tells IndexNow-enabled search engines (Bing, Yandex, Seznam, Naver, Yep) which
// URLs are new or changed, so they are crawled right away instead of days later.
// Bing's index also feeds Copilot and ChatGPT search.
//
// Run after a deploy:  npm run seo:indexnow
// Only changed URLs:   npm run seo:indexnow -- /bilvask-hjemme /blog/pollen-paa-bilen
//
// The key below is public by design: it is served at https://<site>/<key>.txt
// (public/<key>.txt) so the search engines can verify we own the site.

const SITE = (process.env.APP_URL || "https://cleanwash.dk").replace(/\/$/, "");
const KEY = "16457a7f06a38673e05962a9d07f6391";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const host = new URL(SITE).host;
const keyLocation = `${SITE}/${KEY}.txt`;

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not read sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const dryRun = process.argv.includes("--dry-run");

  // The key file must be live before submitting, otherwise the request is rejected.
  const keyRes = await fetch(keyLocation);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (keyBody !== KEY) {
    throw new Error(
      `Key file not live at ${keyLocation} (HTTP ${keyRes.status}). Deploy first, then run this again.`
    );
  }

  const urlList = args.length
    ? args.map((a) => (a.startsWith("http") ? a : `${SITE}${a.startsWith("/") ? a : `/${a}`}`))
    : await sitemapUrls();

  console.log(`Submitting ${urlList.length} URLs for ${host} to IndexNow…`);
  if (dryRun) {
    console.log(urlList.join("\n"));
    return;
  }

  // IndexNow accepts up to 10,000 URLs per request.
  for (let i = 0; i < urlList.length; i += 10000) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: KEY, keyLocation, urlList: urlList.slice(i, i + 10000) }),
    });
    // 200 = accepted, 202 = accepted and key validation pending.
    if (res.status !== 200 && res.status !== 202) {
      throw new Error(`IndexNow rejected the request: HTTP ${res.status} ${await res.text()}`);
    }
    console.log(`✓ Accepted (HTTP ${res.status})`);
  }
}

main().catch((error) => {
  console.error(error.message);
  // Set the exit code instead of calling process.exit(): exiting while fetch
  // sockets are still closing trips a libuv assertion on Windows.
  process.exitCode = 1;
});
