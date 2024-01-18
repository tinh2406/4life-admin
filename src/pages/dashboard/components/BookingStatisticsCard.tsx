import { Box, Grid } from "@mui/material";
import ComplexStatisticsCard from "./StatisticsCard";
import { Weekend } from "@mui/icons-material";
import { memo, useMemo } from "react";
import { useQuery } from "react-query";
import { bookingGrowth } from "../api/bookingStatistics";
import { CalcStatistics } from "../../../utils/CalcStatistics";
import { useStatistic } from "../../../context/statistics";

const BookingStatisticsCard = () => {
	const { value, setAction } = useStatistic();

	const { data: bookings } = useQuery({
		queryKey: ["statistics-bookings", value.Booking.params.TypeCycles],
		queryFn: async () => {
			return await bookingGrowth({
				NumberCycles: 2,
				TypeCycles: value.Booking.params.TypeCycles
			});
		},
		keepPreviousData: true
	});
	const calc: {
		status?: string;
		value?: string;
	} = useMemo(() => {
		if (!bookings) return {};
		return CalcStatistics(bookings);
	}, [bookings]);

	return (
		<Grid
			item
			xs={12}
			md={6}
			lg={4}
			onClick={() => {
				setAction("Booking");
			}}
		>
			<Box mb={1.5}>
				<ComplexStatisticsCard
					color="dark"
					icon={<Weekend fontSize="medium" />}
					title={`Bookings ${
						value.Booking.params.TypeCycles === "Day"
							? "today"
							: value.Booking.params.TypeCycles === "Week"
							? "this week"
							: value.Booking.params.TypeCycles === "Month"
							? "this month"
							: "this year"
					}`}
					count={bookings?.valueCycles[1]?.value || 0}
					percentage={{
						color: calc?.status === "more" ? "success" : calc?.status === "less" ? "error" : "light",
						amount: calc?.value as string,
						label: `than ${
							value.Booking.params.TypeCycles === "Day"
								? "yesterday"
								: value.Booking.params.TypeCycles === "Week"
								? "last week"
								: value.Booking.params.TypeCycles === "Month"
								? "last month"
								: "last year"
						}`
					}}
				/>
			</Box>
		</Grid>
	);
};

export default memo(BookingStatisticsCard);
