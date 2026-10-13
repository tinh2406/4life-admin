import httpClient from "../../services/http/client";
import { User } from "../users/types";
import { LoginData, LoginResponse } from "./types";

export const login = async (data: LoginData): Promise<{ token: string; user: User }> => {
	const { token, role } = (await httpClient.post<LoginResponse>("/auths/login", data)).data;
	if (role !== "Admin") throw new Error("Invalid credentials");

	const user = (
		await httpClient.get<User>("users/profile", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	).data;

	return {
		token,
		user
	};
};
