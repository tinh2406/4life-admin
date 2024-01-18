import axiosInstance from "../../../constants/AxiosInstance";
import { PagingParams, PagingResponse } from "../../../type/Paging";
import { Amenity } from "./Amenity";

export const getAmenities = async (
	params: PagingParams<"Name" |"CreatedDate">
) => {
	const response = await axiosInstance.get<PagingResponse<Amenity>>("/amenities", {
		params: {
			...params
		}
	});
	return response.data;
};
