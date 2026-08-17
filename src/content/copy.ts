import { SITE } from "@/content/site";

export const HOME_COPY = {
  hero: {
    brand: SITE.shortName.toUpperCase(),
    brandSub: "Technocrat Service",
    headline: "Accredited testing for India’s critical foundations.",
    primaryCta: { label: "Request quote", href: "/contact" },
    secondaryCta: { label: "View services", href: "/services" },
  },
  trust: {
    eyebrow: "Verified · Accredited · Field-proven",
    items: [
      "NABL Accredited",
      "Government Approved",
      "Jaipur HQ",
      "Chartered Engineer (IEI)",
      "Testing Laboratory",
      "Engineering consultation",
    ] as const,
  },
  aboutUs: {
    eyebrow: "About Us",
    title: "About Us",
    leadership: `Under the leadership of ${SITE.founder.name}, Quality Manager`,
    paragraphs: [
      "Shivaay is working as a consultant for quality or specific investigation of materials for infrastructure & highways.",
      "We are glad to have the NABL Accredited mechanical laboratory. We will continue our journey towards the higher version of quality control laboratory as well as the larger version of consultant for highway & building etc.",
    ] as const,
    quote:
      "Individual commitment to a group effort is what makes a team work, a company work, a society work, a civilization work.",
    quoteAttribution: "Vince Lombardi",
  },
  services: {
    eyebrow: "Services",
    title: "Laboratory and field expertise under one roof.",
    body: "From materials and soil to pile load testing, NDT, and engineering consultancy — report-ready quality for civil infrastructure.",
  },
  cta: {
    title: "Need testing or investigation for your next package?",
    body: "Tell us about the site, structure, or materials. We’ll respond with a clear path to scope and quote.",
    primaryCta: { label: "Start an inquiry" },
    phoneLabel: "Call",
  },
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
