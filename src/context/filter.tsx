import { createContext, useContext, useState } from "react";
import { PagingParams } from "../type/Paging";

// type RequestModParams = PagingParams<"Name" | "Email" | "PhoneNumber">;
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
		IsDescending:false
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

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
	const [requestParams, setRequestParams] = useState<PagingParams<"Name" | "Email" | "PhoneNumber">>({
		PageSize: 12,
		SortBy:"Name",
		IsDescending:false,
	});
	const [userParams, setUserParams] = useState<UsersParams>({ Role: "User",SortBy:"Email",IsDescending:false });
	const [amenityParams, setAmenityParams] = useState<PagingParams<"Name" | "CreatedDate">>({
		SortBy:"Name",
		IsDescending:false
	});
	const [locationParams, setLocationParams] = useState<PagingParams<"City" | "District">>({
		SortBy:"City",
		IsDescending:false
	});

	if (requestParams.Keyword === "") delete requestParams.Keyword;
	if (userParams.Keyword === "") delete userParams.Keyword;
	if (amenityParams.Keyword === "") delete amenityParams.Keyword;
	if (locationParams.Keyword === "") delete locationParams.Keyword;

	const value = {
		requestParams,
		userParams,
		amenityParams,
		locationParams,
		setUserParams,
		setRequestParams,
		setAmenityParams,
		setLocationParams
	};

	return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
