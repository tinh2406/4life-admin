import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import colors from "../assets/theme/base/colors";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const closeMobileNav = () => setMobileNavOpen(false);

	return (
		<Box sx={{ display: "flex", minHeight: "100dvh", backgroundColor: colors.background.default }}>
			<CssBaseline />
			<Sidenav mobileOpen={mobileNavOpen} onMobileClose={closeMobileNav} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					minWidth: 0,
					ml: { xs: 0, md: "256px" },
					p: { xs: 2, sm: 3, md: 3.5 },
					backgroundColor: colors.background.default,
					minHeight: "100dvh",
					boxSizing: "border-box"
				}}
			>
				<Navbar onMenuClick={() => setMobileNavOpen(true)} showMenu={!isDesktop} />
				<Box py={2.5}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default MainLayout;
