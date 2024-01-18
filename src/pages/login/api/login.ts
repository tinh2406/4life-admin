import axiosInstance from "../../../constants/AxiosInstance";
import { User } from "../../../type/User";
export type LoginData = {
	email: string;
	password: string;
};
export type LoginResponse = {
	token: string;
	role: string;
};

export const login = async (data: LoginData) => {
	const { token, role } = (await axiosInstance.post<LoginResponse>(`/auths/login`, data)).data;
	if (role !== "Admin") throw new Error("Invalid credentials");

	axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
	const user = (await axiosInstance.get<User>("users/profile")).data;

	return {
		token,
		user
	};
};
