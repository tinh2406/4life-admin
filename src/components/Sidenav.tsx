import {
	Avatar,
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	IconButton,
	Tooltip,
	useMediaQuery,
	useTheme
} from "@mui/material";
import colors from "../assets/theme/base/colors";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import routes from "../constants/routes";
import { useMemo } from "react";
import { Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/slice";
import { AuthStateType } from "../store/auth/type";

const LinkItem = ({
	active,
	icon,
	name,
	route,
	onNavigate
}: {
	active?: boolean;
	icon: React.ReactNode;
	name: string;
	route: string;
	onNavigate?: () => void;
}) => {
	return (
		<ListItem
			component={Link}
			to={route}
			onClick={onNavigate}
			aria-label={name}
			sx={{ p: 0, textDecoration: "none", color: "inherit", mb: 0.5 }}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					width: "100%",
					px: 1.75,
					py: 1.1,
					borderRadius: "12px",
					cursor: "pointer",
					userSelect: "none",
					backgroundColor: active ? "rgba(255, 56, 92, 0.14)" : "transparent",
					color: active ? colors.primary.main : colors.text.main,
					transition: "all 200ms ease-in-out",
					"&:hover": {
						backgroundColor: active ? "rgba(255, 56, 92, 0.14)" : "rgba(255, 255, 255, 0.08)",
						color: active ? colors.primary.main : colors.white.main,
						"& .linkitem-icon": {
							color: active ? colors.primary.main : colors.white.main
						}
					}
				}}
			>
				<ListItemIcon
					className="linkitem-icon"
					sx={{
						minWidth: 32,
						color: active ? colors.primary.main : colors.text.main,
						display: "grid",
						placeItems: "center",
						transition: "color 200ms ease-in-out",
						"& svg": {
							fontSize: 20
						}
					}}
				>
					{icon}
				</ListItemIcon>

				<ListItemText
					primary={name}
					primaryTypographyProps={{
						fontSize: 14.7,
						fontWeight: active ? 600 : 400,
						lineHeight: "21px"
					}}
				/>

				{active && (
					<Box
						sx={{
							width: 6,
							height: 6,
							borderRadius: "50%",
							backgroundColor: colors.primary.main,
							flexShrink: 0
						}}
					/>
				)}
			</Box>
		</ListItem>
	);
};

type SidenavProps = { mobileOpen: boolean; onMobileClose: () => void };

const Sidenav = ({ mobileOpen, onMobileClose }: SidenavProps) => {
	const location = useLocation();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const dispatch = useDispatch();
	const user = useSelector((state: AuthStateType) => state.user);

	const activeRoute = useMemo(() => {
		const collapseLink = location.pathname.split("/")[1];
		if (routes.find(r => r.route === `/${collapseLink}`)) return `/${collapseLink}`;
		return "/";
	}, [location]);

	return (
		<Drawer
			variant={isDesktop ? "permanent" : "temporary"}
			open={isDesktop || mobileOpen}
			onClose={onMobileClose}
			PaperProps={{
				sx: ({ breakpoints }) => ({
					width: 256,
					height: "100vh",
					position: "fixed",
					top: 0,
					left: 0,
					backgroundColor: colors.dark.main,             // #202024
					borderRight: `1px solid rgba(255, 255, 255, 0.06)`,
					boxShadow: "none",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					boxSizing: "border-box",
					overflowX: "hidden",
					overflowY: "auto",
					zIndex: theme.zIndex.drawer,
					[breakpoints.down("md")]: {
						width: 264,
						borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
						"& .linkitem-text, & .logo-text, & .user-profile-info, & .nav-section-title": { display: "block" }
					},
					"& .MuiDrawer-paperAnchorDockedLeft": { borderRight: `1px solid rgba(255, 255, 255, 0.08)` }
				})
			}}
		>
			<Box sx={{ px: 2, pt: 2.5 }}>
				{/* Brand Header */}
				<Box
					component={NavLink}
					to="/"
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						textDecoration: "none",
						px: 1,
						pb: 2.5
					}}
				>
					<Box
						component="img"
						src={logo}
						alt="4LIFE"
						sx={{
							height: 32,
							width: "auto",
							objectFit: "contain"
						}}
					/>
					<Box className="logo-text" display="flex" alignItems="center" gap={1}>
						<Box
							sx={{
								fontSize: 10,
								fontWeight: 700,
								textTransform: "uppercase",
								letterSpacing: "0.06em",
								px: 1,
								py: 0.25,
								borderRadius: "8px",
							backgroundColor: "rgba(255, 56, 92, 0.14)",
								color: colors.primary.main
							}}
						>
							Admin
						</Box>
					</Box>
				</Box>

				<Divider sx={{ my: 1.5, borderColor: "rgba(255, 255, 255, 0.06)" }} />

				{/* Section Label */}
				<Typography
					className="nav-section-title"
					variant="overline"
					sx={{
						px: 1.5,
						display: "block",
						color: colors.text.main,
						fontSize: 10.5,
						fontWeight: 700,
						letterSpacing: "0.08em",
						mb: 1
					}}
				>
					Operations
				</Typography>

				{/* Navigation Links */}
				<List sx={{ p: 0 }}>
					{routes.map(route => (
						<LinkItem
							icon={route.icon}
							name={route.name}
							key={route.key}
							route={route.route}
							active={route.route === activeRoute}
							onNavigate={onMobileClose}
						/>
					))}
				</List>
			</Box>

			{/* User Profile & Logout Footer */}
			<Box sx={{ px: 2, pb: 2.5 }}>
				<Divider sx={{ my: 1.5, borderColor: "rgba(255, 255, 255, 0.06)" }} />
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						p: 1.25,
						borderRadius: "12px",
						backgroundColor: "rgba(255, 255, 255, 0.06)",
						border: "none"
					}}
				>
					<Box display="flex" alignItems="center" gap={1.25} minWidth={0}>
						<Avatar
							src={user?.avatar}
							alt={user?.name || "Admin"}
							sx={{
								width: 34,
								height: 34,
								fontSize: 13,
								fontWeight: 600,
								bgcolor: colors.primary.main,
								color: colors.white.main
							}}
						>
							{user?.name ? user.name.charAt(0).toUpperCase() : "A"}
						</Avatar>
						<Box className="user-profile-info" minWidth={0}>
							<Typography
								variant="body2"
								fontWeight={600}
								color={colors.white.main}
								noWrap
								sx={{ fontSize: 13, lineHeight: 1.2 }}
							>
								{user?.name || "Administrator"}
							</Typography>
							<Typography
								variant="caption"
								color={colors.text.main}
								noWrap
								sx={{ fontSize: 11, display: "block" }}
							>
								{user?.email || "Super Admin"}
							</Typography>
						</Box>
					</Box>

					<Tooltip title="Sign Out">
						<IconButton
							size="small"
							onClick={() => dispatch(logout())}
							sx={{
								color: colors.text.main,
								"&:hover": {
									color: colors.error.main,
									backgroundColor: "rgba(237, 66, 69, 0.15)"
								}
							}}
						>
							<Logout fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
		</Drawer>
	);
};

export default Sidenav;
