---
name: Ethereal Technical
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e6'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2ff'
  surface-container: '#eeecfa'
  surface-container-high: '#e8e7f5'
  surface-container-highest: '#e2e1ef'
  on-surface: '#1a1b25'
  on-surface-variant: '#444656'
  inverse-surface: '#2f303a'
  inverse-on-surface: '#f1effd'
  outline: '#757688'
  outline-variant: '#c4c5d9'
  surface-tint: '#2545f5'
  primary: '#0332e8'
  on-primary: '#ffffff'
  primary-container: '#3452ff'
  on-primary-container: '#e7e7ff'
  inverse-primary: '#bbc3ff'
  secondary: '#3c4ccf'
  on-secondary: '#ffffff'
  secondary-container: '#5767e9'
  on-secondary-container: '#fffbff'
  tertiary: '#942d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#bd3c00'
  on-tertiary-container: '#ffe4db'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bbc3ff'
  on-primary-fixed: '#000e5e'
  on-primary-fixed-variant: '#002bcf'
  secondary-fixed: '#dfe0ff'
  secondary-fixed-dim: '#bcc2ff'
  on-secondary-fixed: '#000a64'
  on-secondary-fixed-variant: '#2233b9'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59c'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832700'
  background: '#fbf8ff'
  on-background: '#1a1b25'
  surface-variant: '#e2e1ef'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  section-gap-desktop: 160px
  section-gap-mobile: 80px
  container-max-width: 1200px
  gutter: 24px
---

## Brand & Style
This design system focuses on a **Minimalist-Premium** aesthetic tailored for high-end developer portfolios. The brand personality is precise, authoritative, and sophisticated, favoring whitespace and structural clarity over decorative elements. It draws inspiration from modern editorial layouts and technical documentation, where the quality of the content is elevated by the restraint of the UI. 

The emotional response should be one of "effortless competence." By utilizing high-contrast typography against a warm, neutral canvas, the design creates an environment that feels both human and technologically advanced.

## Colors
The palette is built on a "Warm Studio" foundation. In light mode, the background uses a subtle off-white to reduce eye strain and provide a premium, paper-like quality. The primary accent is a high-vibrancy Indigo, used sparingly for calls-to-action and critical interactive states.

- **Light Mode**: Background is `#FAFAF9` with text at `#111111`. Surface borders use a hairline thickness in `#E7E7E4` or a low-opacity version of the Indigo accent.
- **Dark Mode**: Background shifts to a deep obsidian `#0B0B0D` with text at `#F5F5F4`. The accent lightens to `#6C7CFF` to maintain accessible contrast levels (WCAG AA+).
- **Functional Use**: Colors should be applied as tokens: `Surface/Background`, `Text/Primary`, `Action/Primary`, and `Border/Muted`.

## Typography
The system uses **Geist** to lean into a technical, monospaced-influenced but highly legible sans-serif aesthetic. 

- **Hierarchy**: Headlines are aggressive and tightly tracked to create a strong visual anchor. 
- **Readability**: Body text uses a generous 1.6x line height to ensure long-form project descriptions remain approachable. 
- **Utility**: Labels and tags use uppercase styling with increased letter spacing to distinguish them from narrative content.
- **Mobile Scaling**: The `display-xl` size must scale down to 48px on mobile devices to prevent excessive line breaking.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop and a **Fluid Fluid** approach on mobile. 

- **Grid**: A 12-column grid with a maximum width of 1200px. Gutters are fixed at 24px to maintain a spacious, breathable feel.
- **Rhythm**: Vertical rhythm is driven by the 8px base unit. Sections are separated by large gaps (`160px` on desktop) to enforce a clear narrative distinction between "Work," "About," and "Contact."
- **Margins**: Mobile layouts use a `24px` safe-area margin. Desktop layouts are centered with flexible side margins.

## Elevation & Depth
This design system avoids heavy shadows in favor of **Tonal Layers** and **Hairline Outlines**. 

- **Surfaces**: Depth is communicated through subtle shifts in background color (e.g., a card being 2% darker or lighter than the base background).
- **Outlines**: Components use 1px borders. In light mode, these are `#E7E7E4`. In dark mode, these are high-transparency whites (e.g., `rgba(255,255,255,0.1)`).
- **Interactive Depth**: Only the "Project Frames" utilize a soft, ambient shadow (Blur: 20px, Spread: -5px, Opacity: 4%) to simulate a slight lift from the page, emphasizing the developer's work as the "hero" content.

## Shapes
The shape language is "Sophisticated Geometry." 

- **Buttons/Badges**: Use a `rounded-xl` (1.5rem) or full pill-shape to contrast against the rigid grid.
- **Cards/Frames**: Use `rounded-lg` (1rem) to create a modern, hardware-like appearance for project previews.
- **Inputs**: Follow the `rounded-md` (0.5rem) standard to maintain a professional, structured feel.

## Components
- **Buttons**: Primary buttons are solid Indigo with white text. Secondary buttons use a hairline border with no fill. All interactive elements must feature a `150ms` cubic-bezier transition on hover.
- **Project Frames**: These act as containers for screenshots. They feature a 1px border and a subtle "device-style" header with three dots representing window controls.
- **Tech Badges**: These are small, pill-shaped chips. In light mode, they have no background and a 1px `#E7E7E4` border. In dark mode, they use a subtle `rgba(255,255,255,0.05)` fill.
- **Inputs**: Minimalist underlines or subtle 4-sided borders. Focus states transition the border color to the Indigo accent.
- **Motion**: Implementation must include a staggered `fade + rise` (y: 20px to 0px) for hero elements on load. Subsequent sections should trigger the same animation when they enter the viewport using an Intersection Observer.