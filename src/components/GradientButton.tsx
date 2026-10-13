import { memo } from "react";
import { Button, ButtonProps } from "@mui/material";
import colors from "../assets/theme/base/colors";

const GButton = memo(function GButton({ color = "primary", size = "medium", children, ...other }: ButtonProps) {
	const resolvedColor = color === "inherit" ? "primary" : color;
	const mainBg = colors[resolvedColor]?.main || colors.primary.main;
	const focusBg = colors[resolvedColor]?.focus || colors.primary.focus;

	return (
		<Button
			size={size}
			variant="contained"
			fullWidth
			{...other}
			sx={{
				backgroundColor: mainBg,
				color: "#ffffff !important",
				borderRadius: 2,
				textTransform: "none",
				fontWeight: 600,
				fontSize: 14,
				boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
				transition: "all 150ms ease",
				"&:hover": {
					backgroundColor: focusBg,
					boxShadow: "0 4px 12px 0 rgba(225, 29, 72, 0.25)"
				},
				"&:disabled": {
					backgroundColor: colors.grey[400],
					color: colors.grey[600]
				}
			}}
		>
			{children}
		</Button>
	);
});

export default GButton;