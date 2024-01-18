import axiosInstance from "../../../constants/AxiosInstance";
import { PagingParams, PagingResponse } from "../../../type/Paging";
import { Location } from "./Location";

export const getLocations = async (params: PagingParams<"City" | "District">) => {
	const response = await axiosInstance.get<PagingResponse<Location>>("/locations", {
		params: {
			...params
		}
	});
	return response.data;
};
