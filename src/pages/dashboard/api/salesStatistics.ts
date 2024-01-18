import axiosInstance from "../../../constants/AxiosInstance";
import { StatisticsParam, StatisticsResponse } from "../../../type/Statistics";

export const salesGrowth = async (params: StatisticsParam & { IsPaid?: boolean }) => {
	const res = await axiosInstance.get<StatisticsResponse>("/statistics/total-sales-life-growth-for-admin", {
		params
	});
	res.data.valueCycles.reverse();
	return res.data;
};
