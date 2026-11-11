import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (allowIndexing) {
    return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
  }
  return { rules: { userAgent: "*", disallow: "/" } };
}
