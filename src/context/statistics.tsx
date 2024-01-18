import { createContext, useContext, useState } from "react";
import { StatisticsParam } from "../type/Statistics";

type TypeReport = "BookingReport" | "UserReport" | "SalesReport" | "Booking" | "User" | "Sales";
export type Analyst = {
	TypeCycles: "Day" | "Week" | "Month" | "Year";
};
type StatisticsContextType = {
	action?: TypeReport;
	setAction: React.Dispatch<React.SetStateAction<TypeReport>>;
	value: {
		BookingReport: {
			params: StatisticsParam;
			setParams: React.Dispatch<React.SetStateAction<StatisticsParam>>;
		};
		UserReport: {
			params: StatisticsParam;
			setParams: React.Dispatch<React.SetStateAction<StatisticsParam>>;
		};
		SalesReport:{
			params: StatisticsParam;
			setParams: React.Dispatch<React.SetStateAction<StatisticsParam>>;
		}
		Booking: {
			params: Analyst;
			setParams: React.Dispatch<React.SetStateAction<Analyst>>;
		};
		User: {
			params: Analyst;
			setParams: React.Dispatch<React.SetStateAction<Analyst>>;
		};
		Sales: {
			params: Analyst;
			setParams: React.Dispatch<React.SetStateAction<Analyst>>;
		};
	};
};

const StatisticsContext = createContext<StatisticsContextType>({
	setAction: () => {},
	value: {
		Booking: {
			params: {
				TypeCycles: "Week"
			},
			setParams: () => {}
		},
		Sales: {
			params: {
				TypeCycles: "Week"
			},
			setParams: () => {}
		},
		User: {
			params: {
				TypeCycles: "Week"
			},
			setParams: () => {}
		},
		BookingReport: {
			params: {
				TypeCycles: "Week",
				NumberCycles: 5
			},
			setParams: () => {}
		},
		UserReport: {
			params: {
				TypeCycles: "Week",
				NumberCycles: 5
			},
			setParams: () => {}
		},
		SalesReport:{
			params:{
				TypeCycles: "Week",
				NumberCycles:5,
			},
			setParams: () => {}
		}
	}
});

export const useStatistic = () => {
	return useContext(StatisticsContext);
};

export const StatisticsProvider = ({ children }: { children: React.ReactNode }) => {
	const [action, setAction] = useState<TypeReport>("Booking");
	const [bookingReportParams, setBookingReportParams] = useState<StatisticsParam>({
		NumberCycles: 5,
		TypeCycles: "Week"
	});
	const [userReportParams, setUserReportParams] = useState<StatisticsParam>({
		NumberCycles: 5,
		TypeCycles: "Week"
	});
	const [salesReportParams, setSalesReportParams] = useState<StatisticsParam>({
		NumberCycles: 5,
		TypeCycles: "Week"
	});
	const [userParams, setUserParams] = useState<Analyst>({
		TypeCycles: "Week"
	});
	const [bookingParams, setBookingParams] = useState<Analyst>({
		TypeCycles: "Week"
	});
	const [salesParams, setSalesParams] = useState<Analyst>({
		TypeCycles: "Week"
	});
	const value: StatisticsContextType = {
		action,
		setAction,
		value: {
			BookingReport: {
				params: bookingReportParams,
				setParams: setBookingReportParams
			},
			UserReport: {
				params: userReportParams,
				setParams: setUserReportParams
			},
			User: {
				params: userParams,
				setParams: setUserParams
			},
			Booking: {
				params: bookingParams,
				setParams: setBookingParams
			},
			Sales: {
				params: salesParams,
				setParams: setSalesParams
			},
			SalesReport:{
				params: salesReportParams,
				setParams: setSalesReportParams
			}
		}
	};

	return <StatisticsContext.Provider value={value}>{children}</StatisticsContext.Provider>;
};
