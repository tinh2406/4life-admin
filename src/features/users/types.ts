export type User = {
	avatar?: string;
	dateOfBirth?: string;
	description?: string;
	email: string;
	gender: boolean;
	id: string;
	name: string;
	phoneNumber?: string;
};

export type CollapseUser = {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	avatar: string;
};

export type DetailUser = {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	avatar: string;
	dateOfBirth: string;
	gender: boolean;
	description: string;
	frontIdentityCard: string;
	backIdentityCard: string;
};
