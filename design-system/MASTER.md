# Design System MASTER — Shivaay Technocrats

> Generated from **ui-ux-pro-max** reasoning (B2B Service) + brand locks (blue / white / dusky red).  
> Python CLI unavailable on this machine (Xcode CLT); recommendations synthesized from skill data files.

## Product analysis

| Field | Value |
|-------|--------|
| Product | B2B laboratory & civil infrastructure testing |
| Audience | EPC contractors, consultants, metro/bridge/highway agencies |
| Pattern | **Trust & Authority + Hero-Centric** |
| Style | **Trust & Authority + Minimalism / Swiss Modernism 2.0** |
| Motion | Complex tier (8) — GSAP scroll reveal, stagger, scrub progress |
| Density | Spacious (4) — 24–96px section rhythm |
| Variance | Balanced (5) |

## Landing structure (from Trust & Authority + Conversion)

1. Full-bleed Hero (brand + one headline + dual CTA)
2. Trust / accreditation proof strip
3. Specialization (pile testing) with imagery
4. Capabilities feature showcase (6 services)
5. Process timeline
6. About / founder credibility
7. CTA inquiry + contact
8. Footer

## Color tokens (B2B Service palette adapted to brand)

| Role | Token | Hex |
|------|-------|-----|
| Primary | `--color-blue-900` | `#0A2540` (brand; near B2B `#0F172A`) |
| Interactive | `--color-blue-700` | `#134A8A` |
| Soft wash | `--color-blue-100` | `#E8F0F8` |
| Surface | `--color-white` | `#FFFFFF` |
| Atmosphere | `--color-slate-50` | `#F4F7FB` (near `#F8FAFC`) |
| Ink | `--color-ink` | `#0F1724` |
| Muted | `--color-muted` | `#5A6A7A` |
| CTA accent | `--color-dusky-red` | `#8B3A42` |
| Accent soft | `--color-dusky-red-soft` | `#F3E6E8` |
| Line | `--color-line` | `#D0DAE6` |

**Anti-patterns:** AI purple/pink gradients, playful claymorphism, hidden credentials, cream+terracotta editorial, broadsheet clutter.

## Typography

- Display: **Syne** (bold brand presence; unique vs Inter defaults)
- Body: **IBM Plex Sans** (technical / report readability)
- Meta: **IBM Plex Mono** (accreditation, indices)

Scale: oversized brand wordmark → H1 clamp → clear body measure (max ~42rem).

## Effects & motion

- Opacity + transform only
- Hover: 200–250ms, lift ≤4px / scale ≤1.02
- Scroll reveals + service stagger
- Process scrub progress line
- `prefers-reduced-motion` gates Lenis + GSAP
- No infinite decorative bounce

## Spacing (spacious dial)

`--space-xs: 4px` · `sm: 8px` · `md: 24px` · `lg: 32px` · `xl: 48px` · `2xl: 64px` · `3xl: 96px`

## Must-have (reasoning)

- Visible NABL / Govt credentials above the fold adjacent strip
- Case-study / field photography (in place of generic stock)
- Clear quote CTA contrast ≥7:1 on dusky-red

## Accessibility

- Body contrast ≥4.5:1
- Focus rings on dusky-red
- Touch targets ≥44px
- Skip link
- Reduced motion supported
