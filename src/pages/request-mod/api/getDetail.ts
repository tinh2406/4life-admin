import axiosInstance from "../../../constants/AxiosInstance";
import { DetailUser } from "./User";

export const getUser = async (id: string) => {
	const response = await axiosInstance.get<DetailUser>(`/users/${id}`);
	return response.data;
};
