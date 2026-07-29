/** NABL-recommended mechanical lab scope — Group-2 Soil and Rock */
export const GEOTECH_TEST_CATEGORIES = [
  {
    category: "Soil",
    tests: [
      "Liquid Limit",
      "Plastic Limit",
      "Specific Gravity",
      "Grain Size Analysis",
      "Free Swell Index",
      "Light Compaction Test",
      "Heavy Compaction Test",
      "Moisture Content",
      "CBR",
      "Direct Shear Test (Angle of friction)",
      "Direct Shear Test (Cohesion)",
      "Trial axial compression test without pore water pressure (Angle of friction)",
      "Trial axial compression test without pore water pressure (Cohesion)",
    ],
  },
  {
    category: "Rock",
    tests: [
      "Point Load Strength Index",
      "Unconfined Compressive Strength",
    ],
  },
] as const;
