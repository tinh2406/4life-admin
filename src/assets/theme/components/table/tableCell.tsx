/**
 * Discord Design System — TableCell
 */
import pxToRem from "../../functions/pxToRem";

const tableCell = {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `1px solid rgba(255, 255, 255, 0.06)`,
    },
  },
};

export default tableCell;
