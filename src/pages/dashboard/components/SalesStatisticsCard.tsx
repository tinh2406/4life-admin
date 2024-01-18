import { Box, Grid } from "@mui/material";
import ComplexStatisticsCard from "./StatisticsCard";
import { Store } from "@mui/icons-material";
import { useQuery } from "react-query";
import { salesGrowth } from "../api/salesStatistics";
import { memo, useMemo } from "react";
import { CalcStatistics } from "../../../utils/CalcStatistics";
import { useStatistic } from "../../../context/statistics";

const SalesStasticsCard = () => {
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
			md={6}
			lg={4}
			onClick={() => {
				setAction("Sales");
			}}
		>
			<Box mb={1.5}>
				<ComplexStatisticsCard
					color="success"
					icon={<Store fontSize="medium" />}
					title={`Transactions ${
						value.Sales.params.TypeCycles === "Day"
							? "today"
							: value.Sales.params.TypeCycles === "Week"
							? "this week"
							: value.Sales.params.TypeCycles === "Month"
							? "this month"
							: "this year"
					}`}
					count={`${sales?.valueCycles[1].value || 0}$`}
					percentage={{
						color: calc?.status === "more" ? "success" : calc?.status === "less" ? "error" : "light",
						amount: calc?.value as string,
						label: `than ${
							value.Sales.params.TypeCycles === "Day"
								? "yesterday"
								: value.Sales.params.TypeCycles === "Week"
								? "last week"
								: value.Sales.params.TypeCycles === "Month"
								? "last month"
								: "last year"
						}`
					}}
				/>
			</Box>
		</Grid>
	);
};

export default memo(SalesStasticsCard);
