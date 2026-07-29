export const SERVICES = [
  {
    slug: "materials-testing",
    title: "Civil Materials Testing",
    shortDescription:
      "Laboratory testing across construction materials for quality control and compliance.",
    description:
      "Mechanical and materials testing covering a wide range of construction inputs — supporting contractors, consultants, and owners with report-ready results from our NABL-accredited mechanical laboratory.",
    audience:
      "Contractors, consultants, and project owners who need compliant materials verification before placement or payment.",
    highlights: [
      "NABL-accredited mechanical laboratory scope",
      "Category-wise testing across aggregates, bricks, concrete, bitumen, pavers & GSB",
      "Report-ready laboratory results for site and authority use",
      "Aligned to IS / ASTM methods as applicable",
    ],
  },
  {
    slug: "geotech-soil",
    title: "Geotech & Soil Testing",
    shortDescription:
      "Geotechnical investigation, land assessment, and soil testing for sound foundations.",
    description:
      "Site investigation and soil characterisation including SBC-oriented testing to inform safe, economical foundation design for buildings, infrastructure, and industrial works.",
    audience:
      "Structural and geotechnical consultants, developers, and contractors planning foundations or land assessment.",
    highlights: [
      "Soil and rock laboratory testing under mechanical scope",
      "Index, compaction, CBR, shear and compression tests",
      "Supporting foundation and geotechnical design decisions",
      "Clear documentation for design and approval workflows",
    ],
  },
  {
    slug: "pile-testing",
    title: "Pile Testing",
    shortDescription:
      "Specialised pile testing for metros and long-span bridges.",
    description:
      "Field and laboratory support focused on pile performance for metro systems and long-span bridge foundations — precision where failure is not an option.",
    audience:
      "Metro, bridge, and heavy foundation teams needing specialised pile performance verification.",
    highlights: [
      "Specialised pile testing for metros and long-span bridges",
      "Field execution with calibrated methods",
      "Performance verification for critical foundations",
      "Decision-ready reporting for consultants and authorities",
    ],
    featured: true,
  },
  {
    slug: "highway-analysis",
    title: "Highway Infrastructure",
    shortDescription:
      "Analysis and quality consultancy for highway infrastructure works.",
    description:
      "Investigation and testing aligned to highway project needs — from materials verification to infrastructure assessment support across pavement and related works.",
    audience:
      "Highway contractors, PMC teams, and agencies needing materials and quality investigation on road packages.",
    highlights: [
      "Highway-aligned materials verification",
      "Infrastructure assessment support",
      "Quality consultancy through project phases",
      "Documentation suited to package and authority review",
    ],
  },
  {
    slug: "ndt",
    title: "Non-Destructive Testing",
    shortDescription:
      "NDT methods to evaluate existing structures without compromising integrity.",
    description:
      "Non-destructive testing for condition assessment and quality verification on civil and mechanical assets — evaluate performance without compromising structural integrity.",
    audience:
      "Owners and consultants assessing existing structures, repairs, or in-service quality.",
    highlights: [
      "Condition assessment without structural damage",
      "Quality verification on civil and mechanical assets",
      "Support for repair and rehabilitation decisions",
      "Clear findings for engineering follow-up",
    ],
  },
] as const;

export type Service = (typeof SERVICES)[number];
export type ServiceSlug = Service["slug"];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  return SERVICES.filter((service) => service.slug !== slug).slice(0, limit);
}
