import { apiClient } from '../api/client';
import type { CreateDealData, Deal, UpdateDealData } from '../interface/deal';

export const dealService = {
	createDeal: async (data: CreateDealData): Promise<Deal> => {
		return apiClient.post<Deal>('/deal/create', data);
	},
	getAllDeals: async (): Promise<Deal[]> => {
		return apiClient.get<Deal[]>('/deal/all') as Promise<Deal[]>;
	},
	getDealById: async (id: string): Promise<Deal> => {
		return apiClient.get<Deal>(`/deal/get/${id}`) as Promise<Deal>;
	},
	updateDeal: async (id: string, data: UpdateDealData): Promise<Deal> => {
		return apiClient.put<Deal>(`/deal/update/${id}`, data);
	},
	deleteDeal: async (id: string): Promise<{ message: string; deletedDeal: Deal }> => {
		return apiClient.delete<{ message: string; deletedDeal: Deal }>(`/deal/delete/${id}`);
	},
};
