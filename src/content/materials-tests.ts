/** NABL-recommended mechanical lab scope — material category → tests performed */
export const MATERIALS_TEST_CATEGORIES = [
  {
    category: "Aggregate (Coarse)",
    tests: [
      "Sieve Analysis",
      "Specific Gravity",
      "Water Absorption",
      "Bulk Density",
      "Flakiness Index",
      "Elongation Index",
      "Agg. Impact Value",
      "Aggregate Crushing Value",
      "10% Fine Value",
      "Soundness",
      "Finer Than 75 Micron",
      "Stripping Value",
    ],
  },
  {
    category: "Aggregate (Fine)",
    tests: [
      "Sieve Analysis",
      "Specific Gravity",
      "Water Absorption",
      "Bulking (Fine Aggregate)",
      "Soundness",
      "Finer Than 75 Micron",
      "Silt Content",
    ],
  },
  {
    category: "Bricks",
    tests: [
      "Water Absorption",
      "Compressive Strength",
      "Efflorescence",
      "Dimension & Tolerances (Length, Width, Height)",
    ],
  },
  {
    category: "Concrete mix / Concrete",
    tests: ["Compressive Strength cube", "Compressive Strength core"],
  },
  {
    category: "Bituminous Mix",
    tests: ["Binder Content", "Density"],
  },
  {
    category: "Paver Block",
    tests: ["Compressive Strength", "Water Absorption"],
  },
  {
    category: "Granular Sub-Base",
    tests: [
      "CBR",
      "Grain Size Analysis",
      "Elongation Index",
      "Flakiness Index",
      "Soundness",
      "Liquid Limit",
      "Plastic Limit",
      "Heavy Compaction Test (Dry Density)",
      "Heavy Compaction Test (Moisture Content)",
      "Impact Value (Wet)",
    ],
  },
] as const;
