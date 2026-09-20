# Master Design System: DocuVerse

A tailored design system harmonizing three specific design languages:
1. **Base: Notion** — Warm, paper-calm, distraction-free document workspace feel (`#f6f5f4` soft canvas, crisp dividers, quiet chrome).
2. **UI Components: Mastercard** — Large, pill-shaped interactive surfaces (`border-radius: 9999px`), warm high-contrast accents (Ink Black `#141413`, Signal Orange `#CF4500`, Warm Cream `#F3F0EE`).
3. **Typography: WIRED** — Custom authoritative serif display headings (`Newsreader / Georgia / Times New Roman`) for headlines, paired with a pristine, ultra-clean sans-serif (`Inter / system-ui`) for body copy and UI controls.

---

## 1. Golden Usability Rules (Strict Compliance)

- **Never hide text behind icons:** Always pair icons with explicit text labels, or use clear text directly.
- **44x44px minimum tap targets:** Every button, tab, dropdown trigger, and input element must satisfy at least 44×44px hit-area for touch devices.
- **Plain, direct language:** Use clear, unambiguous labels (e.g. *"Compress Image"* instead of *"Optimize Asset"*, *"Merge PDF"* instead of *"Synthesize Documents"*, *"Extract Text"* instead of *"Process Optical Stream"*).

---

## 2. Master Color Tokens

```css
:root {
  /* Canvas & Surfaces (Notion Base) */
  --color-canvas: #ffffff;
  --color-canvas-soft: #f6f5f4; /* Notion warm paper */
  --color-surface: #ffffff;
  --color-surface-hover: #f1f0ee;
  --color-border-hairline: #e6e6e6;
  --color-border-subtle: #d8d6d2;

  /* Ink & Text */
  --color-ink-primary: #141413;   /* Mastercard Ink Black */
  --color-ink-secondary: #31302e; /* Warm Charcoal */
  --color-ink-muted: #615d59;     /* Stone */
  --color-ink-faint: #9c9791;     /* Ash */

  /* Mastercard Brand High-Contrast Accents */
  --color-brand-primary: #141413;     /* Confident Ink CTA */
  --color-brand-on-primary: #ffffff;
  --color-accent-orange: #cf4500;     /* Mastercard Signal Orange */
  --color-accent-orange-light: #f37338;
  --color-accent-blue: #0075de;       /* Notion link/action blue */

  /* Shadows (Notion Barely-There Layered Elevation) */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 12px rgba(20, 20, 19, 0.06);
  --shadow-lg: 0 12px 32px rgba(20, 20, 19, 0.08);

  /* Radii (Mastercard Stadium/Pill Language) */
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 9999px; /* Mastercard Pill standard */
}
```

---

## 3. Typography Hierarchy (WIRED Display + Notion Body)

```css
/* Display Headings (WIRED Editorial Authority) */
--font-serif-display: "Newsreader", "Playfair Display", "Times New Roman", Georgia, serif;

/* Body, Navigation, Forms, Controls (Ultra-Clean Sans) */
--font-sans-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Typographic Scale */
.display-hero {
  font-family: var(--font-serif-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: var(--color-ink-primary);
}

.heading-section {
  font-family: var(--font-serif-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-ink-primary);
}

.heading-card {
  font-family: var(--font-sans-body);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-ink-primary);
}

.body-text {
  font-family: var(--font-sans-body);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.55;
  color: var(--color-ink-secondary);
}

.caption-text {
  font-family: var(--font-sans-body);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-ink-muted);
}
```

---

## 4. UI Components (Mastercard Pill Gestures on Notion Canvas)

### A. Buttons & CTAs
- **Primary Action (Mastercard Pill):** 
  - Height: `48px` (exceeds 44px touch rule).
  - Background: `--color-brand-primary` (`#141413`).
  - Text: `--color-brand-on-primary` (`#ffffff`), `font-weight: 600`.
  - Border-radius: `--radius-pill` (`9999px`).
  - Hover: Background `#262627` with a subtle elevation lift.
- **Secondary Action:**
  - Height: `48px`.
  - Background: `--color-surface`, 1.5px border `--color-border-subtle`.
  - Text: `--color-ink-primary`.
  - Border-radius: `--radius-pill`.
- **Accent Action (Orange Signal):**
  - Height: `48px`.
  - Background: `--color-accent-orange` (`#cf4500`).
  - Text: `#ffffff`.
  - Border-radius: `--radius-pill`.

### B. Interactive Cards & Drop Zones
- **Tool Workspace Card:**
  - Background: `--color-surface` (`#ffffff`).
  - Border: 1px solid `--color-border-hairline`.
  - Radius: `--radius-lg` (`20px`).
  - Minimum tap padding: `24px` to `36px`.
- **Drag-and-Drop Zone:**
  - Border: 2px dashed `--color-border-subtle`.
  - Radius: `--radius-md` (`16px`).
  - Background: `--color-canvas-soft` (`#f6f5f4`).
  - Text: Big, clear plain language ("Drop your PDF files here or click to browse").

### C. Navigation & Header
- **Floating Pill Header:**
  - Background: `rgba(255, 255, 255, 0.95)` with `backdrop-filter: blur(12px)`.
  - Border-radius: `--radius-pill` for navigation pills.
  - Categorized dropdowns: Clean floating panel with 12px radius, no full-viewport cover.
