import { Box, Grid } from "@mui/material";
import BookingStatisticsCard from "./components/BookingStatisticsCard";
import UsersStatisticsCard from "./components/UsersStatisticsCard";
import BookingsReport from "./components/BookingsReport";
import UsersReport from "./components/UsersReport";
import Sales from "./components/Sales";
import SalesReport from "./components/SalesReport";
import SalesStatisticsCard from "./components/SalesStatisticsCard";

const DashBoard = () => {
	return (
		<>
			<Grid container spacing={3}>
				<BookingStatisticsCard />
				<SalesStatisticsCard />
				<UsersStatisticsCard />
			</Grid>
			<Box mt={4.5}>
				<Grid container spacing={3}>
					<BookingsReport />
					<UsersReport />
					<SalesReport />
				</Grid>
			</Box>
			<Box>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={12}>
						<Sales />
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default DashBoard;
