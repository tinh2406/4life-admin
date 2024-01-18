export type Column = {
	dateFrom: string;
	dateTo: string;
	cyclesNo: number;
	value: number;
};
export type StatisticsParam = {
	NumberCycles: number;
	TypeCycles: "Day" | "Week" | "Month" | "Year";
};
export type StatisticsResponse = {
	valueCycles: Column[];
	numberCycles: number;
	typeCycles: "Day" | "Week" | "Month" | "Year";
};
