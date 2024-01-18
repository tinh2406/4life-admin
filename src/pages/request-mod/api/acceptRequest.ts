import axiosInstance from "../../../constants/AxiosInstance";

export const acceptMod = async (id: string) => {
	await axiosInstance.put(`/users/approve-user/${id}`);
};
