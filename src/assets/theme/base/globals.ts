/**
 * 4LIFE Admin Design System — Global Styles
 */
import colors from "./colors";

const globals = {
  html: {
    scrollBehavior: "smooth",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${colors.white.main} !important`,
    transition: "color 200ms ease-in-out !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${colors.primary.main} !important`,
  },
  "@media (prefers-reduced-motion: reduce)": {
    "*, *::before, *::after": {
      animationDuration: "0.01ms !important",
      animationIterationCount: "1 !important",
      transitionDuration: "0.01ms !important",
      scrollBehavior: "auto !important",
    },
  },
};

export default globals;
