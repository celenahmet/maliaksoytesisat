import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://ustafix.test/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("UstaFix ana sayfasını ve iletişim akışını sunar", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="tr"/i);
  assert.match(html, /<title>UstaFix \| Teknik Servis, Bakım ve Tesisat<\/title>/i);
  assert.match(html, /Arızayı değil/);
  assert.match(html, /Küçük ev aletleri/);
  assert.match(html, /Kombi &amp; petek/i);
  assert.match(html, /Su tesisatı/);
  assert.match(html, /905318390668/);
  assert.match(html, /FİYAT AL/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /₺|\bTL\b/);
});
