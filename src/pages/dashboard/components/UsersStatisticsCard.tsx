import { PersonAdd } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { memo, useMemo } from "react";
import { useQuery } from "react-query";
import { userGrowth } from "../api/userStatistics";
import ComplexStatisticsCard from "./StatisticsCard";
import { CalcStatistics } from "../../../utils/CalcStatistics";
import { useStatistic } from "../../../context/statistics";

const UsersStatisticsCard = memo(function UsersStatisticsCard() {
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
			sm={6}
			md={6}
			lg={4}
			onClick={() => {
				setAction("User");
			}}
		>
			<Box mb={1.5}>
				<ComplexStatisticsCard
					icon={<PersonAdd fontSize="medium" />}
					title={`Người dùng mới ${
						value.User.params.TypeCycles === "Day"
							? "hôm nay"
							: value.User.params.TypeCycles === "Week"
							? "tuần này"
							: value.User.params.TypeCycles === "Month"
							? "tháng này"
							: "năm nay"
					}`}
					count={users?.valueCycles[1]?.value || 0}
					percentage={{
						color: calc?.status === "more" ? "success" : calc?.status === "less" ? "error" : "light",
						amount: calc?.value as string,
						label: `than ${
							value.User.params.TypeCycles === "Day"
								? "hôm qua"
								: value.User.params.TypeCycles === "Week"
								? "tuần trước"
								: value.User.params.TypeCycles === "Month"
								? "tháng trước"
								: "năm trước"
						}`
					}}
				/>
			</Box>
		</Grid>
	);
});

export default UsersStatisticsCard;
