import { Box, CssBaseline } from "@mui/material";
import colors from "../assets/theme/base/colors";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: colors.background.default }}>
			<CssBaseline />
			<Sidenav />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					minWidth: 0,
					ml: { xs: "72px", md: "256px" },
					p: { xs: 2, sm: 3, md: 3.5 },
					backgroundColor: colors.background.default,
					minHeight: "100vh",
					boxSizing: "border-box"
				}}
			>
				<Navbar />
				<Box py={2.5}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default MainLayout;
