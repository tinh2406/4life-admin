/**
 * 4LIFE Admin Design System — Border Radius Scale
 * Source of truth: DESIGN.md
 *
 * Sharp (0px): Input fields, text links
 * Subtle (8px): Dropdown menus, small modals
 * Standard (12px): Buttons, small cards, badges
 * Rounded (14px): Icon buttons
 * Extra Rounded (16px): Ghost buttons, medium cards
 * Very Rounded (48px): Large feature cards
 * Maximum (104px): Hero containers
 */
import colors from "./colors";
import pxToRem from "../functions/pxToRem";

const borders = {
  borderColor: colors.inputBorderColor,

  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },

  borderRadius: {
    xs: pxToRem(0),       // Sharp
    sm: pxToRem(8),       // Subtle — dropdowns
    md: pxToRem(12),      // Standard — buttons, badges
    lg: pxToRem(14),      // Rounded — icon buttons
    xl: pxToRem(16),      // Extra Rounded — ghost buttons, cards
    xxl: pxToRem(48),     // Very Rounded — feature cards
    section: pxToRem(104),// Maximum — hero containers
  },
};

export default borders;
