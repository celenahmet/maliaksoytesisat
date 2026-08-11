import { notFound, permanentRedirect, redirect } from "next/navigation";
import { legacyServiceSlugs } from "../hizmetler/service-data";

const sectionRedirects: Record<string, string> = {
  hizmetler: "/#hizmetler",
  iletisim: "/#iletisim",
  guvence: "/#guvence",
  "calisma-ve-guvence": "/#guvence",
  "nasil-calisir": "/#nasil",
};

export default async function LegacyRedirectPage({ params }: { params: Promise<{ legacy: string }> }) {
  const { legacy } = await params;

  if (legacy === "404" || legacy === "error") redirect("/error/404");

  const sectionTarget = sectionRedirects[legacy];
  if (sectionTarget) permanentRedirect(sectionTarget);

  const serviceTarget = legacyServiceSlugs[legacy] ?? (legacy === "elektrik-ariza-tespit" || legacy === "kucuk-ev-aletleri-tamiri" || legacy === "kombi-bakimi-petek-temizligi" || legacy === "su-tesisati-tamiri" ? legacy : undefined);
  if (serviceTarget) permanentRedirect(`/hizmetler/${serviceTarget}`);

  notFound();
}
