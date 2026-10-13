/**
 * Discord Design System — Typography
 * Source of truth: DesignMD /discover/discord
 * Font: gg sans fallback → system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
 */
import colors from "./colors";
import pxToRem from "../functions/pxToRem";

const baseProperties = {
  fontFamily: '"gg sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontWeightLighter: 300,
  fontWeightLight: 400,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontSizeXXS: pxToRem(11),
  fontSizeXS: pxToRem(12),
  fontSizeSM: pxToRem(14),
  fontSizeMD: pxToRem(14.7),
  fontSizeLG: pxToRem(16),
  fontSizeXL: pxToRem(16.8),
  fontSize2XL: pxToRem(20),
  fontSize3XL: pxToRem(22),
  fontSize4XL: pxToRem(37.8),
};

const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: colors.white.main,
  fontWeight: baseProperties.fontWeightBold,
};

const typography = {
  fontFamily: baseProperties.fontFamily,
  fontWeightLighter: baseProperties.fontWeightLighter,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightSemiBold: baseProperties.fontWeightSemiBold,
  fontWeightBold: baseProperties.fontWeightBold,

  h1: {
    fontSize: pxToRem(37.8),
    lineHeight: 1.11,           // 42px / 37.8px
    ...baseHeadingProperties,
    fontWeight: 600,
  },

  h2: {
    fontSize: pxToRem(22),
    lineHeight: 0.8,            // 17.6px / 22px
    ...baseHeadingProperties,
  },

  h3: {
    fontSize: pxToRem(16.8),
    lineHeight: 1.5,            // 25.2px / 16.8px
    ...baseHeadingProperties,
    fontWeight: 600,
  },

  h4: {
    fontSize: pxToRem(16),
    lineHeight: 1.5,            // 24px / 16px
    ...baseHeadingProperties,
    fontWeight: 500,
  },

  h5: {
    fontSize: pxToRem(14.7),
    lineHeight: 1.43,           // 21px / 14.7px
    ...baseHeadingProperties,
    fontWeight: 600,
  },

  h6: {
    fontSize: pxToRem(14),
    lineHeight: 1.43,           // 20px / 14px
    ...baseHeadingProperties,
    fontWeight: 600,
  },

  subtitle1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,  // 16.8px
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.5,                       // 25.2px
    color: colors.text.focus,
  },

  subtitle2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,  // 14.7px
    fontWeight: baseProperties.fontWeightMedium,
    lineHeight: 1.43,                      // 21px
    color: colors.text.main,
  },

  body1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,  // 16.8px — Body Standard
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.5,                       // 25.2px
  },

  body2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,  // 14.7px
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.43,                      // 21px
  },

  button: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeLG,  // 16px — Button / UI Text
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.5,                       // 24px
    textTransform: "none" as const,
  },

  caption: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeSM,  // 14px — Caption / Metadata
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.43,                      // 20px
    color: colors.text.main,
  },

  overline: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXXS,
    fontWeight: baseProperties.fontWeightSemiBold,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  },

  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
    "2xl": baseProperties.fontSize2XL,
    "3xl": baseProperties.fontSize3XL,
  },

  lineHeight: {
    sm: 1.25,
    md: 1.5,
    lg: 2,
  },
};

export default typography;
