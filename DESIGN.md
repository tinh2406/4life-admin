---
name: 4LIFE Admin
description: High-throughput accommodation marketplace operations & KYC moderation console
colors:
  primary: "#ff385c"
  primary-gradient-start: "#EC407A"
  primary-gradient-end: "#D81B60"
  secondary: "#7b809a"
  info: "#1A73E8"
  success: "#4CAF50"
  warning: "#fb8c00"
  error: "#F44335"
  neutral-bg: "#f0f2f5"
  neutral-surface: "#ffffff"
  neutral-dark: "#344767"
  neutral-text: "#7b809a"
  neutral-border: "#dee2e6"
typography:
  display:
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    fontSize: "3rem"
    fontWeight: 300
    lineHeight: 1.2
  headline:
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.375
  title:
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.625
  body:
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  xs: "1.6px"
  sm: "2px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  xxl: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    padding: "6.3px 16.6px"
  button-primary-hover:
    backgroundColor: "{colors.primary-gradient-end}"
  button-contained:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "10px 24px"
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.xl}"
    padding: "16px"
  input-text:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: 4LIFE Admin

## Overview

**Creative North Star: "The Trust Cockpit"**

4LIFE Admin is a high-clarity operational cockpit designed for back-office administrators and moderators overseeing an accommodation and homestay marketplace. It unites rigorous moderation workflows with an inviting, modern aesthetic. The interface balances high information density—essential for auditing guest and host accounts, reviewing incoming verification queues, and tracking booking telemetry—with breathing room and visual composure.

The visual atmosphere is clean, tactile, and confident. Rather than adopting the sterile, gray look of legacy enterprise databases, 4LIFE Admin leverages soft ambient shadows, frosted glass navigation planes, and vibrant Living Coral accents that signal hospitality and brand energy.

The system explicitly rejects two extremes: the cluttered, monochromatic gridlock of dense spreadsheet software with harsh black borders, and the frivolous, distracting neon widgets of generic consumer dashboards. Every pixel serves moderator focus, verification speed, and operational integrity.

**Key Characteristics:**
- **Elevated Canvas Planes:** Crisp white cards resting over a soft cloud background (`#f0f2f5`) create a layered spatial depth.
- **Decisive Accent Hierarchy:** Living Coral (`#ff385c`) is reserved strictly for core commits, active navigation cues, and priority calls to action.
- **Unobstructed Evidence Display:** Document verification panels present identity artifacts at native proportions without obscuring watermarks or crops.
- **Tactile Micro-Feedback:** Buttons and drawer tabs feature smooth cubic-bezier transitions, elevated hover responses, and clear active states.

## Colors

The 4LIFE Admin color palette combines a warm, hospitality-inspired primary accent with neutral slate tones engineered for prolonged screen work.

### Primary
- **Living Coral** (`#ff385c`): The defining brand accent. Applied to key interactive controls, see-more buttons, active navigation pills, and verified markers.
- **Coral Sunrise Gradient** (`#EC407A` to `#D81B60`): Used for primary gradient buttons (`GButton`) and active navigation pills in the drawer.

### Secondary
- **Muted Lavender Slate** (`#7b809a`): Secondary text, timestamps, table column headers, and inactive icons.
- **Cobalt Sky** (`#1A73E8`): Informational chips, active link hover states, and booking analytics curves.
- **Emerald Growth** (`#4CAF50`): Approval buttons, revenue growth statistics, and positive status badges.
- **Amber Warning** (`#fb8c00`): Cautionary notices, pending moderation requests, and alert indicators.
- **Signal Crimson** (`#F44335`): Host rejection actions, account suspensions, error states, and unread notification dots.

### Neutral
- **Cloud Foundation** (`#f0f2f5`): Ambient background surface underpinning all layouts and page bodies.
- **Pure Canvas** (`#ffffff`): Foreground card surfaces, active modal sheets, table containers, and text contrast.
- **Slate Navy** (`#344767`): Primary typography for card titles, data metric figures, and navigational headers.
- **Subtle Hairline** (`#dee2e6`): Soft divider lines between table rows and sidebar groups.

### Named Rules
**The Accent Rarity Rule.** Living Coral is used strictly on actionable decisions, active navigation pills, and critical status markers. It must never cover large container backgrounds or decorative wallpaper. Its visual punch relies on rarity.
**The Status Exclusivity Rule.** Semantic colors (Emerald, Amber, Crimson) communicate system truth exclusively; they are never commandeered for ornamental illustration.

## Typography

**Display Font:** "Roboto", "Helvetica", "Arial", sans-serif
**Body Font:** "Roboto", "Helvetica", "Arial", sans-serif
**Label/Mono Font:** "Roboto", "Helvetica", "Arial", sans-serif

**Character:** Balanced geometric clarity with high legibility across dense data tables, modal dialogs, and verification photo captions.

### Hierarchy
- **Display** (Light 300, 48px / 3rem, line-height 1.25): Infrequent; reserved for primary metric banners and hero stats.
- **Headline** (Bold 700, 24px / 1.5rem, line-height 1.375): Page headers, primary modal titles, and section dividers.
- **Title** (Medium 600, 16px / 1rem, line-height 1.625): Card titles, applicant names in KYC queue, and table header labels.
- **Body** (Regular 400, 14px / 0.875rem, line-height 1.6): Standard data cell values, descriptions, metadata labels, and form input values.
- **Label** (Bold 700, 12px / 0.75rem, line-height 1.25, uppercase): Column headers, status tags, badge texts, and button copy.

### Named Rules
**The Structural Contrast Rule.** Pair bold headers (`fontWeight: 700`, Slate Navy `#344767`) directly with lighter, secondary labels (`fontWeight: 400`, Muted Slate `#7b809a`) to establish instant scanning hierarchies in high-density views.

## Layout

The spatial model uses an 8px modular spacing scale (`4px`, `8px`, `16px`, `24px`, `32px`) coupled with MUI's 12-column responsive grid:

- **Breakpoints:** `xs: 0`, `sm: 576px`, `md: 768px`, `lg: 992px`, `xl: 1200px`, `xxl: 1400px`.
- **Navigation Shell:** A responsive permanent Sidenav rail (`60px` collapsed on mobile/resting, expanding to `250px` on desktop or hover) coupled with a fluid content canvas (`margin-left: 274px` on lg screens).
- **Sticky App Bar:** Positioned at the top of the content area (`min-height: 75px`), featuring glassmorphic blur when scrolled.
- **Density Rhythm:** Card grids maintain a standard 24px (`spacing: 3`) gap, allowing clear separation between distinct analytical widgets and moderation cards.

## Elevation & Depth

4LIFE Admin adopts a **Lifted & Ambient** depth system. Surfaces rest on a continuous Cloud Foundation plane, elevated via multi-stop, low-opacity drop shadows that diffuse light naturally without harsh contours.

### Shadow Vocabulary
- **Card Rest (`boxShadows.md`)** (`0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)`): Standard depth for all resting data cards, KYC preview cards, and analytical summaries.
- **Interactive Elevated (`boxShadows.lg`)** (`0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)`): Applied on card hover, dropdown menus, and popovers.
- **Drawer Floating (`boxShadows.xl`)** (`0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)`): Navigation drawer depth and modal dialogs.
- **Accent Glow (`boxShadows.colored.primary`)** (`0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(233,30,98,0.4)`): Ambient glow applied under primary interactive buttons upon hover.
- **Glassmorphic Inset (`boxShadows.navbarBoxShadow`)** (`inset 0 0 1px 1px rgba(255,255,255,0.9), 0 20px 27px 0 rgba(0,0,0,0.05)`): Translucent rim highlight for the sticky top navbar.

### Named Rules
**The Single-Plane Elevation Rule.** Cards provide the single elevated plane above the canvas background. Elements nested inside a card (table rows, filters, text fields) remain flat or use soft background tints rather than introducing secondary drop shadows.

## Shapes

The geometric language balances soft comfort with professional structure:

- **Buttons:** Rounded rectangular corners with `8px` radius (`borders.borderRadius.lg`).
- **Cards & Containers:** Softened rectangular envelopes with `12px` radius (`borders.borderRadius.xl`).
- **Input Fields & Search Bars:** Clean rounded corners with `6px` radius (`borders.borderRadius.md`).
- **Avatars & Floating Badges:** Circular forms with `50%` radius.
- **Document Preview Frames:** Smooth `20px` radius frames around KYC identity cards.

## Components

### Buttons
- **Shape:** Rounded rectangle (8px radius).
- **Primary Gradient Button (`GButton`):** Linear gradient from `#EC407A` to `#D81B60` with white uppercase text (`fontWeight: 700`, 12px), padded at `6.3px 16.6px`. Hover introduces a warm colored glow shadow.
- **Standard Contained Button:** Pure white or slate background, padded at `10px 24px`, min-height 40px.
- **Text & Action Buttons:** Frameless with color-coded typography (Emerald for Accept, Crimson for Reject).

### Cards / Containers
- **Corner Style:** Soft rounded rectangle (12px radius).
- **Background:** Pure white (`#ffffff`).
- **Shadow Strategy:** Resting `boxShadows.md`; no outer border.
- **Internal Padding:** 16px to 24px depending on data density.

### Data Tables (`DataTable`)
- **Header:** Sticky or top row with bold uppercase labels (`#7b809a`, 12px), zero vertical borders.
- **Rows:** Clean horizontal hairline borders (`#dee2e6`), hover row background tint (`#f8f9fa`).
- **Indicators:** Integrated `LinearProgress` indicator anchored at the base during fetching cycles.

### Navigation (Sidenav + Navbar)
- **Sidenav:** Permanent rail that expands from 60px to 250px on hover, featuring high-contrast icon tiles and an active gradient pill indicator.
- **Navbar:** Sticky frosted glass header (`backdrop-filter: blur(30px) saturate(200%)`), housing breadcrumbs, dynamic route filters, notification bells, and moderator avatar.

### KYC Identity Card Viewer (Signature Component)
- **Role:** High-fidelity identity document inspector in `/requests/:id`.
- **Layout:** Two responsive 1.6 aspect ratio panels displaying front and back identity documents.
- **Frame:** 20px rounded corners with clean drop shadows, ensuring edge-to-edge readability without distortion or aggressive cropping.

## Do's and Don'ts

### Do:
- **Do** preserve the natural aspect ratio of applicant ID documents (front and back) to guarantee verification accuracy.
- **Do** use `rgba(255, 255, 255, 0.6)` with `backdrop-filter: blur(30px)` on sticky headers to keep underlying content subtly visible without harming text contrast.
- **Do** reinforce moderation decisions with clear colored icons and text (e.g. Check for Accept, Close for Reject).
- **Do** pair data table loading cycles with smooth linear indicators rather than blocking entire screens.

### Don't:
- **Don't** crop, tilt, or distort national identity card document uploads in moderation workflows.
- **Don't** use solid black borders or harsh gridlines across data tables; rely on subtle dividers (`#dee2e6`) and white row cards.
- **Don't** use Living Coral for destructive actions; rejections and deletions must remain Signal Crimson (`#F44335`).
- **Don't** stack multiple drop shadows inside a single card container.
