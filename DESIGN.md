# 4LIFE Admin — Design System

## Source of Truth
**DesignMD Discord** — https://designmd.me/discover/discord/raw

---

## Visual Theme
Deep dark theme inspired by Discord. Dark indigo/navy surfaces with vibrant purple (#5865F2) brand accent.
Bold, confident typography. Generous spacing. Strategic transparency and subtle shadows.

## Color Palette

| Role | Token | Value |
|------|-------|-------|
| Background | `background.default` | `#060A0B` |
| Surface | `background.paper` / `dark.main` | `#202024` |
| Primary (CTA) | `primary.main` | `#5865F2` |
| Primary Hover | `primary.focus` | `#4751DA` |
| Text Primary | `white.main` | `#FFFFFF` |
| Text Secondary | `text.main` | `#A1A1A5` |
| Success | `success.main` | `#35ED7E` |
| Error | `error.main` | `#ED4245` |
| Info | `info.main` | `#00B0F4` |
| Warning | `warning.main` | `#FEE75C` |
| Borders | — | `rgba(255, 255, 255, 0.06)` |
| Hover Overlay | — | `rgba(255, 255, 255, 0.08)` |
| Active Overlay | — | `rgba(88, 101, 242, 0.15)` |

## Typography
- **Font**: gg sans → fallback system-ui stack
- **Google Font**: Inter (closest match)
- **Body**: 16.8px / 400 weight
- **Buttons**: 16px / 400 weight / no transform
- **Headings**: 600–700 weight, white color

## Border Radius Scale
- Sharp: `0px` (inputs, dividers)
- Subtle: `8px` (dropdowns)
- Standard: `12px` (buttons, badges)
- Rounded: `14px` (icon buttons)
- Extra: `16px` (cards, ghost buttons)
- Feature: `48px` (large cards)
- Maximum: `104px` (hero containers)

## Elevation
Minimal shadows. Opacity-based depth.
- Level 1: `0px 0px 0px 2px rgba(0, 0, 0, 0.05)`
- Level 2: Subtle border rings
- Level 3: `0px 1px 2px 0px rgba(0, 0, 0, 0.05)` + border

## Spacing (4px base)
4 → 8 → 12 → 16 → 20 → 24 → 32 → 40 → 48 → 56 → 80 → 120

## Interactive States
- Hover: +10% opacity overlay or 10% color shift
- Focus: `0 0 0 3px rgba(88, 101, 242, 0.1)` ring
- Disabled: `opacity: 0.5; cursor: not-allowed`
- Transitions: 200ms ease-in-out on color, background, opacity
