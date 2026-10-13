/**
 * Discord Design System — Button Root
 * Standard (12px) border-radius, 200ms transitions, disabled at 50% opacity
 */
import typography from "../../base/typography";
import borders from "../../base/borders";
import pxToRem from "../../functions/pxToRem";
import { CSSInterpolation } from "@mui/styled-engine";

const { size } = typography;
const { borderRadius } = borders;

const root: CSSInterpolation = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: size.lg,                    // 16px — Button / UI Text
  fontWeight: typography.fontWeightRegular,
  borderRadius: borderRadius.md,        // 12px — Standard
  padding: `${pxToRem(10)} ${pxToRem(24)}`,
  lineHeight: 1.5,                      // 24px
  textAlign: "center",
  textTransform: "none",
  userSelect: "none",
  transition: "all 200ms ease-in-out",

  "&:disabled": {
    pointerEvents: "none",
    opacity: 0.5,
    cursor: "not-allowed",
  },

  "& .material-icons": {
    fontSize: pxToRem(15),
    marginTop: pxToRem(-2),
  },
};
export default root;
