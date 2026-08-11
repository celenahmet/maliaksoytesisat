import assert from "node:assert/strict";
const auditBase = (process.argv[2] ?? "http://localhost:3001").replace(/\/$/, "");
const canonicalOrigin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://maliaksoytesisat.vercel.app").replace(/\/$/, "");
const sitemapResponse = await fetch(`${auditBase}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200, "sitemap.xml alınamadı");
const sitemap = await sitemapResponse.text();
const productionUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const auditUrls = productionUrls.map((url) => `${auditBase}${new URL(url).pathname}`);
const failures = [];
const internalLinks = new Set();

function verify(condition, message) {
  if (!condition) failures.push(message);
}

for (const url of auditUrls) {
  const response = await fetch(url, { redirect: "manual", headers: { accept: "text/html" } });
  const html = await response.text();
  const pathname = new URL(url).pathname;

  verify(response.status === 200, `${pathname}: HTTP ${response.status}`);
  verify(/<html[^>]+lang="tr"/i.test(html), `${pathname}: html lang eksik`);
  verify(/<title>[^<]{20,65}<\/title>/i.test(html), `${pathname}: uygun title eksik`);
  verify(/<meta[^>]+name="description"[^>]+content="[^"]{80,170}"/i.test(html) || /<meta[^>]+content="[^"]{80,170}"[^>]+name="description"/i.test(html), `${pathname}: uygun meta description eksik`);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i)?.[1];
  verify(Boolean(canonical), `${pathname}: canonical eksik`);
  verify(Boolean(canonical && new URL(canonical).origin === canonicalOrigin), `${pathname}: canonical alan adı yanlış`);
  verify(/<h1[\s>]/i.test(html), `${pathname}: H1 eksik`);
  verify(!/name="robots" content="noindex/i.test(html), `${pathname}: yanlışlıkla noindex`);
  verify(/application\/ld\+json/i.test(html), `${pathname}: yapılandırılmış veri eksik`);

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (href.startsWith("/") && !href.startsWith("//")) internalLinks.add(new URL(href, auditBase).pathname);
  }
}

for (const pathname of internalLinks) {
  const response = await fetch(`${auditBase}${pathname}`, { redirect: "manual" });
  verify(response.status < 400, `İç bağlantı bozuk: ${pathname} (${response.status})`);
}

for (const requiredPath of ["/robots.txt", "/sitemap.xml", "/site.webmanifest", "/favicon.ico"]) {
  const response = await fetch(`${auditBase}${requiredPath}`, { redirect: "manual" });
  verify(response.status === 200, `${requiredPath}: HTTP ${response.status}`);
}

for (const notFoundPath of ["/error/404", "/seo-denetimi-olmayan-sayfa"]) {
  const response = await fetch(`${auditBase}${notFoundPath}`, { redirect: "manual", headers: { accept: "text/html" } });
  const html = await response.text();
  verify(response.status === 404, `${notFoundPath}: 404 yerine ${response.status}`);
  verify(/name="robots" content="noindex/i.test(html), `${notFoundPath}: noindex eksik`);
}

const redirectResponse = await fetch(`${auditBase}/kombi-bakimi`, { redirect: "manual" });
verify(redirectResponse.status === 308, `/kombi-bakimi: 308 yerine ${redirectResponse.status}`);
verify(new URL(redirectResponse.headers.get("location"), auditBase).pathname === "/hizmetler/kombi-bakimi-petek-temizligi", "/kombi-bakimi: yönlendirme hedefi yanlış");

assert.equal(failures.length, 0, `SEO denetimi başarısız:\n- ${failures.join("\n- ")}`);
console.log(`SEO denetimi başarılı: ${auditUrls.length} indekslenebilir sayfa, ${internalLinks.size} iç bağlantı, hata ve yönlendirme kontrolleri geçti.`);
