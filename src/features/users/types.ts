export type UserRole = "User" | "Staff" | "Mod" | "Admin";
export type UserStatus = "Active" | "Blocked";

export type User = {
	avatar?: string;
	dateOfBirth?: string;
	description?: string;
	email: string;
	gender: boolean;
	id: string;
	name: string;
	phoneNumber?: string;
	role?: UserRole;
	status?: UserStatus;
	isBlocked?: boolean;
	blockReason?: string;
};

export type CollapseUser = {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	avatar: string;
	role?: UserRole;
	status?: UserStatus;
	isBlocked?: boolean;
	blockReason?: string;
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
	role?: UserRole;
	status?: UserStatus;
	isBlocked?: boolean;
	blockReason?: string;
};

