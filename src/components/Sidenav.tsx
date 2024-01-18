import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import linearGradient from "../assets/theme/functions/linearGradient";
import colors from "../assets/theme/base/colors";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logoMini from "../assets/images/logo-mini.png";
import pxToRem from "../assets/theme/functions/pxToRem";
import borders from "../assets/theme/base/borders";
import typography from "../assets/theme/base/typography";
import routes from "../constants/routes";
import { useMemo } from "react";
import shadows from "@mui/material/styles/shadows";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth/slice";
const LinkItem = ({
	active,
	icon,
	name,
	route
}: {
	active?: boolean;
	icon: React.ReactNode;
	name: string;
	route: string;
}) => {
	return (
		<Link to={route}>
			<ListItem>
				<Box
					className="linkitem"
					sx={({ transitions }) => ({
						background: active
							? linearGradient(colors.gradients.primary.main, colors.gradients.primary.state)
							: colors.transparent.main,
						color: active ? colors.white.main : colors.black.main,
						display: "flex",
						alignItems: "center",
						width: "100%",
						padding: `${pxToRem(8)} ${pxToRem(8)}`,
						margin: `${pxToRem(1.5)} ${pxToRem(6)}`,
						borderRadius: borders.borderRadius.md,
						cursor: "pointer",
						userSelect: "none",
						whiteSpace: "nowrap",
						boxShadow: active ? shadows[2] : "none",
						transition: transitions.create(["box-shadow", "padding", "background-color"], {
							easing: transitions.easing.easeInOut,
							duration: transitions.duration.standard
						}),

						"&:hover, &:focus": {
							backgroundColor: colors.grey[400]
						}
					})}
				>
					<ListItemIcon
						sx={({ transitions }) => ({
							minWidth: pxToRem(32),
							minHeight: pxToRem(32),
							color: colors.white.main,
							borderRadius: borders.borderRadius.md,
							display: "grid",
							placeItems: "center",
							transition: transitions.create("margin", {
								easing: transitions.easing.easeInOut,
								duration: transitions.duration.standard
							}),

							"& svg, svg g": {
								color: active ? colors.white.main : colors.black.main
							}
						})}
					>
						{icon}
					</ListItemIcon>

					<ListItemText
						className="linkitem-text"
						primary={name}
						sx={({ transitions }) => ({
							opacity: 0,
							display: "none",
							marginLeft: pxToRem(10),
							transition: transitions.create(["opacity", "margin"], {
								easing: transitions.easing.easeInOut,
								duration: transitions.duration.standard
							}),

							"& span": {
								fontWeight: active ? typography.fontWeightRegular : typography.fontWeightLight,
								fontSize: typography.size.sm,
								lineHeight: 0
							}
						})}
					/>
				</Box>
			</ListItem>
		</Link>
	);
};

const Sidenav = () => {
	const location = useLocation();
	const activeRoute = useMemo(() => {
		const collapseLink = location.pathname.split("/")[1];
		if (routes.find(r => r.route === `/${collapseLink}`)) return `/${collapseLink}`;
		return "/";
	}, [location]);
	const dispatch = useDispatch();
	return (
		<Drawer
			variant="permanent"
			PaperProps={{
				sx: ({ breakpoints, transitions }) => {
					return {
						overflowX: "hidden",
						width: 60,
						height: 60,
						boxShadow: shadows[4],
						background: linearGradient(colors.gradients.light.main, colors.gradients.light.state),
						transition: transitions.create("width", {
							easing: transitions.easing.sharp,
							duration: transitions.duration.shorter
						}),

						":hover": {
							width: 250,
							height: "calc(100vh - 2rem)",
							".logo": {
								background: `url(${logo})`,
								backgroundSize: 90,
								backgroundRepeat: "no-repeat",
								backgroundPosition: "left",
								mx: 2
							},
							".linkitem": {
								padding: `${pxToRem(8)} ${pxToRem(10)}`,
								margin: `${pxToRem(1.5)} ${pxToRem(16)}`
							},
							".linkitem-text": {
								opacity: 1,
								display: "block"
							}
						},
						[breakpoints.up("sm")]: {
							height: "calc(100vh - 2rem)",
						},
						[breakpoints.up("lg")]: {
							width: 250,
							".logo": {
								background: `url(${logo})`,
								backgroundSize: 90,
								backgroundRepeat: "no-repeat",
								backgroundPosition: "left",
								mx: 2
							},
							".linkitem": {
								padding: `${pxToRem(8)} ${pxToRem(10)}`,
								margin: `${pxToRem(1.5)} ${pxToRem(16)}`
							},
							".linkitem-text": {
								opacity: 1,
								display: "block"
							}
						}
					};
				}
			}}
		>
			<Box component={NavLink} to="/" display="flex" alignItems="center">
				<Box
					sx={({ transitions }) => ({
						mt: 2,
						height: 20,
						width: "100%",
						background: `url(${logoMini})`,
						backgroundSize: 40,
						backgroundRepeat: "no-repeat",
						backgroundPosition: "left",
						mx: 1.2,
						transition: transitions.create("margin", {
							easing: transitions.easing.sharp,
							duration: transitions.duration.shorter
						})
					})}
					className="logo"
				/>
			</Box>
			<Divider light />
			<List
				sx={{
					height: "100%"
				}}
			>
				{routes.map(route => (
					<LinkItem
						icon={route.icon}
						name={route.name}
						key={route.key}
						route={route.route}
						active={route.route === activeRoute}
					/>
				))}
				<div
					onClick={() => {
						dispatch(logout());
					}}
					style={{
						position: "absolute",
						bottom: 10,
						width: "100%"
					}}
				>
					<LinkItem icon={<Logout fontSize={"small"} />} name="Sign out" route="/login" />
				</div>
			</List>
		</Drawer>
	);
};
export default Sidenav;
