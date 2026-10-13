import { Box, Typography } from "@mui/material";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import colors from "../assets/theme/base/colors";
import { HomeOutlined } from "@mui/icons-material";
import { memo } from "react";

type BreadcrumbsProps = {
	title: string;
	route: string[];
};

const Breadcrumbs = memo(function Breadcrumbs({ title, route }: BreadcrumbsProps) {
	const ancestorRoutes = route.slice(1, -1);
	const displayTitle = (title || "Dashboard").replace(/-/g, " ");

	return (
		<Box mr={{ xs: 0, xl: 4 }}>
			<MuiBreadcrumbs
				separator="/"
				sx={{
					"& .MuiBreadcrumbs-separator": {
						color: colors.text.main,
						fontSize: 12,
						mx: 0.5
					}
				}}
			>
				<Box
					component={Link}
					to="/"
					sx={{
						display: "inline-flex",
						alignItems: "center",
						color: colors.text.main,
						textDecoration: "none",
						"&:hover": { color: colors.primary.main }
					}}
				>
					<HomeOutlined sx={{ fontSize: 16 }} />
				</Box>

				{ancestorRoutes.map(segment => (
					<Box
						key={segment}
						component={Link}
						to={`/${segment}`}
						sx={{
							textDecoration: "none",
							color: colors.text.main,
							fontSize: 12,
							textTransform: "capitalize",
							"&:hover": { color: colors.primary.main }
						}}
					>
						{segment.replace(/-/g, " ")}
					</Box>
				))}

				<Typography variant="caption" color="text.primary" fontWeight="bold" textTransform="capitalize">
					{displayTitle}
				</Typography>
			</MuiBreadcrumbs>

			<Typography
				variant="h6"
				fontWeight="bold"
				textTransform="capitalize"
				color="text.primary"
				noWrap
				sx={{ mt: 0.25 }}
			>
				{displayTitle}
			</Typography>
		</Box>
	);
});

export default Breadcrumbs;
