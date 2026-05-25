import "server-only";

import { MESSAGES } from "@/lib/messages";
import { getSiteUrl } from "@/lib/site/site-url";

export function buildLandingJsonLd() {
  const siteUrl = getSiteUrl();
  const origin = siteUrl.origin;
  const { title, description } = MESSAGES.landing.meta;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: MESSAGES.site.logoLabel,
        description: MESSAGES.site.description,
        inLanguage: "ru-RU",
        publisher: { "@id": `${origin}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/trainers?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: MESSAGES.site.logoLabel,
        url: origin,
        description: MESSAGES.site.description,
        logo: {
          "@type": "ImageObject",
          url: `${origin}/opengraph-image`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${origin}/#webpage`,
        url: origin,
        name: title,
        description,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#organization` },
        inLanguage: "ru-RU",
      },
      {
        "@type": "FAQPage",
        "@id": `${origin}/#faq`,
        isPartOf: { "@id": `${origin}/#webpage` },
        mainEntity: MESSAGES.landing.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
