import { apiClient } from '../api/client';
import { NotificationCategory, NotificationChannel, NotificationFrequency } from '../enums/notification';

export interface NotificationSettingsResponse {
	id: string;
	userId: string;
	channels: {
		[NotificationChannel.EMAIL]: boolean;
		[NotificationChannel.PUSH]: boolean;
		[NotificationChannel.SMS]: boolean;
		[NotificationChannel.DESKTOP]: boolean;
	};
	categories: {
		[NotificationCategory.DEALS]: boolean;
		[NotificationCategory.TASKS]: boolean;
		[NotificationCategory.MESSAGES]: boolean;
		[NotificationCategory.SYSTEM]: boolean;
		[NotificationCategory.MARKETING]: boolean;
	};
	frequency: NotificationFrequency;
	createdAt: string | Date;
	updatedAt: string | Date;
}

export interface UpdateNotificationSettingsPayload {
	channels?: {
		[NotificationChannel.EMAIL]?: boolean;
		[NotificationChannel.PUSH]?: boolean;
		[NotificationChannel.SMS]?: boolean;
		[NotificationChannel.DESKTOP]?: boolean;
	};
	categories?: {
		[NotificationCategory.DEALS]?: boolean;
		[NotificationCategory.TASKS]?: boolean;
		[NotificationCategory.MESSAGES]?: boolean;
		[NotificationCategory.SYSTEM]?: boolean;
		[NotificationCategory.MARKETING]?: boolean;
	};
	frequency?: NotificationFrequency;
}

export const notificationService = {
	getSettings: async (): Promise<NotificationSettingsResponse> => {
		const response = await apiClient.get<NotificationSettingsResponse>('/notification-settings');
		// Ensure dates are strings
		return {
			...response,
			createdAt:
				typeof response.createdAt === 'string' ? response.createdAt : new Date(response.createdAt).toISOString(),
			updatedAt:
				typeof response.updatedAt === 'string' ? response.updatedAt : new Date(response.updatedAt).toISOString(),
		};
	},

	updateSettings: async (payload: UpdateNotificationSettingsPayload): Promise<NotificationSettingsResponse> => {
		const response = await apiClient.put<NotificationSettingsResponse>('/notification-settings', payload);
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
