import axiosInstance from "../../../constants/AxiosInstance";

export const deleteAmenity = async (id: string) => {
	const response = await axiosInstance.delete(`/amenities/${id}`);
	return response.data;
};
