import type { Metadata } from "next";
import { allowIndexing, site } from "@/lib/site";

const robots: Metadata["robots"] = allowIndexing
  ? { index: true, follow: true }
  : { index: false, follow: false, googleBot: { index: false, follow: false } };

export function pageMetadata(title: string, description: string, path: string, absolute = false): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots,
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [{ url: "/images/hero.jpg", alt: "Swing Force Ohio baseball and softball hitting instruction" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero.jpg"],
    },
  };
}
