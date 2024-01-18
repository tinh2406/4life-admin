// import Footer from "layouts/authentication/components/Footer";
import { Box, Grid } from "@mui/material";
import React from "react";
interface BasicLayoutProps {
	image: string;
	children: React.ReactNode;
}

function BasicLayout({ image, children }: BasicLayoutProps) {
	return (
		<Box
			width="100vw"
			height="100%"
			minHeight="100vh"
			sx={{
				overflowX: "hidden"
			}}
		>
			<Box
				position="absolute"
				width="100%"
				minHeight="100vh"
				sx={{
					backgroundImage: `linear-gradient(to bottom, rgba(89, 89, 89, 0.61)00, rgba(71, 71, 71, 0.18)), url(${image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat"
				}}
			/>
			<Box width="100%" height="100vh" zIndex={1} position="relative">
				<Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
					<Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
						{children}
					</Grid>
				</Grid>
			</Box>
			{/* <Footer light /> */}
		</Box>
	);
}

export default BasicLayout;
