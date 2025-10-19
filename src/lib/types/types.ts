import { DealStage } from '../enums/deal';
import { ClientStatus } from '../enums/status'
import { Deal } from '../interface/deal'

export type StatCardData = {
	title: string;
	value: string;
	change: string;
	icon: any;
};

export type Event = {
  time: string;
  title: string;
  description: string;
};
export type Client = {
  name: string;
  company: string;
  email: string;
  status: ClientStatus;
  number: string;
  avatar: string;
  stage: DealStage
};

export type MinimalDeal = (Deal | Client) & {
	name: string;
	company: string;
	stage: DealStage;
	progress?: number;
	responsible?: string;
	deadline?: string;
	amount?: number;
};
