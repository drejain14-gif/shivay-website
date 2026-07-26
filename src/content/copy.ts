import { SITE } from "@/content/site";

export const HOME_COPY = {
  hero: {
    brand: SITE.shortName.toUpperCase(),
    brandSub: "Technocrat Service",
    headline: "Accredited testing for India’s critical foundations.",
    support:
      "Geotech, materials, NDT, and pile testing for metros, bridges, and highway infrastructure.",
    primaryCta: { label: "Request a test quote", href: "/contact" },
    secondaryCta: { label: "View capabilities", href: "#services" },
  },
  trust: {
    items: [
      "NABL Accredited",
      "Government Approved",
      "Jaipur HQ",
      "Chartered Engineer (IEI)",
    ] as const,
  },
  specialty: {
    eyebrow: "Specialisation",
    title: "Pile testing for metros and long-span bridges.",
    body: "When foundations carry cities, precision is non-negotiable. We deliver focused pile testing and investigation support for metro corridors and long-span bridge structures.",
  },
  services: {
    eyebrow: "Capabilities",
    title: "Laboratory and field expertise under one roof.",
    body: "From materials and soil to NDT and EPC consultancy — report-ready quality for civil infrastructure.",
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
        title: "On-site & EPC support",
        body: "Extend quality and investigation support into tender and execution phases.",
      },
    ] as const,
  },
  about: {
    eyebrow: "Who we are",
    title: "A mechanical laboratory grown into civil infrastructure assurance.",
    body: `Since ${SITE.foundingMonth} ${SITE.foundingYear}, Shivaay Technocrat Service has grown from a mechanical laboratory into a multi-disciplinary consultancy serving the civil industry — Government approved and NABL accredited.`,
    founderLine: `${SITE.founder.name} · ${SITE.founder.title}`,
    visionQuote:
      "To be recognized through performance and excellence as a leading consultant & quality engineer.",
    cta: { label: "More about us", href: "/about" },
  },
  cta: {
    title: "Need testing or investigation for your next package?",
    body: "Tell us about the site, structure, or materials. We’ll respond with a clear path to scope and quote.",
    primaryCta: { label: "Start an inquiry", href: "/contact" },
    phoneLabel: "Call",
  },
} as const;

export const NAV_LINKS = [
  { label: "Capabilities", href: "/#services" },
  { label: "Tender", href: "/tender" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Tender", href: "/tender" },
  { label: "Events", href: "/events" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
