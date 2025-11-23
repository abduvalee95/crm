import { EmployeeStatus, Performance, Role } from '../enums/status';

export interface Employee {
	id: string;
	fullName: string;
	email: string;
	phone?: string;
	position?: string;
	role?: Role;
	status?: EmployeeStatus;
	department?: string;
	avatar?: string;
	lastActivity?: string;
	hireDate?: string;
	performance?: Performance;
	deals?: number;
	revenue?: number;
}

