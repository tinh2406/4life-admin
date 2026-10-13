import { Box, Grid } from "@mui/material";
import React, { memo } from "react";

interface BasicLayoutProps {
	image: string;
	children: React.ReactNode;
}

const BasicLayout = memo(function BasicLayout({ image, children }: BasicLayoutProps) {
	return (
		<Box
			width="100vw"
			height="100%"
			minHeight="100dvh"
			sx={{
				position: "relative",
				overflowX: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<Box
				position="absolute"
				top={0}
				left={0}
				right={0}
				bottom={0}
				sx={{
					backgroundImage: `linear-gradient(135deg, rgba(26, 32, 44, 0.72), rgba(15, 23, 42, 0.82)), url(${image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					zIndex: 0
				}}
			/>
			<Box width="100%" minHeight="100dvh" zIndex={1} position="relative" display="flex" alignItems="center">
				<Grid container justifyContent="center" alignItems="center" sx={{ px: 2, py: 4 }}>
					<Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
						{children}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
});

export default BasicLayout;
