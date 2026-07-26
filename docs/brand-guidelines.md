# Brand Guidelines v1.0 — Shivaay Technocrat Service

## Quick Reference

- **Primary Color:** `#0A2540` (blue-900)
- **Accent Color:** `#8B3A42` (dusky-red)
- **Primary Fonts:** Syne (display) + IBM Plex Sans (body)
- **Voice:** Precise · Credible · Infrastructure-grade · Direct

---

## 1. Brand essence

**Who we are:** A Government-approved, NABL-accredited mechanical laboratory and civil infrastructure testing consultancy based in Jaipur, India.

**What we stand for:** Certainty beneath critical structures — piles, bridges, metros, highways — through rigorous lab and field testing.

**Positioning line:** Accredited testing for India’s critical foundations.

---

## 2. Color palette

### Primary

| Name | Hex | Usage |
|------|-----|--------|
| Blue 900 | `#0A2540` | Primary brand, headlines, nav, footer |
| Blue 700 | `#134A8A` | Links, interactive states |
| Blue 100 | `#E8F0F8` | Soft section washes |

### Neutrals

| Name | Hex | Usage |
|------|-----|--------|
| White | `#FFFFFF` | Surfaces |
| Slate 50 | `#F4F7FB` | Page atmosphere |
| Ink | `#0F1724` | Body text |
| Muted | `#5A6A7A` | Secondary text |
| Line | `#D0DAE6` | Dividers |

### Accent (minor)

| Name | Hex | Usage |
|------|-----|--------|
| Dusky red | `#8B3A42` | Primary CTAs, focus, specialty callouts |
| Dusky red soft | `#F3E6E8` | Accent wash behind specialty bands |

### Accessibility

- Ink on white and Blue 900 on white/slate meet WCAG AA for body and large text.
- Dusky red CTAs use white label text; verify contrast on all button states.

---

## 3. Typography

```css
--font-display: 'Syne', sans-serif;
--font-body: 'IBM Plex Sans', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
```

| Element | Font | Weight | Notes |
|---------|------|--------|-------|
| Brand / H1 | Syne | 700–800 | Hero & wordmark energy |
| H2–H3 | Syne | 600–700 | Section titles |
| Body | IBM Plex Sans | 400–500 | Reports & UI |
| Meta / stats | IBM Plex Mono | 400–500 | Accreditation, IDs |

---

## 4. Logo

### Direction

- Wordmark: **SHIVAAY** in Syne Bold
- Mark: abstract pile/column stroke + horizontal precision line (lab/geotech cue)
- Lockups: horizontal (default), stacked, icon-only

### Variants

1. Full color on white (blue-900 mark + ink wordmark; dusky-red precision line)
2. White on blue-900
3. Monochrome ink / white

### Clear space

Minimum clear space = height of the mark.

### Don'ts

- No solar iconography as primary brand
- No purple gradients or glow treatments
- Don’t stretch, outline, or recolor outside the palette

Phase 1 ships a typographic SVG lockup until a full mark is approved.

---

## 5. Voice & messaging

### Voice traits

1. **Precise** — Prefer technical clarity over hype.
2. **Credible** — Lead with accreditation and method, not slogans.
3. **Infrastructure-grade** — Speak to EPC, contractors, and public agencies.
4. **Direct** — Short sentences. No filler.

### Tone do / don’t

| Do | Don’t |
|----|--------|
| “NABL-accredited mechanical laboratory” | “Cutting-edge greener tomorrow” |
| “Pile testing for metros and long-span bridges” | “Solar made simple for homeowners” |
| “Report-ready investigation” | “100% renewable savings” |

### Messaging pillars

1. **Accredited certainty** — NABL / Government approved
2. **Critical foundations** — piles, bridges, metros, highways
3. **Full-cycle quality** — lab → geotech/NDT field → EPC support

### Sample copy blocks

**Headline:** Accredited testing for India’s critical foundations.  
**Support:** Geotech, materials, NDT, and pile testing for metros, bridges, and highway infrastructure.  
**CTA primary:** Request a test quote  
**CTA secondary:** View capabilities  

**WhatsApp intro:**  
Hello — I’m reaching out regarding [project type] testing / investigation with Shivaay Technocrat Service (NABL-accredited, Jaipur).

**Email signature:**

```
Er. Vibhor Kulshrestha | Chartered Engineer (IEI)
Founder, Shivaay Technocrat Service
Diamond Retreat, C-9, Mahal Yojna, Jagatpura, Jaipur 302017
+91-9828167975 | info@shivaaygroups.com
```

---

## 6. Marketing asset specs

### LinkedIn cover

- Size: 1584 × 396 px
- Layout: blue-900 field, white wordmark left, dusky-red accent rule, one line: “NABL-accredited civil & mechanical testing”

### LinkedIn / social post frames

- Size: 1080 × 1080 or 1200 × 627
- Hierarchy: wordmark → one claim → accreditation footline
- Max 2 type styles; plenty of clear space

### Business card (CIP)

- 90 × 54 mm
- Front: mark + wordmark on blue-900
- Back: name, title, phone, email, address, web

### Letterhead

- A4; blue-900 head rule; dusky-red 2pt accent under legal name; footer contact line in IBM Plex Sans 9pt

See also: `docs/assets/brand-one-pager.html`

---

## 7. UI motion principles

- Animate only `transform` and `opacity`
- Gate all motion with `prefers-reduced-motion`
- Accent: dusky-red line draws and CTA hover lift — never decorative purple glow
