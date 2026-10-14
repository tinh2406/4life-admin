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
		<Box sx={{ display: visible ? "flex" : "none", alignItems: "center", flexWrap: "wrap", gap: 0.75, width: { xs: "100%", md: "auto" }, minWidth: { md: 290 }, p: 0.5, bgcolor: "#171C1D", border: "1px solid #303738", borderRadius: "8px" }}>
			<Typography noWrap sx={{ color: "#B5BCB9", fontSize: 12, flex: "1 1 auto", minWidth: 108 }}>
				{action ? map[action] : "Chọn thẻ thống kê để lọc"}
			</Typography>
			{(action === "BookingReport" || action === "UserReport" || action === "SalesReport") && (
				<FormControl size="small" sx={{ minWidth: 72 }}>
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
								height: 400,
								"& .MuiPaper-root": { backgroundColor: "#171C1D", color: "#F2F4F3", border: "1px solid #303738", borderRadius: "8px" }
							},
							MenuListProps: { sx: { py: 0.5, "& .MuiMenuItem-root": { minHeight: 36, color: "#F2F4F3", "&:hover, &.Mui-selected, &.Mui-selected:hover": { backgroundColor: "#2C3435", color: "#FFFFFF" } } } }
						}}
						sx={selectControlSx}
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
				<FormControl size="small" sx={{ minWidth: 92 }}>
					<Select
						labelId="demo-controlled-open-select-label"
						id="demo-controlled-open-select"
						open={openTime}
						onClose={handleCloseTime}
						onOpen={handleOpenTime}
						value={value[action].params.TypeCycles}
						onChange={handleChangeTime}
						MenuProps={{
							PaperProps: { sx: { backgroundColor: "#171C1D", color: "#F2F4F3", border: "1px solid #303738", borderRadius: "8px" } },
							MenuListProps: { sx: { py: 0.5, "& .MuiMenuItem-root": { minHeight: 36, color: "#F2F4F3", "&:hover, &.Mui-selected, &.Mui-selected:hover": { backgroundColor: "#2C3435", color: "#FFFFFF" } } } }
						}}
						sx={selectControlSx}
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

const selectControlSx = {
	color: "#F4F7F6 !important",
	backgroundColor: "#2A2A2C !important",
	borderRadius: "6px",
	"& .MuiSvgIcon-root": { color: "#A1A8A5" },
	"& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent !important" },
	"& .MuiSelect-select": { py: "8px", pl: 1.25, pr: 3.5, color: "#F4F7F6 !important", backgroundColor: "#2A2A2C !important" },
	"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#5865F2 !important" },
	"&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#8792FF !important", borderWidth: "1px" },
	"&.Mui-focused": { boxShadow: "0 0 0 2px rgba(135, 146, 255, 0.16)" }
};

const MemoizedStatisticsFilter = memo(StatisticsFilter);
export default MemoizedStatisticsFilter;
