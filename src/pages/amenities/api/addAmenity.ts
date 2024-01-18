import axiosInstance from "../../../constants/AxiosInstance";
import { UploadImage } from "../../../utils/UploadImage";
import { AddAmenityDTO, Amenity } from "./Amenity";

export const addAmenity = async (amenity: AddAmenityDTO) => {
	try {
		const url = await UploadImage(amenity.icon as File);
		const response = await axiosInstance.post<Amenity>("/amenities", {
			name: amenity.name,
			icon: url
		});
        return response.data;
	} catch (error) {
		console.log(error);
	}
	return;
};