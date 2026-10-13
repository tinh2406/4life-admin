/**
 * Discord Design System — Box Shadows / Elevation
 * Source of truth: DesignMD /discover/discord
 *
 * Shadow Philosophy: Minimal shadows, favor opacity-based depth.
 * Elevation 1: Subtle focus rings
 * Elevation 2: Buttons, hover states
 * Elevation 3: Elevated cards, modals, dropdowns
 */
const boxShadows = {
  xs: "0px 0px 0px 2px rgba(0, 0, 0, 0.05)",
  sm: "0px 0px 0px 1px rgba(55, 56, 60, 0.3)",
  md: "0px 0px 0px 1px rgba(55, 56, 60, 0.25), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  lg: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
  xl: "0px 8px 24px 0px rgba(0, 0, 0, 0.2)",
  xxl: "0px 16px 48px 0px rgba(0, 0, 0, 0.25)",
  inset: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
  colored: {
    primary: "0 0 0 3px rgba(88, 101, 242, 0.1)",
    secondary: "0 0 0 3px rgba(114, 115, 119, 0.1)",
    info: "0 0 0 3px rgba(0, 176, 244, 0.1)",
    success: "0 0 0 3px rgba(53, 237, 126, 0.1)",
    warning: "0 0 0 3px rgba(254, 231, 92, 0.1)",
    error: "0 0 0 3px rgba(237, 66, 69, 0.1)",
    light: "0 0 0 3px rgba(255, 255, 255, 0.05)",
    dark: "0 0 0 3px rgba(0, 0, 0, 0.15)",
  },

  navbarBoxShadow: "0px 0px 0px 1px rgba(55, 56, 60, 0.25), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  sliderBoxShadow: {
    thumb: "0 1px 3px 0 rgba(0, 0, 0, 0.3)",
  },
  tabsBoxShadow: {
    indicator: "0 0 0 2px rgba(88, 101, 242, 0.2)",
  },
};

export default boxShadows;
