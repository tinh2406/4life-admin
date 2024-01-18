import { AppBar, Avatar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import pxToRem from "../assets/theme/functions/pxToRem";
import colors from "../assets/theme/base/colors";
import rgba from "../assets/theme/functions/rgba";
import borders from "../assets/theme/base/borders";
import boxShadows from "../assets/theme/base/boxShadows";
import { useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notifycations from "./Notifications";
import Breadcrumbs from "./Breadcrumbs";
import { useSelector } from "react-redux";
import { AuthStateType } from "../store/auth/type";
import { useNotify } from "../context/notify";
import { AmenityFilter, LocationFilter, RequestFilter, UserFilter } from "./Filter";
import StatisticsFilter from "./StatisticsFilter";
const Navbar = memo(() => {
	const [fixedNavbar] = useState(true);
	const user = useSelector((state: AuthStateType) => state.user);
	const notify = useNotify();
	const [transparentNavbar, setTransparentNavbar] = useState(true);
	const [openMenu, setOpenMenu] = useState<(EventTarget & HTMLButtonElement) | undefined>();
	const location = useLocation();
	const route = useMemo(() => {
		const collapseLink = location.pathname.split("/");
		// const r = routes.find(r => r.route === `/${collapseLink}`);
		// if (r) return r;
		// return routes[0];
		return collapseLink;
	}, [location]);

	const handleCloseMenu = () => setOpenMenu(undefined);

	useEffect(() => {
		function handleTransparentNavbar() {
			setTransparentNavbar((fixedNavbar && window.scrollY === 0) || !fixedNavbar);
		}

		window.addEventListener("scroll", handleTransparentNavbar);

		handleTransparentNavbar();

		return () => window.removeEventListener("scroll", handleTransparentNavbar);
	}, [fixedNavbar]);

	return (
		<AppBar
			// position={fixedNavbar ? "sticky" : "relative"}
			position="static"
			sx={({ transitions, breakpoints }) => ({
				boxShadow: transparentNavbar ? "none" : boxShadows.navbarBoxShadow,
				backdropFilter: transparentNavbar ? "none" : `saturate(200%) blur(${pxToRem(30)})`,
				backgroundColor: transparentNavbar
					? `${colors.transparent.main} !important`
					: rgba(colors.white.main, 0.6),

				color: transparentNavbar ? colors.text.main : colors.white.main,
				top: pxToRem(12),
				minHeight: pxToRem(75),
				display: "grid",
				alignItems: "center",
				borderRadius: borders.borderRadius.xl,
				paddingTop: pxToRem(8),
				paddingBottom: pxToRem(8),
				paddingRight: 0,
				paddingLeft: 0,
				zIndex: 100,
				"& > *": {
					transition: transitions.create("all", {
						easing: transitions.easing.easeInOut,
						duration: transitions.duration.standard
					})
				},

				"& .MuiToolbar-root": {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "column",

					[breakpoints.up("md")]: {
						minHeight: "auto",
						padding: `${pxToRem(4)} ${pxToRem(16)}`,
						flexDirection: "row"
					}
				},
				[breakpoints.up("sm")]: {
					position: "sticky"
				}
			})}
		>
			<Toolbar>
				<Box
					color="inherit"
					mb={{ xs: 1, md: 0 }}
					sx={({ breakpoints }) => ({
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",

						[breakpoints.up("md")]: {
							justifyContent: "stretch",
							width: "max-content"
						}
					})}
				>
					<Breadcrumbs title={route[route.length - 1]} route={route} />
				</Box>
				<Box
					sx={({ breakpoints }) => ({
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
						flexDirection: "column",
						[breakpoints.up("md")]: {
							alignItems: "center",

							justifyContent: "stretch",
							width: "max-content",
							flexDirection: "row"
						}
					})}
				>
					<RequestFilter visible={route[1] === "requests"} />
					<UserFilter visible={route[1] === "users"} />
					<LocationFilter visible={route[1] === "locations"} />
					<AmenityFilter visible={route[1] === "amenities"} />
					<StatisticsFilter visible={route[1] === ""} />
					<Box
						color={"white"}
						sx={{
							display: "flex",
							justifyContent: "right"
						}}
					>
						<IconButton
							size="small"
							disableRipple
							color="inherit"
							sx={{ px: 1 }}
							aria-controls="notification-menu"
							aria-haspopup="true"
							onClick={event => {
								setOpenMenu(event.currentTarget);
								if (notify.setHasNew) notify.setHasNew(false);
								notify.saveLast();
							}}
						>
							<NotificationsIcon
								sx={{
									color: notify?.hasNew
										? "red"
										: transparentNavbar
										? rgba(colors.text.main, 0.6)
										: colors.text.main
								}}
								fontSize="medium"
							/>
							{!!Object.keys(notify.newNoti).length && (
								<p
									style={{
										position: "absolute",
										right: "0.5rem",
										top: "0.5rem",
										fontSize: 12,
										color: "gray"
									}}
								>
									{Object.keys(notify.newNoti).length}
								</p>
							)}
						</IconButton>
						<Button sx={{ px: 1 }} size="small" disableRipple>
							<Avatar alt="avt" src={user?.avatar} sx={{ width: 30, height: 30 }} />
						</Button>
						<Notifycations close={handleCloseMenu} openMenu={openMenu} />
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
});
export default Navbar;
