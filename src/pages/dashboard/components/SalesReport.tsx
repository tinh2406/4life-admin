import { Box, Grid } from "@mui/material";
import { memo, useMemo } from "react";
import { useQuery } from "react-query";
import { salesGrowth } from "../api/salesStatistics";
import ReportsMultiLineChart from "./ReportsMultiLineChart";
import { useStatistic } from "../../../context/statistics";

const SalesReport = () => {
	const { value, setAction } = useStatistic();
	const { data: sales_total } = useQuery({
		queryKey: ["reports-sales", ...Object.values(value.SalesReport.params)],
		queryFn: async () => {
			return await salesGrowth({
				NumberCycles: value.SalesReport.params.NumberCycles,
				TypeCycles: value.SalesReport.params.TypeCycles
			});
		},
		keepPreviousData: true
	});
	const { data: sales_unpaid } = useQuery({
		queryKey: ["reports-sales-unpaid", ...Object.values(value.SalesReport.params)],
		queryFn: async () => {
			return await salesGrowth({
				NumberCycles: value.SalesReport.params.NumberCycles,
				TypeCycles: value.SalesReport.params.TypeCycles,
				IsPaid: false
			});
		},
		keepPreviousData: true
	});
	const { data: sales_paid } = useQuery({
		queryKey: ["reports-sales-paid", ...Object.values(value.SalesReport.params)],
		queryFn: async () => {
			return await salesGrowth({
				NumberCycles: value.SalesReport.params.NumberCycles,
				TypeCycles: value.SalesReport.params.TypeCycles,
				IsPaid: true
			});
		},
		keepPreviousData: true
	});

	const calc = useMemo(() => {
		if (!sales_paid || !sales_unpaid || !sales_total)
			return {
				labels: [],
				datasets: [
					{ label: "Unpaid", data: [] },
					{ label: "Paid", data: [] },
					{ label: "Total", data: [] }
				]
			};
		return {
			labels: sales_total.valueCycles.map(i => {
				if (value.SalesReport.params.TypeCycles === "Week")
					return new Date(Date.parse(i.dateFrom)).getDate().toString();
				if (value.SalesReport.params.TypeCycles === "Month")
					return new Date(Date.parse(i.dateFrom)).getMonth().toString();
				if (value.SalesReport.params.TypeCycles === "Year")
					return new Date(Date.parse(i.dateFrom)).getFullYear().toString();
				return new Date(Date.parse(i.dateFrom)).getDate().toString();
			}),
			datasets: [
				{
					label: "Unpaid",
					data: sales_unpaid.valueCycles.map(i => i.value)
				},
				{
					label: "Paid",
					data: sales_paid.valueCycles.map(i => i.value)
				},
				{
					label: "Total",
					data: sales_total.valueCycles.map(i => i.value)
				}
			]
		};
	}, [sales_total, sales_paid, sales_unpaid, value.SalesReport.params.TypeCycles]);

	return (
		<Grid
			item
			xs={12}
			md={6}
			xl={4}
			onClick={() => {
				setAction("SalesReport");
			}}
		>
			<Box mb={3}>
				<ReportsMultiLineChart
					color="dark"
					title="Transactions"
					description=""
					date="just updated"
					chart={calc}
				/>
			</Box>
		</Grid>
	);
};

export default memo(SalesReport);
