import httpClient from "../../services/http/client";
import { PagingParams, PagingResponse } from "../../type/Paging";
import { CollapseUser, DetailUser } from "./types";

export type UsersQueryParams = PagingParams<"Name" | "Email" | "PhoneNumber"> & {
	Role: "User" | "Mod" | "Admin";
};

export const getUsers = async (params: UsersQueryParams): Promise<PagingResponse<CollapseUser>> => {
	const response = await httpClient.get<PagingResponse<CollapseUser>>("/users", {
		params
	});
	return response.data;
};

export const getUser = async (id: string): Promise<DetailUser> => {
	const response = await httpClient.get<DetailUser>(`/users/${id}`);
	return response.data;
};
