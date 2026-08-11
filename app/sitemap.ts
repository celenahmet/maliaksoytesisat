import type { MetadataRoute } from "next";
import { servicePages } from "./hizmetler/service-data";
import { SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-11");
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...servicePages.map((service) => ({
      url: `${SITE_URL}/hizmetler/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
