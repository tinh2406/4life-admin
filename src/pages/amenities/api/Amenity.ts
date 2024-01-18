export type Amenity = {
	id: string;
	name: string;
	icon: string;
};
export type AddAmenityDTO = {
	name: string;
	icon: File | string;
};
export type UpdateAmenityDTO = AddAmenityDTO & { id: string };
