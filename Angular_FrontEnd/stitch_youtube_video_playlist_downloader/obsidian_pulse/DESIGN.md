---
name: Obsidian Pulse
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e4beba'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ab8986'
  outline-variant: '#5b403e'
  surface-tint: '#ffb3ae'
  primary: '#ffb3ae'
  on-primary: '#68000b'
  primary-container: '#ff5352'
  on-primary-container: '#5c0008'
  inverse-primary: '#ba1724'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ae'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#930014'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is built on a foundation of high-performance modernism. It targets power users and tech-forward audiences who demand focus, speed, and visual impact. The aesthetic leverages a "Deep Dark" approach, moving beyond standard greys into a near-black environment that minimizes eye strain and maximizes the vibrance of active elements.

The design style is **Sleek Minimalism** with **Glassmorphic** accents. It relies on deep surface depth, precise linework, and aggressive hits of color to guide the eye. The emotional response is one of authority, precision, and immersive focus.

## Colors

The palette is anchored by `#0A0A0A` (Pure Obsidian) to create an infinite depth effect. 

- **Primary (Vibrant Coral/Red):** Used exclusively for high-priority actions, critical status indicators, and active states. It must be used sparingly to maintain its "pulse" effect against the dark background.
- **Surface Tiers:** Backgrounds use the base obsidian, while containers and cards use `#1A1A1A` and `#262626` to create perceived elevation.
- **Contrast:** Typography maintains a high contrast ratio. Primary text is pure white, while metadata and secondary labels use a muted zinc-grey to preserve hierarchy without sacrificing legibility.

## Typography

The typographic system emphasizes technical precision. 

- **Headlines:** Use **Geist** for its monolinear, industrial feel. Tight letter spacing on large sizes creates a high-impact, editorial look.
- **Body:** **Hanken Grotesk** provides a clean, contemporary sans-serif experience that remains highly readable against dark backgrounds.
- **Technical/Labels:** **JetBrains Mono** is utilized for metadata, tags, and small labels to reinforce the high-performance, developer-centric aesthetic. 
- **Accessibility:** Avoid weights below 400 for body text on dark backgrounds to prevent "haloing" or blurring effects on low-quality displays.

## Layout & Spacing

The layout follows a **Fluid-to-Fixed Grid** model. Elements are positioned on an 8px base unit to ensure mathematical harmony.

- **Desktop:** 12-column grid with a 1280px max-width container. Large 40px outer margins provide "breathing room" that makes the dark interface feel premium rather than cramped.
- **Mobile:** 4-column grid with 16px margins.
- **Rhythm:** Use generous vertical padding between sections (80px+) to allow the vibrant primary accents to stand out in isolation.

## Elevation & Depth

Elevation in this dark theme is conveyed through **Tonal Layering** and **Subtle Inner Glows** rather than heavy drop shadows.

- **Level 0 (Base):** `#0A0A0A` - The infinite canvas.
- **Level 1 (Cards/Sections):** `#1A1A1A` with a 1px border of `#262626`.
- **Level 2 (Popovers/Modals):** `#262626` with a soft, 20% opacity white inner-stroke on the top edge to simulate a subtle light source from above.
- **Glassmorphism:** Use a 20px background blur on headers and navigation bars with a semi-transparent hex of `#0A0A0A95` to maintain context while scrolling.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional, geometric feel that avoids the "playfulness" of highly rounded corners while remaining more modern and approachable than sharp edges.

- Small components (Checkboxes, Tags): 4px (0.25rem)
- Medium components (Buttons, Inputs): 8px (0.5rem)
- Large components (Cards, Modals): 12px (0.75rem)

## Components

- **Buttons:** Primary buttons use the Vibrant Coral background with white text. Use a "glow" hover state where the button emits a soft coral outer shadow. Secondary buttons are "Ghost" style with a white border and no fill.
- **Inputs:** Fields use the Level 1 surface (`#1A1A1A`) with a subtle `#262626` border. On focus, the border transitions to the Primary Coral.
- **Chips/Tags:** Use the JetBrains Mono label style. Backgrounds should be a low-opacity version of the text color (e.g., White text at 10% opacity) to stay secondary.
- **Cards:** No outer shadows. Depth is achieved via the 1px border and tonal shift.
- **Progress Bars:** Use a high-vibrance Primary Coral fill against a `#262626` track for maximum visibility.
- **Navigation:** Active links should be indicated by a vertical 2px "pulse" line in Coral next to the text, rather than a background change.