import { AppBar, Avatar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { memo, useMemo, useState } from "react";
import colors from "../assets/theme/base/colors";
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
	const user = useSelector((state: AuthStateType) => state.user);
	const notify = useNotify();
	const [openMenu, setOpenMenu] = useState<(EventTarget & HTMLButtonElement) | undefined>();
	const location = useLocation();
	const route = useMemo(() => {
		const collapseLink = location.pathname.split("/");
		return collapseLink;
	}, [location]);

	const handleCloseMenu = () => setOpenMenu(undefined);

	return (
		<AppBar
			position="static"
			elevation={0}
			sx={{
				backgroundColor: colors.dark.main,              // #202024
				color: colors.white.main,
				border: `1px solid rgba(255, 255, 255, 0.06)`,
				borderRadius: "12px",
				boxShadow: "none",
				py: 0.75,
				px: { xs: 1, md: 1.5 },
				zIndex: 100,
				"& .MuiToolbar-root": {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: { xs: "column", md: "row" },
					gap: { xs: 1.5, md: 2 },
					px: { xs: 1, sm: 2 },
					minHeight: "56px !important"
				}
			}}
		>
			<Toolbar disableGutters>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: { xs: "100%", md: "max-content" }
					}}
				>
					<Breadcrumbs title={route[route.length - 1]} route={route} />
				</Box>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: { xs: "space-between", md: "flex-end" },
						width: { xs: "100%", md: "auto" },
						gap: 1.5,
						flexWrap: "wrap"
					}}
				>
					<RequestFilter visible={route[1] === "requests"} />
					<UserFilter visible={route[1] === "users"} />
					<LocationFilter visible={route[1] === "locations"} />
					<AmenityFilter visible={route[1] === "amenities"} />
					<StatisticsFilter visible={route[1] === ""} />

					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<IconButton
							size="medium"
							aria-label="Notifications"
							aria-controls="notification-menu"
							aria-haspopup="true"
							sx={{
								color: colors.text.main,
								border: `1px solid rgba(255, 255, 255, 0.1)`,
								borderRadius: "14px",
								width: 40,
								height: 40,
								position: "relative",
								"&:hover": {
									backgroundColor: "rgba(255, 255, 255, 0.08)",
									color: colors.white.main
								}
							}}
							onClick={event => {
								setOpenMenu(event.currentTarget);
								if (notify.setHasNew) notify.setHasNew(false);
								notify.saveLast();
							}}
						>
							<NotificationsIcon
								sx={{
									fontSize: 20,
									color: notify?.hasNew ? colors.primary.main : "inherit"
								}}
							/>
							{!!Object.keys(notify.newNoti).length && (
								<Box
									sx={{
										position: "absolute",
										top: -4,
										right: -4,
										minWidth: 18,
										height: 18,
										borderRadius: 9,
										backgroundColor: colors.error.main,
										color: colors.white.main,
										fontSize: 10,
										fontWeight: 700,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										px: 0.5,
										border: `2px solid ${colors.dark.main}`
									}}
								>
									{Object.keys(notify.newNoti).length}
								</Box>
							)}
						</IconButton>

						<Button
							aria-label="User profile"
							sx={{
								minWidth: 0,
								p: 0.25,
								borderRadius: "14px",
								border: `1px solid rgba(255, 255, 255, 0.1)`,
								"&:hover": {
									backgroundColor: "rgba(255, 255, 255, 0.08)"
								}
							}}
							size="small"
						>
							<Avatar
								alt={user?.name || "User avatar"}
								src={user?.avatar}
								sx={{
									width: 32,
									height: 32,
									fontSize: 12,
									bgcolor: colors.primary.main,
									color: colors.white.main
								}}
							>
								{user?.name ? user.name.charAt(0).toUpperCase() : "A"}
							</Avatar>
						</Button>

						<Notifycations close={handleCloseMenu} openMenu={openMenu} />
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
});
export default Navbar;
