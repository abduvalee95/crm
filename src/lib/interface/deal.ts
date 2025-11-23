import { DealStage } from '../enums/deal';
import { MinimalDeal } from '../types/types';

export interface DealViewProps {
	deals: MinimalDeal[];
}

export interface Deal {
	id: string; // UUID
	title: string; // Backend bilan moslash
	amount?: number;
	stage: DealStage;
	clientId: string; // Backend bilan moslash
	responsible?: string; // Backend bilan moslash (responsible o'rniga)
	createdAt?: string;
	updatedAt?: string;
	// Frontend uchun qo'shimcha maydonlar (optional)
	company?: string; // Client dan olinadi
	responsibleName?: string; // User dan olinadi
	progress?: number; // Frontend uchun
	deadline?: string; // Frontend uchun
}

export interface CreateDealData {
	title: string;
	clientId: string;
	amount?: number;
	stage?: DealStage;
	responsible?: string;
	responsibleName?: string;
}

export interface UpdateDealData {
	title?: string;
	clientId?: string;
	amount?: number;
	stage?: DealStage;
	responsible?: string;
	responsibleName?: string;
}
