import httpClient from "../../services/http/client";
import { PagingParams, PagingResponse } from "../../type/Paging";
import { AddLocationDTO, Location, UpdateLocationDTO } from "./types";

export const getLocations = async (params: PagingParams<"City" | "District">): Promise<PagingResponse<Location>> => {
	const response = await httpClient.get<PagingResponse<Location>>("/locations", {
		params
	});
	return response.data;
};

export const addLocation = async (location: AddLocationDTO): Promise<Location> => {
	const response = await httpClient.post<Location>("/locations", location);
	return response.data;
};

export const updateLocation = async (id: string, location: UpdateLocationDTO): Promise<Location> => {
	const response = await httpClient.put<Location>(`/locations/${id}`, location);
	return response.data;
};

export const deleteLocation = async (id: string): Promise<void> => {
	await httpClient.delete(`/locations/${id}`);
};
