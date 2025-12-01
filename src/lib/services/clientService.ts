import { apiClient } from '../api/client';
import type { Client, CreateClientData, UpdateClientData } from '../interface/client';

export type { ApiError } from '../api/client';

export const clientService = {
	createClient: async (data: CreateClientData): Promise<Client> => {
		return apiClient.post<Client>('/client/create', data);
	},

	getAllClients: async (): Promise<Client[]> => {
		return apiClient.get<Client[]>('/client/all') as Promise<Client[]>;
	},

	getClientById: async (id: string): Promise<Client> => {
		return apiClient.get<Client>(`/client/get/${id}`) as Promise<Client>;
	},

	updateClient: async (id: string, data: UpdateClientData): Promise<Client> => {
		return apiClient.put<Client>(`/client/update/${id}`, data);
	},

	deleteClient: async (id: string): Promise<{ message: string; deletedClient: Client }> => {
		return apiClient.delete<{ message: string; deletedClient: Client }>(`/client/delete/${id}`);
	},
};
