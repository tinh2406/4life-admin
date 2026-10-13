export type LoginData = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: string;
	role: string;
};
