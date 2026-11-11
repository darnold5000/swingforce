import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing) return [];
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
