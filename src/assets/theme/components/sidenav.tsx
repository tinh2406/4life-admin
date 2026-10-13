/**
 * Discord Design System — Sidenav (MuiDrawer override)
 * Drawer root takes no flow width (Paper is position:fixed)
 */
import colors from "../base/colors";

const sidenav = {
  styleOverrides: {
    root: {
      width: 0,
      whiteSpace: "nowrap" as const,
      border: "none",
    },

    paper: {
      backgroundColor: colors.background.paper,   // #202024
      border: "none",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};

export default sidenav;
