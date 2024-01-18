import { StatisticsResponse } from "../type/Statistics";

export const CalcStatistics = (values: StatisticsResponse) => {
	if (values.valueCycles[1].value === values.valueCycles[0].value)
		return {
			status: "equal",
			value: "0"
		};
	else if (values.valueCycles[0].value > values.valueCycles[1].value)
		return {
			status: "less",
			value: "-" + (100 - (100 * values.valueCycles[1].value) / values.valueCycles[0].value).toFixed(0) + "%"
		};
	else
		return {
			status: "more",
			value:
				values.valueCycles[0].value === 0
					? `+${values.valueCycles[1].value}`
					: "+" + (100 * values.valueCycles[1].value - 100 / values.valueCycles[0].value).toFixed(0) + "%"
		};
};
