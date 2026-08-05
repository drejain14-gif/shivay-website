export type PileOffering = Readonly<{
  id: string;
  title: string;
  description: string;
  sizes?: ReadonlyArray<string>;
  features: ReadonlyArray<string>;
  icon: "plate" | "pullout" | "lateral" | "dynamic" | "static";
}>;

/** Pile load-testing offerings shown on /services/pile-testing */
export const PILE_OFFERINGS: ReadonlyArray<PileOffering> = [
  {
    id: "plate-load-test",
    title: "Plate load test",
    description:
      "In-situ bearing assessment using a steel plate under incremental load — informs safe bearing pressure and settlement behaviour for shallow foundations.",
    features: [
      "Settlement vs. pressure curves",
      "Suitable for footing and raft checks",
      "Field report with recommended SBC",
    ],
    icon: "plate",
  },
  {
    id: "pull-out-test",
    title: "Pull out test",
    description:
      "Uplift capacity verification for piles and anchors — critical where tension, wind, or seismic uplift governs foundation design.",
    features: [
      "Controlled tensile loading",
      "Displacement monitoring",
      "Capacity confirmation against design",
    ],
    icon: "pullout",
  },
  {
    id: "lateral-test",
    title: "Lateral test",
    description:
      "Horizontal load testing to evaluate pile resistance and deflection under lateral forces from wind, earth pressure, or seismic action.",
    features: [
      "Static lateral loading",
      "Deflection and rotation readings",
      "Support for pile group design checks",
    ],
    icon: "lateral",
  },
  {
    id: "dynamic-test",
    title: "Dynamic test",
    description:
      "High-strain dynamic pile testing (e.g. PDA) for rapid capacity estimation and integrity screening on driven or cast-in-situ piles.",
    features: [
      "Impact-based capacity estimate",
      "Pile integrity indicators",
      "Faster coverage across multiple piles",
    ],
    icon: "dynamic",
  },
  {
    id: "static-test",
    title: "Static test",
    description:
      "Maintained or cyclic static load tests to verify ultimate and working load capacity with detailed settlement records.",
    features: [
      "Maintained load test (MLT)",
      "Cyclic / rapid static options",
      "Full load–settlement documentation",
    ],
    icon: "static",
  },
];
