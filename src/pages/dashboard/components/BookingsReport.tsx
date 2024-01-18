import { Box, Grid } from "@mui/material";
import { memo, useMemo } from "react";
import { useQuery } from "react-query";
import { bookingGrowth } from "../api/bookingStatistics";
import ReportsLineChart from "./ReportsLineChart";
import { useStatistic } from "../../../context/statistics";

const BookingsReport = () => {
	const { value, setAction } = useStatistic();

	const { data: bookings } = useQuery({
		queryKey: ["reports-bookings", ...Object.values(value.BookingReport.params)],
		queryFn: async () => {
			return await bookingGrowth(value.BookingReport.params);
		},
		keepPreviousData: true
	});
	const calc = useMemo(() => {
		if (!bookings)
			return {
				labels: [],
				datasets: { label: "Bookings", data: [] }
			};
		return {
			labels: bookings.valueCycles.map(i => {
				if (value.BookingReport.params.TypeCycles === "Week")
					return new Date(Date.parse(i.dateFrom)).getDate().toString();
				if (value.BookingReport.params.TypeCycles === "Month")
					return new Date(Date.parse(i.dateFrom)).getMonth().toString();
				if (value.BookingReport.params.TypeCycles === "Year")
					return new Date(Date.parse(i.dateFrom)).getFullYear().toString();
				return new Date(Date.parse(i.dateFrom)).getDate().toString();
			}),
			datasets: {
				label: "Bookings",
				data: bookings.valueCycles.map(i => i.value)
			}
		};
	}, [bookings, value.BookingReport.params.TypeCycles]);

	return (
		<Grid
			item
			xs={12}
			md={6}
			xl={4}
			onClick={() => {
				setAction("BookingReport");
			}}
		>
			<Box mb={3}>
				<ReportsLineChart color="info" title="Bookings" description="" date="just updated" chart={calc} />
			</Box>
		</Grid>
	);
};

export default memo(BookingsReport);
