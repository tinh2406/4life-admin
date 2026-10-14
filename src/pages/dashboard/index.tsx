import { Box, Grid, Typography } from "@mui/material";
import StatisticsFilter from "../../components/StatisticsFilter";
import BookingStatisticsCard from "./components/BookingStatisticsCard";
import UsersStatisticsCard from "./components/UsersStatisticsCard";
import BookingsReport from "./components/BookingsReport";
import UsersReport from "./components/UsersReport";
import Sales from "./components/Sales";
import SalesReport from "./components/SalesReport";
import SalesStatisticsCard from "./components/SalesStatisticsCard";

const DashBoard = () => {
	return (
		<Box sx={{ width: "100%", minWidth: 0 }}>
			<Box
				sx={{
					display: "flex",
					alignItems: { xs: "stretch", md: "center" },
					justifyContent: "space-between",
					flexDirection: { xs: "column", md: "row" },
					gap: 2.5,
					mb: { xs: 3, md: 3.5 }
				}}
			>
				<Box>
					<Typography
						component="h1"
						variant="h5"
						sx={{ color: "#F2F4F3", fontWeight: 700, letterSpacing: "-0.03em", mb: 0.5 }}
					>
						Overview
					</Typography>
					<Typography variant="body2" sx={{ color: "#B5BCB9" }}>
						Monitor bookings, revenue, and platform activity.
					</Typography>
				</Box>
				<Box sx={{ width: { xs: "100%", md: "auto" }, minWidth: 0 }}>
					<StatisticsFilter visible />
				</Box>
			</Box>

			<Grid container spacing={{ xs: 1.5, md: 2 }}>
				<BookingStatisticsCard />
				<SalesStatisticsCard />
				<UsersStatisticsCard />
			</Grid>

			<Box mt={{ xs: 3, md: 3.5 }}>
				<Grid container spacing={{ xs: 1.5, md: 2 }}>
					<BookingsReport />
					<UsersReport />
					<SalesReport />
				</Grid>
			</Box>

			<Box mt={{ xs: 1.5, md: 2 }}>
				<Grid container spacing={{ xs: 1.5, md: 2 }}>
					<Grid item xs={12}>
						<Sales />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default DashBoard;
