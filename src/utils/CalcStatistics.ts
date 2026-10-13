import { StatisticsResponse } from "../type/Statistics";

export const CalcStatistics = (values?: StatisticsResponse) => {
	if (!values || !values.valueCycles || values.valueCycles.length < 2) {
		return {
			status: "equal",
			value: "0%"
		};
	}

	const prev = values.valueCycles[0]?.value ?? 0;
	const curr = values.valueCycles[1]?.value ?? 0;

	if (curr === prev) {
		return {
			status: "equal",
			value: "0%"
		};
	}

	if (prev > curr) {
		if (prev === 0) {
			return {
				status: "less",
				value: "-0%"
			};
		}
		const diff = ((prev - curr) / prev) * 100;
		return {
			status: "less",
			value: `-${diff.toFixed(0)}%`
		};
	}

	// curr > prev
	if (prev === 0) {
		return {
			status: "more",
			value: `+${curr}`
		};
	}

	const diff = ((curr - prev) / prev) * 100;
	return {
		status: "more",
		value: `+${diff.toFixed(0)}%`
	};
};
