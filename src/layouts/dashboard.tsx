import { Box, CssBaseline } from "@mui/material";
import pxToRem from "../assets/theme/functions/pxToRem";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import { Outlet } from "react-router-dom";

// type StateType = {
// 	miniSidenav: boolean;
// 	transparentSidenav: boolean;
// 	whiteSidenav: boolean;
// 	sidenavColor: string;
// 	transparentNavbar: boolean;
// 	fixedNavbar: boolean;
// };
// export type ThemeType = {
// 	value: StateType;
// 	setValue: React.Dispatch<React.SetStateAction<StateType>>;
// };
const MainLayout = () => {
	// const [value, setValue] = useState<StateType>({
	// 	miniSidenav: false,
	// 	transparentSidenav: false,
	// 	whiteSidenav: false,
	// 	sidenavColor: "info",
	// 	transparentNavbar: true,
	// 	fixedNavbar: true
	// });
	// const { miniSidenav } = value;
	return (
		<>
			<CssBaseline />
			<Sidenav />
			<Box
				sx={({ breakpoints, transitions }) => ({
					p: 3,
					ml: pxToRem(0),
					pt: pxToRem(90),
					[breakpoints.up("sm")]: {
						ml: pxToRem(76),
						pt: pxToRem(0)
					},
					[breakpoints.up("lg")]: {
						marginLeft: pxToRem(274),
						transition: transitions.create(["margin-left", "margin-right"], {
							easing: transitions.easing.easeInOut,
							duration: transitions.duration.standard
						})
					}
				})}
			>
				<Navbar />
				<Box py={3}>
					<Outlet />
				</Box>
			</Box>
		</>
	);
};

export default MainLayout;
