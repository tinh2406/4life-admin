export type Location = {
	id: string;
	district: string;
	city: string;
};

export type AddLocationDTO = {
	city: string;
	district: string;
};
export type UpdateLocationDTO = AddLocationDTO;
