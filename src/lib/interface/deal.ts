import { DealStage } from '../enums/deal';
import { MinimalDeal } from '../types/types';

export interface DealViewProps {
	deals: MinimalDeal[];
}
export interface Deal {
	id: number;
	name: string;
	title?: string;
	company: string;
	amount?: number;
	responsible?: string;
	stage: DealStage;
	progress?: number;
	deadline?: string;
	createdAt?: string;
	updatedAt?: string;
}
