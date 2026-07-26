# Coding Standards — Shivaay Technocrat Service

- **No `any`.** Use explicit types or `unknown` with narrowing.
- **No magic numbers.** Import durations and layout values from `src/lib/motion.ts` or `src/lib/layout.ts`.
- **Immutability.** Prefer `const`, `Readonly` / `ReadonlyArray`, and `as const` content modules.
- **Server Components by default.** Add `"use client"` only for motion, Lenis/GSAP, or interactive UI.
- **Motion.** Animate `transform` and `opacity` only. Gate with `prefers-reduced-motion`.
- **Copy.** Tag unverified facts with `[CONFIRM]`. Prefer scraped contact/accreditation data from `content/scraped/`.
- **Accessibility.** Meaningful labels, keyboard-reachable controls, skip link, FAQ semantics.
