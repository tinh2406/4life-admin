import { Box, Grid } from "@mui/material";
import ComplexStatisticsCard from "./StatisticsCard";
import { Store } from "@mui/icons-material";
import { useQuery } from "react-query";
import { salesGrowth } from "../api/salesStatistics";
import { memo, useMemo } from "react";
import { CalcStatistics } from "../../../utils/CalcStatistics";
import { useStatistic } from "../../../context/statistics";

const SalesStasticsCard = memo(function SalesStasticsCard() {
	const { value, setAction } = useStatistic();
	const { data: sales } = useQuery({
		queryKey: ["statistics-sales",value.Sales.params.TypeCycles],
		queryFn: async () => {
			return await salesGrowth({
				NumberCycles: 2,
				TypeCycles: value.Sales.params.TypeCycles
			});
		},
		keepPreviousData: true
	});
	const calc: {
		status?: string;
		value?: string;
	} = useMemo(() => {
		if (!sales) return {};
		return CalcStatistics(sales);
	}, [sales]);
	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={6}
			lg={4}
			onClick={() => {
				setAction("Sales");
			}}
		>
			<Box mb={1.5}>
				<ComplexStatisticsCard
					icon={<Store fontSize="medium" />}
					title={`Giao dịch ${
						value.Sales.params.TypeCycles === "Day"
							? "hôm nay"
							: value.Sales.params.TypeCycles === "Week"
							? "tuần này"
							: value.Sales.params.TypeCycles === "Month"
							? "tháng này"
							: "năm nay"
					}`}
					count={`${sales?.valueCycles[1].value || 0}$`}
					percentage={{
						color: calc?.status === "more" ? "success" : calc?.status === "less" ? "error" : "light",
						amount: calc?.value as string,
						label: `than ${
							value.Sales.params.TypeCycles === "Day"
								? "hôm qua"
								: value.Sales.params.TypeCycles === "Week"
								? "tuần trước"
								: value.Sales.params.TypeCycles === "Month"
								? "tháng trước"
								: "năm trước"
						}`
					}}
				/>
			</Box>
		</Grid>
	);
});

export default SalesStasticsCard;
