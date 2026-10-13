import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useStatistic } from "../context/statistics";

const map = {
	Booking: "Booking statistics",
	User: "User statistics",
	BookingReport: "Booking report chart",
	UserReport: "User report chart",
	Sales: "Sales statistics",
	SalesReport: "Sales report chart"
};

const StatisticsFilter = ({ visible }: { visible: boolean }) => {
	const [openTime, setOpenTime] = useState(false);
	const [openCol, setOpenCol] = useState(false);
	const { value, action } = useStatistic();

	const handleChangeTime = (event: SelectChangeEvent) => {
		if (action) {
			const selectedCycle = event.target.value as "Day" | "Week" | "Month" | "Year";
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			value[action].setParams((last: any) => ({
				...last,
				TypeCycles: selectedCycle
			}));
		}
	};

	const handleChangeCol = (event: SelectChangeEvent) => {
		if (action === "BookingReport" || action === "UserReport" || action === "SalesReport") {
			value[action].setParams(last => ({
				...last,
				NumberCycles: Number(event.target.value)
			}));
		}
	};

	const handleCloseTime = () => setOpenTime(false);
	const handleOpenTime = () => setOpenTime(true);
	const handleCloseCol = () => setOpenCol(false);
	const handleOpenCol = () => setOpenCol(true);

	return (
		<Box sx={{ display: visible ? "flex" : "none", alignItems: "center" }}>
			<Typography>{action ? map[action] : "Click statistic card to change filter"}</Typography>
			{(action === "BookingReport" || action === "UserReport" || action === "SalesReport") && (
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<Select
						labelId="col"
						id="demo-controlled-open-select"
						open={openCol}
						onClose={handleCloseCol}
						onOpen={handleOpenCol}
						value={value[action].params.NumberCycles.toString()}
						onChange={handleChangeCol}
						MenuProps={{
							sx: {
								height: 400
							}
						}}
					>
						{[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => (
							<MenuItem key={i} value={i}>
								{i}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
			{action && (
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<Select
						labelId="demo-controlled-open-select-label"
						id="demo-controlled-open-select"
						open={openTime}
						onClose={handleCloseTime}
						onOpen={handleOpenTime}
						value={value[action].params.TypeCycles}
						onChange={handleChangeTime}
					>
						<MenuItem value={"Day"}>Day</MenuItem>
						<MenuItem value={"Week"}>Week</MenuItem>
						<MenuItem value={"Month"}>Month</MenuItem>
						<MenuItem value={"Year"}>Year</MenuItem>
					</Select>
				</FormControl>
			)}
		</Box>
	);
};

const MemoizedStatisticsFilter = memo(StatisticsFilter);
export default MemoizedStatisticsFilter;
