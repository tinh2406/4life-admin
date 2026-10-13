import httpClient from "../../services/http/client";
import { PagingParams, PagingResponse } from "../../type/Paging";
import { CollapseUser } from "../users/types";

export const getRequestMod = async (
	params: PagingParams<"Name" | "Email" | "PhoneNumber">
): Promise<PagingResponse<CollapseUser>> => {
	const response = await httpClient.get<PagingResponse<CollapseUser>>(
		"/users/users-waiting-for-approval",
		{
			params
		}
	);
	return response.data;
};

export const acceptMod = async (id: string): Promise<void> => {
	await httpClient.put(`/users/approve-user/${id}`);
};

export const denyMod = async (id: string): Promise<void> => {
	await httpClient.put(`/users/reject-user/${id}`);
};
