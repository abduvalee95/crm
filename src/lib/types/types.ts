import { DealStage } from '../enums/deal';
import { ClientStatus } from '../enums/status'
import { Deal } from '../interface/deal'

export type StatCardData = {
	title: string;
	value: string;
	change: string;
	icon: string;
};

export type Event = {
  time: string;
  title: string;
  description: string;
};
export type Client = {
  id: string; // UUID - Backend bilan moslash
  name: string;
  company?: string; // Optional - Backend bilan moslash
  email: string;
  phone?: string; // Backend bilan moslash (number o'rniga)
  status: ClientStatus;
  notes?: string; // Backend bilan moslash
  createdById?: string; // Backend bilan moslash
  createdAt?: string;
  updatedAt?: string;
  // Frontend uchun qo'shimcha maydonlar (optional)
  avatar?: string;
  stage?: DealStage; // Client uchun emas, Deal uchun
  responsible?: string;
  deadline?: string;
  amount?: number;
  progress?: number;
};

export type MinimalDeal = Deal & {
	// MinimalDeal endi Deal interface dan foydalanadi
	// Qo'shimcha maydonlar Deal interface da allaqachon bor
};

