import { memo, useMemo } from "react";
import { Button, ButtonProps } from "@mui/material";
import linearGradient from "../assets/theme/functions/linearGradient";
import colors from "../assets/theme/base/colors";
import boxShadow from "../assets/theme/functions/boxShadow";
const GButton = ({ color = "primary", size = "medium",children,...other }: ButtonProps) => {
	const background = useMemo(() => {
		if (color === "inherit") color = "primary";
		return linearGradient(colors.gradients[color].main, colors.gradients[color].state);
	}, [color]);
	const shadow = useMemo(() => {
		if (color === "inherit") color = "primary";
		return `${boxShadow([0, 3], [3, 0], colors[color].main, 0.15)}, 
        ${boxShadow([0, 3], [1, -2], colors[color].main, 0.2)}, 
        ${boxShadow([0, 1], [5, 0], colors[color].main, 0.15)}`;
	}, [color]);
	const hoverShadow = useMemo(() => {
		if (color === "inherit") color = "primary";
		return `${boxShadow([0, 14], [26, -12], colors[color].main, 0.4)}, 
        ${boxShadow([0, 4],[23, 0],colors[color].main,0.15)}, 
        ${boxShadow([0, 8], [10, -5], colors[color].main, 0.2)}`
	}, [color]);
	return (
		<Button
			size={size}
			variant="contained"
			color={color}
			fullWidth
            {...other}
			sx={{
				background,
				color: "#ffffff",
				boxShadow: shadow,
				outlineStyle:"none",

				"&:hover": {
					boxShadow: hoverShadow
				},

				"&:focus:not(:hover)": {
					boxShadow: shadow,
                    outlineStyle:"none"
				},

				"&:disabled": {
					background,
					color: "#ffffff"
				}
			}}
		>
			{children}
		</Button>
	);
};

export default memo(GButton)