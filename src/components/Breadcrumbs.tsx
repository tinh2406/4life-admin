import { Box, Typography } from "@mui/material";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import colors from "../assets/theme/base/colors";
import { Home } from "@mui/icons-material";
function Breadcrumbs({ title, route }: { title: string; route: string[] }) {
	const routes = route.slice(1, -1);
    
	return (
		<Box mr={{ xs: 0, xl: 8 }}>
			<MuiBreadcrumbs
				sx={{
					"& .MuiBreadcrumbs-separator": {
						color: colors.dark.main
					}
				}}
			>
				<Link to="/">
					<Typography
						component="span"
						variant="body2"
						color={colors.dark.main}
						sx={{ lineHeight: 0, opacity: 0.8 }}
					>
						<Home/>
					</Typography>
				</Link>
				{routes.map(el => (
					<Link to={`/${el}`} key={el}>
						<Typography
							component="span"
							variant="button"
							fontWeight="regular"
							textTransform="capitalize"
							color={colors.dark.main}
							sx={{ lineHeight: 0, opacity: 0.8 }}
						>
							{el}
						</Typography>
					</Link>
				))}
				<Typography
					variant="button"
					fontWeight="regular"
					textTransform="capitalize"
					color={colors.dark.main}
					sx={{ lineHeight: 0 }}
				>
					{title.replace("-", " ")}
				</Typography>
			</MuiBreadcrumbs>
			<Typography fontWeight="bold" textTransform="capitalize" variant="h6" color={colors.dark.main} noWrap>
				{title.replace("-", " ")||"Dashboard"}
			</Typography>
		</Box>
	);
}

export default Breadcrumbs;
