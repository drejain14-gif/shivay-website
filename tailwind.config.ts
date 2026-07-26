import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-900": "var(--color-blue-900)",
        "blue-700": "var(--color-blue-700)",
        "blue-100": "var(--color-blue-100)",
        "slate-50": "var(--color-slate-50)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        "dusky-red": "var(--color-dusky-red)",
        "dusky-red-soft": "var(--color-dusky-red-soft)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "74rem",
        measure: "42rem",
      },
      minHeight: {
        hero: "100svh",
        touch: "2.75rem",
      },
      transitionDuration: {
        hover: "220ms",
      },
      letterSpacing: {
        brand: "0.14em",
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "0.95", fontWeight: "800" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.25rem)", { lineHeight: "1.1", fontWeight: "700" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};

export default config;
