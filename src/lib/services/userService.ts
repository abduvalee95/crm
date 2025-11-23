import type { RegistrationData, RegistrationResponse } from '../api/client';
import { apiClient } from '../api/client';
import type { CurrentUser, LoginData, LoginResponse, UpdateUserData, UpdateUserResponse } from '../interface/user';

export type { ApiError } from '../api/client';

export const userService = {
	register: (data: RegistrationData) => apiClient.post<RegistrationResponse>('/user/signup', data),
	login: (data: LoginData) => apiClient.post<LoginResponse>('/user/login', data),
	getCurrentUser: async (): Promise<CurrentUser> => {
		return apiClient.get<CurrentUser>('/user/checkAuth');
	},
	updateUser: async (data: UpdateUserData): Promise<UpdateUserResponse> => {
		return apiClient.put<UpdateUserResponse>('/user/update', data);
	},
	uploadAvatar: async (file: File): Promise<string> => {
		console.log('Uploading avatar:', file);
		const formData = new FormData();
		console.log('FormData:>>>>>>>>', formData);
		formData.append('avatar', file);
		return apiClient.uploadFile<string>('/user/upload-avatar', formData);
	},
};
