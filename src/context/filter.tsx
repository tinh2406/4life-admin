/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { PagingParams } from "../type/Paging";

export type UsersParams = PagingParams<"Name" | "Email" | "PhoneNumber"> & { Role: "User" | "Mod" | "Admin" };

type FilterContextType = {
	requestParams: PagingParams<"Name" | "Email" | "PhoneNumber">;
	userParams: UsersParams;
	amenityParams: PagingParams<"Name" | "CreatedDate">;
	locationParams: PagingParams<"City" | "District">;
	setUserParams?: React.Dispatch<React.SetStateAction<UsersParams>>;
	setRequestParams?: React.Dispatch<React.SetStateAction<PagingParams<"Name" | "Email" | "PhoneNumber">>>;
	setAmenityParams?: React.Dispatch<React.SetStateAction<PagingParams<"Name" | "CreatedDate">>>;
	setLocationParams?: React.Dispatch<React.SetStateAction<PagingParams<"City" | "District">>>;
};

const FilterContext = createContext<FilterContextType>({
	requestParams: {
		PageSize: 12,
		IsDescending: false
	},
	userParams: {
		Role: "User"
	},
	amenityParams: {},
	locationParams: {}
});

export const useFilter = () => {
	return useContext(FilterContext);
};

const sanitizeParams = <T extends { Keyword?: string }>(params: T): T => {
	if (params.Keyword === "") {
		const copy = { ...params };
		delete copy.Keyword;
		return copy;
	}
	return params;
};

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
	const [requestParams, setRequestParams] = useState<PagingParams<"Name" | "Email" | "PhoneNumber">>({
		PageSize: 12,
		SortBy: "Name",
		IsDescending: false
	});
	const [userParams, setUserParams] = useState<UsersParams>({
		Role: "User",
		SortBy: "Email",
		IsDescending: false
	});
	const [amenityParams, setAmenityParams] = useState<PagingParams<"Name" | "CreatedDate">>({
		SortBy: "Name",
		IsDescending: false
	});
	const [locationParams, setLocationParams] = useState<PagingParams<"City" | "District">>({
		SortBy: "City",
		IsDescending: false
	});

	const value = useMemo(
		() => ({
			requestParams: sanitizeParams(requestParams),
			userParams: sanitizeParams(userParams),
			amenityParams: sanitizeParams(amenityParams),
			locationParams: sanitizeParams(locationParams),
			setUserParams,
			setRequestParams,
			setAmenityParams,
			setLocationParams
		}),
		[requestParams, userParams, amenityParams, locationParams]
	);

	return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
