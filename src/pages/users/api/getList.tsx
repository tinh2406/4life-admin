import axiosInstance from "../../../constants/AxiosInstance";
import { PagingParams, PagingResponse } from "../../../type/Paging";
import { CollapseUser } from "./User";

export const getUsers = async (
	params: PagingParams<"Name" | "Email" | "PhoneNumber"> & { Role: "User" | "Mod" | "Admin" }
) => {
	const response = await axiosInstance.get<PagingResponse<CollapseUser>>("/users", {
		params: {
			...params
		}
	});
	return response.data;
};
