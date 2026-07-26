import { SITE } from "@/content/site";

export function JsonLdScript({ data }: Readonly<{ data: unknown }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    foundingDate: `${SITE.foundingYear}-02`,
    description: SITE.description,
    email: SITE.email,
    telephone: [SITE.phone, SITE.phoneSecondary],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    openingHours: SITE.openingHours,
    areaServed: SITE.areaServed,
    founder: {
      "@type": "Person",
      name: SITE.founder.name,
      jobTitle: SITE.founder.title,
    },
  };
}
