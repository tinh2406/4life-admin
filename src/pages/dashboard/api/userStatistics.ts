import axiosInstance from "../../../constants/AxiosInstance";
import { StatisticsParam, StatisticsResponse } from "../../../type/Statistics";

export const userGrowth = async ({ NumberCycles, TypeCycles }: StatisticsParam) => {
	const res = await axiosInstance.get<StatisticsResponse>("/statistics/total-users-life-growth", {
			params: {
				NumberCycles,
				TypeCycles
			}
		})
	
    res.data.valueCycles.reverse()
    return res.data
};
