/** Service categories shown on /services/engineering-consultancy */
export const ENGINEERING_SERVICE_CATEGORIES = [
  {
    category: "Surveys",
    tests: [
      "DGPS Survey",
      "Total Station (T.S.) Survey",
      "Drone Survey",
      "Hydrological Survey",
    ],
  },
  {
    category: "Consultancy",
    tests: [
      "Third-party inspections",
      "Project Management Consultancy (PMC)",
    ],
  },
  {
    category: "Field & Geophysical Investigation",
    tests: [
      "Electrical Resistivity Tomography (ERT)",
      "Thermal Resistivity Test (TRT)",
      "Soil Penetration Test (tripod setup)",
      "Rock Drilling Test (using Calyx)",
    ],
  },
] as const;
