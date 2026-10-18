import httpClient from "../../services/http/client";
import { PagingParams, PagingResponse } from "../../type/Paging";
import { CollapseUser, DetailUser, UserRole, UserStatus } from "./types";

export type UsersQueryParams = PagingParams<"Name" | "Email" | "PhoneNumber"> & {
	Role?: "All" | UserRole;
	Status?: "All" | UserStatus;
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

export const changeUserRole = async (id: string, role: UserRole): Promise<{ message: string; role: UserRole }> => {
	const response = await httpClient.put<{ message: string; role: UserRole }>(`/users/${id}/role`, {
		role
	});
	return response.data;
};

export const blockUser = async (
	id: string,
	isBlocked: boolean,
	reason?: string
): Promise<{ message: string; isBlocked: boolean }> => {
	const response = await httpClient.put<{ message: string; isBlocked: boolean }>(`/users/${id}/block`, {
		isBlocked,
		reason
	});
	return response.data;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
	const response = await httpClient.delete<{ message: string }>(`/users/${id}`);
	return response.data;
};

