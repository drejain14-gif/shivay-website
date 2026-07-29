import { SITE } from "@/content/site";

export const HOME_COPY = {
  hero: {
    brand: SITE.shortName.toUpperCase(),
    brandSub: "Technocrat Service",
    headline: "Accredited testing for India’s critical foundations.",
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
    leadership:
      "Under the leadership of Er. Vibhor Kulshrestha, Quality Manager",
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
    body: "From materials and soil to NDT — report-ready quality for civil infrastructure.",
  },
  process: {
    eyebrow: "How we work",
    title: "From brief to report-ready results.",
    steps: [
      {
        number: "01",
        title: "Consultation",
        body: "Scope the investigation or test programme against your project and standards.",
      },
      {
        number: "02",
        title: "Investigation & testing",
        body: "Execute laboratory and field work with calibrated methods and clear documentation.",
      },
      {
        number: "03",
        title: "Reporting",
        body: "Deliver clear, decision-ready reports for consultants, contractors, and authorities.",
      },
      {
        number: "04",
        title: "On-site support",
        body: "Extend quality and investigation support into field and execution phases.",
      },
    ] as const,
  },
  cta: {
    title: "Need testing or investigation for your next package?",
    body: "Tell us about the site, structure, or materials. We’ll respond with a clear path to scope and quote.",
    primaryCta: { label: "Start an inquiry", href: "/contact" },
    phoneLabel: "Call",
  },
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
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
