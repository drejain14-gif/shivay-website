export const SERVICES = [
  {
    slug: "materials-testing",
    title: "Civil Materials Testing",
    shortDescription:
      "Laboratory testing across construction materials for quality control and compliance.",
    description:
      "Mechanical and materials testing covering a wide range of construction inputs — supporting contractors, consultants, and owners with report-ready results.",
  },
  {
    slug: "geotech-soil",
    title: "Geotech & Soil Testing",
    shortDescription:
      "Geotechnical investigation, land assessment, and soil testing for sound foundations.",
    description:
      "Site investigation and soil characterisation including SBC-oriented testing to inform safe, economical foundation design.",
  },
  {
    slug: "pile-testing",
    title: "Pile Testing",
    shortDescription:
      "Specialised pile testing for metros and long-span bridges.",
    description:
      "Field and laboratory support focused on pile performance for metro systems and long-span bridge foundations — precision where failure is not an option.",
    featured: true,
  },
  {
    slug: "highway-analysis",
    title: "Highway Infrastructure",
    shortDescription:
      "Analysis and quality consultancy for highway infrastructure works.",
    description:
      "Investigation and testing aligned to highway project needs — from materials verification to infrastructure assessment support.",
  },
  {
    slug: "ndt",
    title: "Non-Destructive Testing",
    shortDescription:
      "NDT methods to evaluate existing structures without compromising integrity.",
    description:
      "Non-destructive testing for condition assessment and quality verification on civil and mechanical assets.",
  },
  {
    slug: "epc-consultancy",
    title: "Tender & EPC Support",
    shortDescription:
      "Tender consultation, quality engineering, and EPC coordination across India.",
    description:
      "Multi-disciplinary consultancy spanning tender processes, quality investigation, and EPC support for infrastructure and related works.",
  },
] as const;

export type Service = (typeof SERVICES)[number];
export type ServiceSlug = Service["slug"];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
