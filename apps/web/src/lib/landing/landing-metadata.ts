import type { Metadata } from "next";

import { MESSAGES } from "@/lib/messages";
import { getSiteUrl } from "@/lib/site/site-url";

export function buildLandingMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const { title, description, ogImageAlt } = MESSAGES.landing.meta;

  return {
    title,
    description,
    keywords: [...MESSAGES.landing.meta.keywords],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: siteUrl.origin,
      siteName: MESSAGES.site.logoLabel,
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
