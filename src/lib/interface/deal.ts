import { DealStage } from '../enums/deal';
import { MinimalDeal } from '../types/types';

export interface DealViewProps {
	deals: MinimalDeal[];
}
export interface Deal {
	name: string;
	title?: string;
	company: string;
	amount?: number;
	responsible?: string;
	stage: DealStage;
	progress?: number;
	deadline?: string;
}
