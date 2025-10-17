import { DealStage } from '../enums/deal';
import { ClientStatus } from '../enums/status'

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
