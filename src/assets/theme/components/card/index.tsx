/**
 * Discord Design System — Card Override
 * Feature Card: rgba overlay bg, 48px border-radius, no border, subtle shadow
 */
import colors from "../../base/colors";
import boxShadows from "../../base/boxShadows";

import pxToRem from "../../functions/pxToRem";
import { OverridesStyleRules } from "@mui/material/styles/overrides";
import { Theme } from "@mui/material";

const card: {
	styleOverrides?: Partial<OverridesStyleRules<"root", "MuiCard", Omit<Theme, "components">>> | undefined;
} = {
	styleOverrides: {
		root: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			minWidth: 0,
			wordWrap: "break-word",
			backgroundColor: colors.background.paper,   // #202024
			backgroundClip: "border-box",
			border: "none",
			borderRadius: pxToRem(16),                    // Extra Rounded
			boxShadow: boxShadows.xs,
			overflow: "hidden",
			transition: "background-color 200ms ease-in-out, box-shadow 200ms ease-in-out"
		}
	}
};

export default card;
