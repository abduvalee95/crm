import { Role } from '../enums/status';
import { UserRole } from './settings';

export interface SignupInput {
	fullName: string;
	email: string;
	password: string;
	confirmPassword?: string; // Backendda yo'q, faqat frontend validatsiya uchun
	phone?: string;
	role?: Role; // Backend bilan moslash (optional)
	position?: string;
	avatar?: string; // Backendda yo'q, frontend uchun
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string; // Backendda yo'q
	createdBy?: string; // Backendda yo'q
	updatedBy?: string; // Backendda yo'q
}

export interface SignupResponse {
	success: boolean;
	message: string;
	user: UserRole;
	token: string;
}

export interface CurrentUser {
	id: string;
	fullName: string;
	email: string;
	role?: Role;
	position?: string;
	avatar?: string;
	phone?: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface LoginResponse {
	id: string;
	fullName: string;
	email: string;
	role?: Role;
	position?: string;
	phone?: string;
	token: string;
	avatar?: string;
}

export interface UpdateUserData {
	fullName?: string;
	email?: string;
	phone?: string;
	position?: string;
	avatar?: string;
	currentPassword?: string;
	newPassword?: string;
}

export interface UpdateUserResponse {
	success: boolean;
	message?: string;
	user: CurrentUser;
	token?: string;
}
