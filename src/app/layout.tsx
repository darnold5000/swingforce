import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { AttributionCapture } from "@/components/public/attribution-capture";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { allowIndexing, locationLine, site } from "@/lib/site";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Baseball & Softball Hitting Instruction in ${locationLine} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "baseball hitting instruction Ohio",
    "softball hitting lessons LaGrange Ohio",
    "Swing Force Ohio",
    "youth hitting coach Ohio",
    "personalized baseball softball training",
  ],
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} | ${locationLine}`,
    description: site.description,
    images: [{ url: "/images/hero.jpg", alt: "Swing Force Ohio baseball and softball hitting instruction" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/images/hero.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["SportsActivityLocation", "LocalBusiness"],
  "@id": `${site.url}/#academy`,
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  image: `${site.url}/images/hero.jpg`,
  logo: `${site.url}/brand/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.stateAbbr,
    addressCountry: site.country,
  },
  areaServed: {
    "@type": "City",
    name: site.city,
    containedInPlace: { "@type": "State", name: site.state },
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    description: site.hoursValue,
  },
  sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full`}>
      <body className="flex min-h-svh flex-col bg-black text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[80] focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Suspense fallback={null}>
          <AttributionCapture />
        </Suspense>
        <SiteHeader />
        <div id="main" className="flex-1">
          {children}
        </div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
