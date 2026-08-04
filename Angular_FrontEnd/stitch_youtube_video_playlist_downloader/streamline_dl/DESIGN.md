---
name: Streamline DL
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
  on-surface-variant: '#ebbbb4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#b18780'
  outline-variant: '#603e39'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690100'
  primary-container: '#ff5540'
  on-primary-container: '#5c0000'
  inverse-primary: '#c00100'
  secondary: '#9ccaff'
  on-secondary: '#003257'
  secondary-container: '#2295ed'
  on-secondary-container: '#002b4c'
  tertiary: '#69df70'
  on-tertiary: '#00390d'
  tertiary-container: '#2ba640'
  on-tertiary-container: '#00320a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#d0e4ff'
  secondary-fixed-dim: '#9ccaff'
  on-secondary-fixed: '#001d35'
  on-secondary-fixed-variant: '#00497b'
  tertiary-fixed: '#85fc89'
  tertiary-fixed-dim: '#69df70'
  on-tertiary-fixed: '#002105'
  on-tertiary-fixed-variant: '#005316'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  meta-data:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max-width: 1120px
  gutter: 24px
  margin-mobile: 16px
  stack-gap: 16px
  section-gap: 48px
---

## Brand & Style

The design system is built on a foundation of **Modern Functionalism**. It prioritizes utility and speed, reflecting the nature of a tool-based web application. The brand personality is efficient, reliable, and unobtrusive, aiming to provide a high-performance "utility" feel without the clutter typically associated with media converters.

The aesthetic utilizes a clean, "Dark Mode First" approach to reduce eye strain during media consumption. It features subtle depth through tonal layering and precise, technical typography. The visual mood is professional and premium, moving away from the "ad-heavy" look of traditional downloaders toward a refined SaaS-like experience.

## Colors

The color palette is rooted in the familiarity of video platforms while maintaining a distinct professional edge.

- **Primary (Action Red):** A high-vibrancy red reserved exclusively for the most critical actions, such as the final "Download" initiation.
- **Secondary (Link Blue):** A soft, high-visibility blue used for secondary interactions, quality selection, and active tab states.
- **Surface & Backgrounds:** We use a "Rich Black" (#0F0F0F) for the base background, with progressively lighter shades of gray (Zinc/Slate) for containers and cards to create depth.
- **Semantic Colors:** Green is used specifically for "Success" states (e.g., download complete), and Amber for warnings or restricted content alerts.

## Typography

This design system employs a three-tier typeface strategy:

1.  **Hanken Grotesk** is the voice of the brand, used for headlines and prominent UI titles to provide a sharp, contemporary feel.
2.  **Inter** handles the heavy lifting for all body text, input fields, and general UI labels, ensuring maximum legibility across all screen densities.
3.  **JetBrains Mono** is used specifically for technical metadata—file sizes, durations, timestamps, and resolutions. This monospaced choice emphasizes the "tool" nature of the app and ensures numerical data aligns perfectly in lists.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. On desktop, the content is centered within a maximum width of 1120px. On smaller devices, it transitions to a fluid layout with safe-area margins.

- **Grid:** A 12-column grid is used for the "Results" section. Single video metadata spans the center 8 columns, while playlist items typically occupy a list-view or a 3-column grid of cards.
- **Visual Rhythm:** An 8px base unit (0.5rem) governs all spacing.
- **Input Grouping:** The URL input and primary "Fetch" button should be treated as a single unit with a 0px or 4px gap to imply direct relationship.
- **Metadata Density:** Information-heavy sections (like playlist lists) use tighter vertical padding to allow more items to be visible above the fold.

## Elevation & Depth

We avoid traditional heavy shadows in favor of **Tonal Elevation**. Depth is created by lightening the background color of elements as they "rise" toward the user:

- **Level 0 (Background):** #0F0F0F (Pure background).
- **Level 1 (Cards/Inputs):** #1A1A1A (Subtle lift).
- **Level 2 (Dropdowns/Modals):** #242424 (Highest contrast).

A subtle **Low-contrast outline** (1px solid #333333) is applied to all cards and buttons to define boundaries in the dark interface. For primary active elements, a soft "Secondary Blue" outer glow (15% opacity) may be used to indicate focus.

## Shapes

The shape language is **Refined & Rounded**. We use a 0.5rem (8px) base radius for most components, which balances professional structure with modern softness. 

- **Interactive Elements:** Buttons and inputs use the base radius.
- **Media Thumbnails:** Thumbnails should have a slightly larger radius (rounded-lg) to soften the "boxiness" of video content.
- **Segmented Controls:** The toggle for "Video / Playlist / Music" uses a pill-shape (rounded-xl) to distinguish it from functional input fields.

## Components

### URL Input & Action
The main input should be oversized (h: 56px) with a prominent 1px border that glows when focused. The "Download/Fetch" button should sit flush or adjacent to the input, using the Primary Red or Secondary Blue.

### Metadata Cards
Cards for video details should feature a horizontal layout on desktop and vertical on mobile.
- **Thumbnail:** Aspect ratio 16:9 with a duration badge in the bottom-right corner (JetBrains Mono).
- **Info Stack:** Title (Headline-MD) followed by a row of secondary metadata (Body-SM).

### Quality Selector
Use a custom-styled dropdown or a set of "Chip" selectors. Each chip should display the resolution (e.g., 1080p) and the estimated file size (e.g., 142MB) using monospaced type for easy comparison.

### Segmented Toggle
The "YT Video / Playlist / Music" switcher should behave like a physical switch, with a sliding background highlight that moves to the active selection.

### Progress Indicators
When downloading, replace the action button with a progress bar that uses a subtle gradient of the Primary Red, showing the percentage in the center.