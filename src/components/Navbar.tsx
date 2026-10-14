import { AppBar, Avatar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { memo, useMemo, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import colors from "../assets/theme/base/colors";
import { useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notifycations from "./Notifications";
import Breadcrumbs from "./Breadcrumbs";
import { useSelector } from "react-redux";
import { AuthStateType } from "../store/auth/type";
import { useNotify } from "../context/notify";

type NavbarProps = { onMenuClick: () => void; showMenu: boolean };

const Navbar = memo(function Navbar({ onMenuClick, showMenu }: NavbarProps) {
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
				backgroundColor: "rgba(19, 23, 24, 0.88)",
				color: colors.white.main,
				borderBottom: "1px solid #303638",
				borderRadius: 0,
				boxShadow: "none",
				backdropFilter: "blur(14px)",
				py: 0,
				px: { xs: 1, md: 2 },
				zIndex: 100,
				"& .MuiToolbar-root": {
					display: "flex",
					justifyContent: "space-between",
					alignItems: { xs: "stretch", lg: "center" },
					flexDirection: "row",
					gap: { xs: 1, lg: 2 },
					px: { xs: 0.5, sm: 1 },
					py: 1,
					minHeight: "64px !important"
				}
			}}
		>
			<Toolbar disableGutters>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
						justifyContent: "space-between",
						width: { xs: "100%", lg: "auto" },
						minWidth: { lg: 170 },
						flex: { lg: "0 0 22%" }
					}}
				>
					{showMenu && <IconButton aria-label="Open navigation" onClick={onMenuClick} sx={{ width: 40, height: 40, color: colors.white.main, border: "1px solid #354041", borderRadius: "7px" }}><MenuIcon /></IconButton>}
					<Breadcrumbs title={route[route.length - 1]} route={route} />
				</Box>


				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1, flex: { lg: "0 0 22%" } }}>
					<IconButton
							size="medium"
							aria-label="Notifications"
							aria-controls="notification-menu"
							aria-haspopup="true"
							sx={{
								color: colors.text.main,
								border: "1px solid #354041",
								borderRadius: "7px",
								width: 36,
								height: 36,
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
								borderRadius: "7px",
								border: "1px solid #354041",
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
			</Toolbar>
		</AppBar>
	);
});
export default Navbar;
