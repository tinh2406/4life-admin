---
name: 4LIFE Admin
description: A focused, dark operations console for the 4LIFE marketplace.
colors:
  primary: "#ff385c"
  primary-deep: "#B61F43"
  canvas: "#060A0B"
  surface: "#202024"
  surface-raised: "#2C2F33"
  text-primary: "#FFFFFF"
  text-secondary: "#A1A1A5"
  border-subtle: "rgba(255, 255, 255, 0.1)"
  success: "#35ED7E"
  warning: "#FEE75C"
  error: "#ED4245"
typography:
  body:
    fontFamily: '"gg sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "14.7px"
    fontWeight: 400
    lineHeight: 1.43
  headline:
    fontFamily: '"gg sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    height: "46px"
  input-text:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    height: "46px"
---

# Design System: 4LIFE Admin

## Overview

**Creative North Star: “The 4LIFE Operations Desk”**

4LIFE Admin is a focused operations console for moderators and marketplace administrators. Its visual language should feel dependable, direct, and welcoming: dark neutral work surfaces keep attention on listings, identity evidence, and business data, while a restrained coral/berry accent connects the product to the 4LIFE marketplace brand.

The interface is desktop-first and task-oriented. Prefer clear hierarchy, compact controls, and crisp edges over decorative effects. Keep the accent consistent across navigation, primary actions, and focus states; reserve semantic colors for system status. The existing code still contains Discord-purple theme tokens alongside newer dark UI treatments, so treat the coral/berry direction as the intended brand accent and avoid extending the old purple treatment into new work.

**Key Characteristics:**
- Dark, high-contrast operational surfaces.
- Coral/berry for the primary brand action and active emphasis.
- Flat components with depth conveyed by tonal layers and fine borders.
- Compact, readable controls designed for repeated admin workflows.

## Colors

The palette pairs near-black and charcoal surfaces with bright text and one recognizable 4LIFE accent. The theme currently contains Discord-purple values; the pink/coral accent is present in the documented brand direction and the refreshed login treatment.

### Primary
- **4LIFE Coral** ({colors.primary}): Primary actions, active navigation, and focused interactive states. Use consistently and sparingly.
- **Deep Berry** ({colors.primary-deep}): Darker CTA treatment where a stronger surface contrast is needed, such as the login submit button.

### Neutral
- **Night Canvas** ({colors.canvas}): Application background.
- **Charcoal Surface** ({colors.surface}): Main cards, panels, and dark containers.
- **Raised Charcoal** ({colors.surface-raised}): Inputs and nested controls that need separation from their parent surface.
- **White** ({colors.text-primary}): Primary text and high-priority labels.
- **Muted Gray** ({colors.text-secondary}): Supporting text and secondary labels.
- **Subtle White Border** ({colors.border-subtle}): Quiet boundaries between adjacent dark surfaces.

### Semantic
- **Success Green** ({colors.success}), **Warning Yellow** ({colors.warning}), and **Signal Red** ({colors.error}) communicate status and outcomes. They are not decorative accents.

**The One Accent Rule.** Use coral/berry for brand emphasis; do not mix in the legacy purple accent on newly designed surfaces.

## Typography

**Display Font:** “gg sans” (with system sans-serif fallbacks)

**Body Font:** “gg sans” (with system sans-serif fallbacks)

**Character:** Compact, neutral sans-serif typography supports fast scanning in data-dense admin workflows. Headings use clear weight contrast; labels remain legible and avoid excessive uppercase tracking.

### Hierarchy
- **Headline** (600–700, 22–38px): Page titles and major section headings.
- **Title** (500–600, 14–20px): Card headings, table sections, and control groups.
- **Body** (400, 14–17px, line-height 1.43–1.5): Main content, form values, and explanatory text.
- **Label** (500–700, 11–14px): Field names, metadata, and compact controls; uppercase tracking is reserved for brief telemetry-style labels.

## Layout

The admin shell uses a fixed side navigation beside a flexible main workspace, with a top navigation bar and page content below. Dense management views align filters and actions close to their tables; dashboards use grouped metric and chart regions. Use a 4px spacing rhythm, generally stepping through 8, 12, 16, 24, and 32px. Keep the desktop workflow primary while allowing navigation, filter rows, and content columns to wrap or stack on smaller screens.

## Elevation & Depth

Prefer flat-by-default surfaces. Establish hierarchy with distinct charcoal tones, restrained borders, and spacing. Existing theme shadows are available for overlays and transient emphasis, but persistent cards and controls should not depend on stacked drop shadows. Keep blur and translucency limited to the top navigation treatment where already used.

**The Tonal Layer Rule.** A nested control should separate through a small surface shift or border before adding another shadow.

## Shapes

Use compact, controlled rounding: 6–8px for inputs, small buttons, menus, and filter controls; up to 12px for standard cards or containers. Avoid pill-shaped large containers and the legacy 48–104px radius values on ordinary admin surfaces. Fine, low-contrast borders define edges without recreating MUI’s heavy outlined-field look.

## Components

### Buttons
- **Shape:** Compact corners (6–8px).
- **Primary:** Coral/berry fill with white text; reserve for the main action in a region.
- **Hover / Focus:** Short color transition; use a visible accent border or focus ring that remains distinct on dark surfaces.
- **Secondary:** Neutral dark surface with a subtle border; maintain clear text contrast.

### Cards / Containers
- **Corner Style:** Controlled rounding (8–12px).
- **Background:** Charcoal over the near-black canvas, with lighter charcoal for nested regions.
- **Shadow Strategy:** Flat by default; use borders and tone to group content.
- **Border:** Subtle white at low opacity.
- **Internal Padding:** Usually 16–24px, expanding to 32px for focused forms.

### Inputs / Fields
- **Style:** Filled dark surface, compact 6px corners, no prominent permanent outline.
- **Focus:** Clear coral/berry border or restrained focus ring; preserve a visible keyboard focus state.
- **Error / Disabled:** Use semantic error color and readable helper text; disabled controls remain distinguishable from active fields.

### Navigation
- **Style:** Dark, persistent side navigation with concise labels and clear active state; top navigation uses a quiet bottom border and compact account/notification actions.
- **States:** Coral/berry marks the active destination; hover states use a restrained surface shift.

### Filter Toolbar
- **Style:** Compact controls grouped in a single dark surface. Separate sort, role, and search controls with spacing or subtle dividers, and allow the search field to grow into available width.

## Do's and Don'ts

### Do:
- **Do** use the coral/berry brand accent consistently for primary actions and active emphasis.
- **Do** maintain high contrast between text and dark input or panel backgrounds.
- **Do** use borders and tonal surface shifts to define component boundaries.
- **Do** keep status colors tied to actual system states.

### Don't:
- **Don't** introduce Discord purple as a second brand accent in new screens.
- **Don't** apply oversized pill radii to cards, filters, or form fields.
- **Don't** rely on a prominent MUI outline as the default input treatment.
- **Don't** use multiple stacked shadows to create hierarchy inside a panel.
