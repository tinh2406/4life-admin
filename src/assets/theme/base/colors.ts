/**
 * Discord Design System — Color Tokens
 * Source of truth: DesignMD /discover/discord
 */
const colors = {
  background: {
    default: "#060A0B",
    paper: "#202024",
  },

  text: {
    main: "#A1A1A5",    // Medium Gray — secondary text
    focus: "#FFFFFF",    // Primary text on dark
  },

  transparent: {
    main: "transparent",
  },

  white: {
    main: "#FFFFFF",
    focus: "#F7F7F7",
  },

  black: {
    light: "#23272A",
    main: "#060A0B",
    focus: "#000000",
  },

  primary: {
    main: "#5865F2",     // Discord Brand Purple
    focus: "#4751DA",    // Hover (10% darker)
  },

  secondary: {
    main: "#727377",     // Dark Gray
    focus: "#A1A1A5",    // Medium Gray
  },

  info: {
    main: "#00B0F4",     // Cyan Accent
    focus: "#009DD9",
  },

  success: {
    main: "#35ED7E",     // Bright Green
    focus: "#2FD471",
  },

  warning: {
    main: "#FEE75C",     // Discord Yellow
    focus: "#E5D053",
  },

  error: {
    main: "#ED4245",     // Discord Red
    focus: "#D63638",
  },

  light: {
    main: "#2C2F33",     // Dark Surface Tertiary
    focus: "#28282C",    // Dark Surface Quaternary
  },

  dark: {
    main: "#202024",     // Dark Surface Primary
    focus: "#060A0B",    // Discord Text Black
  },

  grey: {
    100: "#28282C",      // Quaternary surface
    200: "#2C2F33",      // Tertiary surface
    300: "#333333",      // Charcoal Gray
    400: "#727377",      // Dark Gray
    500: "#A1A1A5",      // Medium Gray
    600: "#E1E1E5",      // Very Light Gray — borders
    700: "#F7F7F7",      // Light Gray
    800: "#FFFFFF",      // White
    900: "#FFFFFF",
  },

  gradients: {
    primary: {
      main: "#5865F2",
      state: "#3E42B2",
    },

    secondary: {
      main: "#727377",
      state: "#333333",
    },

    info: {
      main: "#00B0F4",
      state: "#0088C0",
    },

    success: {
      main: "#35ED7E",
      state: "#28BA62",
    },

    warning: {
      main: "#FEE75C",
      state: "#E5D053",
    },

    error: {
      main: "#ED4245",
      state: "#B91C1C",
    },

    light: {
      main: "#2C2F33",
      state: "#202024",
    },

    dark: {
      main: "#060A0B",
      state: "#000000",
    },
  },

  socialMediaColors: {
    facebook: { main: "#3b5998", dark: "#344e86" },
    twitter: { main: "#55acee", dark: "#3ea1ec" },
    instagram: { main: "#125688", dark: "#0e456d" },
    linkedin: { main: "#0077b5", dark: "#00669c" },
    pinterest: { main: "#cc2127", dark: "#b21d22" },
    youtube: { main: "#e52d27", dark: "#d41f1a" },
    vimeo: { main: "#1ab7ea", dark: "#13a3d2" },
    slack: { main: "#3aaf85", dark: "#329874" },
    dribbble: { main: "#ea4c89", dark: "#e73177" },
    github: { main: "#24292e", dark: "#171a1d" },
    reddit: { main: "#ff4500", dark: "#e03d00" },
    tumblr: { main: "#35465c", dark: "#2a3749" },
  },

  badgeColors: {
    primary: {
      background: "rgba(88, 101, 242, 0.15)",
      text: "#798DF9",
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.1)",
      text: "#A1A1A5",
    },
    info: {
      background: "rgba(0, 176, 244, 0.15)",
      text: "#00B0F4",
    },
    success: {
      background: "rgba(53, 237, 126, 0.15)",
      text: "#35ED7E",
    },
    warning: {
      background: "rgba(254, 231, 92, 0.15)",
      text: "#FEE75C",
    },
    error: {
      background: "rgba(237, 66, 69, 0.15)",
      text: "#ED4245",
    },
    light: {
      background: "rgba(255, 255, 255, 0.1)",
      text: "#E1E1E5",
    },
    dark: {
      background: "#060A0B",
      text: "#FFFFFF",
    },
  },

  coloredShadows: {
    primary: "rgba(88, 101, 242, 0.2)",
    secondary: "rgba(114, 115, 119, 0.2)",
    info: "rgba(0, 176, 244, 0.2)",
    success: "rgba(53, 237, 126, 0.2)",
    warning: "rgba(254, 231, 92, 0.2)",
    error: "rgba(237, 66, 69, 0.2)",
    light: "rgba(255, 255, 255, 0.05)",
    dark: "rgba(0, 0, 0, 0.25)",
  },

  inputBorderColor: "#282828",

  tabs: {
    indicator: { boxShadow: "#5865F2" },
  },
};

export default colors;
