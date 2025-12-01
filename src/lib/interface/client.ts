import { ClientStatus } from '../enums/status';

export interface Client {
	id: string; // UUID
	name: string;
	email: string;
	phone?: string;
	company?: string;
	notes?: string;
	status: ClientStatus;
	createdById?: string;
	createdAt?: string;
}

export interface CreateClientData {
	name: string;
	email: string;
	phone?: string;
	company?: string;
	notes?: string;
	status?: ClientStatus;
}

export interface UpdateClientData extends Partial<CreateClientData> {}
