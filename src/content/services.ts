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
      "Specialised pile and foundation load testing — plate, pull-out, lateral, dynamic, and static — with report-ready results.",
    description:
      "Field load testing for piles and shallow foundations: plate load, pull-out, lateral, dynamic (PDA), and static maintained-load tests. We verify capacity and settlement behaviour so consultants and contractors can accept foundations with confidence.",
    audience:
      "Structural and geotechnical consultants, metro/bridge teams, developers, and contractors needing independent pile and foundation load verification.",
    highlights: [
      "Plate load testing for bearing and settlement checks",
      "Pull-out and lateral load tests for uplift and horizontal demand",
      "Dynamic and static pile load testing with detailed reports",
      "Aligned to foundation design and acceptance workflows",
    ],
    featured: true,
  },
  {
    slug: "engineering-consultancy",
    title: "Engineering services & consultancy",
    shortDescription:
      "Surveys, third-party inspection, PMC, and field/geophysical investigation for civil and infrastructure packages.",
    description:
      "Consultancy-led support across civil and infrastructure projects — DGPS, total station, drone and hydrological surveys; third-party inspection and project management consultancy; and field/geophysical investigation including ERT, TRT, soil penetration, and rock drilling. We help contractors, PMCs, and owners make clearer quality and compliance decisions through project phases.",
    audience:
      "Contractors, PMC teams, consultants, and agencies needing survey, third-party inspection, PMC, or field investigation support.",
    highlights: [
      "Surveys — DGPS, Total Station, Drone & Hydrological",
      "Third-party inspections & Project Management Consultancy (PMC)",
      "Field & geophysical investigation — ERT, TRT, SPT (tripod), rock drilling (Calyx)",
      "Quality investigation and engineering consultation support",
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
