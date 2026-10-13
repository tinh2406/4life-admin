import httpClient from "../../services/http/client";
import { StatisticsParam, StatisticsResponse } from "../../type/Statistics";

export const bookingGrowth = async ({ NumberCycles, TypeCycles }: StatisticsParam): Promise<StatisticsResponse> => {
	const res = await httpClient.get<StatisticsResponse>("/statistics/total-bookings-life-growth", {
		params: {
			NumberCycles,
			TypeCycles
		}
	});
	res.data.valueCycles.reverse();
	return res.data;
};

export const salesGrowth = async (
	params: StatisticsParam & { IsPaid?: boolean }
): Promise<StatisticsResponse> => {
	const res = await httpClient.get<StatisticsResponse>("/statistics/total-sales-life-growth-for-admin", {
		params
	});
	res.data.valueCycles.reverse();
	return res.data;
};

export const userGrowth = async ({ NumberCycles, TypeCycles }: StatisticsParam): Promise<StatisticsResponse> => {
	const res = await httpClient.get<StatisticsResponse>("/statistics/total-users-life-growth", {
		params: {
			NumberCycles,
			TypeCycles
		}
	});
	res.data.valueCycles.reverse();
	return res.data;
};
