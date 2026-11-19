import { faqs, pricing, services, site } from "@/content";

const clean = (s: string) => (/\[[^\]]+\]/.test(s) ? undefined : s);

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    email: clean(site.email),
    telephone: clean(site.phone),
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.regionCode,
      addressCountry: site.country,
    },
    areaServed: [
      { "@type": "City", name: "Brisbane" },
      { "@type": "State", name: "Queensland" },
    ],
    sameAs: site.social.map((s) => s.href).filter(Boolean),
    knowsAbout: site.keywords,
  };
}

export function serviceJsonLd() {
  const price = pricing.price.replace(/[^0-9.]/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Email and SMS retention marketing for restaurants and bars",
    serviceType: "Email marketing and SMS marketing",
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: "Brisbane" },
    audience: { "@type": "BusinessAudience", audienceType: "Restaurants, bars and hospitality venues" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Retention services",
      itemListElement: services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.body },
      })),
    },
    ...(price && !/\[/.test(pricing.price)
      ? { offers: { "@type": "Offer", price, priceCurrency: "AUD", description: pricing.priceUnit } }
      : {}),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

