import boxShadows from "../../base/boxShadows";
import typography from "../../base/typography";
import colors from "../../base/colors";

// Material Dashboard 2 React helper functions
import pxToRem from "../../functions/pxToRem";
import { MenuClasses, MenuProps, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

const { lg } = boxShadows;
const { size } = typography;
const { text, dark, grey } = colors;

const menu: {
	defaultProps?: Partial<MenuProps> | undefined;
	styleOverrides?: Partial<OverridesStyleRules<keyof MenuClasses, "MuiMenu", Omit<Theme, "components">>>;
} = {
	defaultProps: {
		disableAutoFocusItem: true
	},

	styleOverrides: {
		paper: {
			minWidth: pxToRem(160),
			boxShadow: lg,
			padding: `${pxToRem(16)} ${pxToRem(8)}`,
			fontSize: size.sm,
			textAlign: "left",
			backgroundColor: `${dark.main} !important`,
			border: `1px solid ${grey[300]}`,
				borderRadius: "8px",
				color: text.focus
		}
	}
};

export default menu;
