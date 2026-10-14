import { Box, Grid } from "@mui/material";
import { memo, useMemo } from "react";
import { useQuery } from "react-query";
import { userGrowth } from "../api/userStatistics";
import ReportsBarChart from "./ReportsBarChart";
import { useStatistic } from "../../../context/statistics";

const UsersReport = memo(function UsersReport() {
	const { value, setAction } = useStatistic();
	const { data: users } = useQuery({
		queryKey: ["reports-users", ...Object.values(value.UserReport.params)],
		queryFn: async () => {
			return await userGrowth(value.UserReport.params);
		},
		keepPreviousData: true
	});
	const calc = useMemo(() => {
		if (!users)
			return {
				labels: [],
				datasets: { label: "Người dùng", data: [] }
			};
		return {
			labels: users.valueCycles.map(i => {
				if (value.UserReport.params.TypeCycles === "Week")
					return new Date(Date.parse(i.dateFrom)).getDate().toString();
				if (value.UserReport.params.TypeCycles === "Month")
					return new Date(Date.parse(i.dateFrom)).getMonth().toString();
				if (value.UserReport.params.TypeCycles === "Year")
					return new Date(Date.parse(i.dateFrom)).getFullYear().toString();
				return new Date(Date.parse(i.dateFrom)).getDate().toString();
			}),
			datasets: {
				label: "Người dùng",
				data: users.valueCycles.map(i => i.value)
			}
		};
	}, [users, value.UserReport.params.TypeCycles]);

	return (
		<Grid
			item
			xs={12}
			md={6}
			xl={4}
			onClick={() => {
				setAction("UserReport");
			}}
		>
			<Box mb={3}>
				<ReportsBarChart color="success" title="Người dùng" description="" date="vừa cập nhật" chart={calc} />
			</Box>
		</Grid>
	);
});

export default UsersReport;
