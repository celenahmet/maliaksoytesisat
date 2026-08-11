import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://maliaksoy.test${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("M. Ali Aksoy ana sayfasını ve iletişim akışını sunar", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="tr"/i);
  assert.match(html, /<title>Ankara Teknik Servis \| M\. Ali Aksoy/iu);
  assert.match(html, /<meta[^>]+name="description"/i);
  assert.match(html, /Küçük Ev Aletleri/);
  assert.match(html, /Kombi &amp; Petek/);
  assert.match(html, /Su Tesisatı/);
  assert.match(html, /905318390668/);
  assert.match(html, /FİYAT AL/);
  assert.match(html, /kare-efekt\.webp/);
  assert.match(html, /assets\/cards\/01\.webp/);
  assert.match(html, /assets\/cards\/04\.webp/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /HomeAndConstructionBusiness/);
  assert.match(html, /bilgi@maliaksoy\.com/);
  assert.match(html, /Arızanız beklemez/);
  assert.match(html, /Anasayfa/);
  assert.match(html, /Çalışma ve Güvence/);
  assert.doesNotMatch(html, /Nasıl çalışır\?/i);
  assert.match(html, /M\. Ali Aksoy Servis Asistanı/);
  assert.match(html, /hizmet kategorisini seçin/);
  assert.match(html, /Sincan \/ Ankara/);
  assert.match(html, /Ankara genelinde yerinde servis/);
  assert.match(html, /Tüm Hakları Saklıdır/);
  assert.doesNotMatch(html, /Kurumsal/);
  assert.doesNotMatch(html, /UstaFix|USTAFIX/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /₺|\bTL\b/);
});

for (const [slug, expected] of [
  ["elektronik-tamir", "Ankara Elektronik Arıza ve Tamir Servisi"],
  ["kucuk-ev-aletleri-tamiri", "Ankara Küçük Ev Aletleri Tamir Servisi"],
  ["kombi-bakimi-petek-temizligi", "Ankara Kombi Bakımı ve Petek Temizliği"],
  ["su-tesisati-tamiri", "Ankara Su Tesisatı Tamir ve Bakım Servisi"],
]) {
  test(`${slug} hizmet sayfası indekslenebilir içerik sunar`, async () => {
    const response = await render(`/hizmetler/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(expected));
    assert.match(html, /BreadcrumbList/);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /Sincan merkezli/);
    assert.match(html, /WhatsApp/i);
  });
}

test("bilinmeyen adres ve /error/404 gerçek 404 yanıtı verir", async () => {
  for (const pathname of ["/olmayan-sayfa", "/error/404"]) {
    const response = await render(pathname);
    assert.equal(response.status, 404);
    const html = await response.text();
    assert.match(html, /SAYFA BULUNAMADI/);
    assert.match(html, /name="robots" content="noindex"/i);
    assert.match(html, /ANA SAYFAYA DÖN/);
  }
});

for (const [legacyPath, canonicalPath] of [
  ["/elektronik-tamir", "/hizmetler/elektronik-tamir"],
  ["/kombi-bakimi", "/hizmetler/kombi-bakimi-petek-temizligi"],
  ["/petek-temizligi", "/hizmetler/kombi-bakimi-petek-temizligi"],
  ["/su-tesisati", "/hizmetler/su-tesisati-tamiri"],
  ["/hizmetler/su-kacagi", "/hizmetler/su-tesisati-tamiri"],
]) {
  test(`${legacyPath} canonical adrese kalıcı yönlenir`, async () => {
    const response = await render(legacyPath);
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get("location"), "https://maliaksoy.test").pathname, canonicalPath);
  });
}
