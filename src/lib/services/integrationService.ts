import { apiClient } from '../api/client';

export interface TelegramSettingsResponse {
	enabled: boolean;
	defaultChatId: string | null;
	botTokenPreview: string | null;
	source: 'database' | 'env' | 'none';
	updatedAt?: string;
}

export interface TelegramSettingsPayload {
	enabled?: boolean;
	botToken?: string;
	defaultChatId?: string;
}

export interface TelegramTestPayload extends TelegramSettingsPayload {
	message?: string;
}

export const integrationService = {
	getTelegramSettings: async () => {
		return apiClient.get<TelegramSettingsResponse>('/integrations/telegram/settings');
	},

	updateTelegramSettings: async (payload: TelegramSettingsPayload) => {
		return apiClient.put<TelegramSettingsResponse>('/integrations/telegram/settings', payload);
	},

	testTelegramSettings: async (payload: TelegramTestPayload) => {
		return apiClient.post<{ message: string }>('/integrations/telegram/test', payload);
	},
};

