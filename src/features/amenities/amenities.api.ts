import httpClient from "../../services/http/client";
import { uploadImage } from "../../services/api/upload";
import { PagingParams, PagingResponse } from "../../type/Paging";
import { AddAmenityDTO, Amenity, UpdateAmenityDTO } from "./types";

export const getAmenities = async (params: PagingParams<"Name" | "CreatedDate">): Promise<PagingResponse<Amenity>> => {
	const response = await httpClient.get<PagingResponse<Amenity>>("/amenities", {
		params
	});
	return response.data;
};

export const addAmenity = async (amenity: AddAmenityDTO): Promise<Amenity> => {
	const iconUrl = amenity.icon instanceof File ? await uploadImage(amenity.icon) : amenity.icon;
	const response = await httpClient.post<Amenity>("/amenities", {
		name: amenity.name,
		icon: iconUrl
	});
	return response.data;
};

export const updateAmenity = async (id: string, amenity: UpdateAmenityDTO): Promise<Amenity> => {
	const iconUrl = amenity.icon instanceof File ? await uploadImage(amenity.icon) : amenity.icon;
	const response = await httpClient.put<Amenity>(`/amenities/${id}`, {
		id: amenity.id,
		name: amenity.name,
		icon: iconUrl
	});
	return response.data;
};

export const deleteAmenity = async (id: string): Promise<void> => {
	await httpClient.delete(`/amenities/${id}`);
};
