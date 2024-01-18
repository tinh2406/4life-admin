import axiosInstance from "../../../constants/AxiosInstance";
import { UploadImage } from "../../../utils/UploadImage";
import { Amenity, UpdateAmenityDTO } from "./Amenity";

export const updateAmenity = async (id: string, amenity: UpdateAmenityDTO) => {
    try {
		const url = await UploadImage(amenity.icon as File);
		const response = await axiosInstance.put<Amenity>(`/amenities/${id}`, {
			id:amenity.id,
			name: amenity.name,
			icon: url
		});
        return response.data;
	} catch (error) {
		const response = await axiosInstance.put<Amenity>(`/amenities/${id}`, {
			id:amenity.id,
			name: amenity.name,
			icon: amenity.icon
		});
        return response.data;
	}
};