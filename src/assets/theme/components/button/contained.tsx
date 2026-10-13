/**
 * Discord Design System — Contained Button
 * Primary: #5865F2 → hover #4751DA → active #3E42B2
 * Secondary: ghost overlay rgba(255,255,255,0.1)
 */
import colors from "../../base/colors";
import pxToRem from "../../functions/pxToRem";

const { white } = colors;

const contained = {
  base: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    minHeight: pxToRem(48),
    color: white.main,
    outline: 0,
    padding: `${pxToRem(12)} ${pxToRem(24)}`,
    outlineStyle: "none",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },

    "&:active, &:active:focus, &:active:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(40),
    padding: `${pxToRem(8)} ${pxToRem(16)}`,
    fontSize: pxToRem(14.7),

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(56),
    padding: `${pxToRem(17.5)} ${pxToRem(24)}`,
    fontSize: pxToRem(16),

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  primary: {
    backgroundColor: colors.primary.main,       // #5865F2
    color: `${white.main} !important`,
    boxShadow: "none",

    "&:hover": {
      backgroundColor: colors.primary.focus,     // #4751DA
    },

    "&:focus:not(:hover)": {
      backgroundColor: colors.primary.focus,
      boxShadow: "0 0 0 3px rgba(88, 101, 242, 0.1)",
    },

    "&:active": {
      backgroundColor: "#3E42B2",
    },
  },

  secondary: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: `${white.main} !important`,

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },

    "&:focus:not(:hover)": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
  },
};

export default contained;
