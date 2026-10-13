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
		<Box display="flex" alignItems="center">
			<MuiBreadcrumbs
				separator="/"
				sx={{
					"& .MuiBreadcrumbs-separator": {
						color: colors.grey[500],
						fontSize: 12,
						mx: 0.75
					}
				}}
			>
				<Box
					component={Link}
					to="/"
					sx={{
						display: "inline-flex",
						alignItems: "center",
						color: colors.grey[600],
						textDecoration: "none",
						transition: "color 150ms ease",
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
							color: colors.grey[600],
							fontSize: 13,
							fontWeight: 500,
							textTransform: "capitalize",
							transition: "color 150ms ease",
							"&:hover": { color: colors.primary.main }
						}}
					>
						{segment.replace(/-/g, " ")}
					</Box>
				))}

				<Typography
					variant="body2"
					sx={{
						color: colors.text.focus,
						fontWeight: 600,
						fontSize: 13.5,
						textTransform: "capitalize",
						letterSpacing: "-0.01em"
					}}
				>
					{displayTitle}
				</Typography>
			</MuiBreadcrumbs>
		</Box>
	);
});

export default Breadcrumbs;
