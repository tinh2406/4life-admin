import { PersonAdd } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { memo, useMemo } from "react";
import { useQuery } from "react-query";
import { userGrowth } from "../api/userStatistics";
import ComplexStatisticsCard from "./StatisticsCard";
import { CalcStatistics } from "../../../utils/CalcStatistics";
import { useStatistic } from "../../../context/statistics";

const UsersStatisticsCard = () => {
	const { value, setAction } = useStatistic();
	const { data: users } = useQuery({
		queryKey: ["statistics-users", value.User.params.TypeCycles],
		queryFn: async () => {
			return await userGrowth({
				NumberCycles: 2,
				TypeCycles: value.User.params.TypeCycles
			});
		},
		keepPreviousData: true
	});
	const calc: {
		status?: string;
		value?: string;
	} = useMemo(() => {
		if (!users) return {};
		return CalcStatistics(users);
	}, [users]);

	return (
		<Grid
			item
			xs={12}
			md={6}
			lg={4}
			onClick={() => {
				setAction("User");
			}}
		>
			<Box mb={1.5}>
				<ComplexStatisticsCard
					color="primary"
					icon={<PersonAdd fontSize="medium" />}
					title={`New users ${
						value.User.params.TypeCycles === "Day"
							? "today"
							: value.User.params.TypeCycles === "Week"
							? "this week"
							: value.User.params.TypeCycles === "Month"
							? "this month"
							: "this year"
					}`}
					count={users?.valueCycles[1]?.value || 0}
					percentage={{
						color: calc?.status === "more" ? "success" : calc?.status === "less" ? "error" : "light",
						amount: calc?.value as string,
						label: `than ${
							value.User.params.TypeCycles === "Day"
								? "yesterday"
								: value.User.params.TypeCycles === "Week"
								? "last week"
								: value.User.params.TypeCycles === "Month"
								? "last month"
								: "last year"
						}`
					}}
				/>
			</Box>
		</Grid>
	);
};

export default memo(UsersStatisticsCard);
