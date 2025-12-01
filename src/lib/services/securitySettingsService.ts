import { apiClient } from '../api/client';

export interface SecuritySettingsResponse {
	id: string;
	userId: string;
	twoFactorAuth: boolean;
	autoLogoutMinutes: number;
	activityLogging: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
}

export interface UpdateSecuritySettingsPayload {
	twoFactorAuth?: boolean;
	autoLogoutMinutes?: number;
	activityLogging?: boolean;
}

export const securitySettingsService = {
	getSettings: async (): Promise<SecuritySettingsResponse> => {
		const response = await apiClient.get<SecuritySettingsResponse>('/security-settings');
		// Ensure dates are strings
		return {
			...response,
			createdAt:
				typeof response.createdAt === 'string' ? response.createdAt : new Date(response.createdAt).toISOString(),
			updatedAt:
				typeof response.updatedAt === 'string' ? response.updatedAt : new Date(response.updatedAt).toISOString(),
		};
	},

	updateSettings: async (payload: UpdateSecuritySettingsPayload): Promise<SecuritySettingsResponse> => {
		const response = await apiClient.put<SecuritySettingsResponse>('/security-settings', payload);
		// Ensure dates are strings
		return {
			...response,
			createdAt:
				typeof response.createdAt === 'string' ? response.createdAt : new Date(response.createdAt).toISOString(),
			updatedAt:
				typeof response.updatedAt === 'string' ? response.updatedAt : new Date(response.updatedAt).toISOString(),
		};
	},
};
