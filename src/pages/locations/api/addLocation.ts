import axiosInstance from "../../../constants/AxiosInstance";
import { AddLocationDTO, Location } from "./Location";

export const addLocation = async (location: AddLocationDTO) => {
	const response = await axiosInstance.post<Location>("/locations", location);
	return response.data;
};
