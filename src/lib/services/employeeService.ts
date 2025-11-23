import { apiClient } from '../api/client';
import { EmployeeStatus, Role } from '../enums/status';
import type { Employee } from '../interface/employee';

export type { ApiError } from '../api/client';

export interface CreateEmployeeData {
	fullName: string;
	email: string;
	phone?: string;
	position?: string;
	role?: Role;
	status?: EmployeeStatus;
	department?: string;
	password?: string;
}

export interface UpdateEmployeeData extends Partial<CreateEmployeeData> {
	id: string;
}

export const employeeService = {
	getAllEmployees: async (): Promise<Employee[]> => {
		return apiClient.get<Employee[]>('/user/all');
	},

	createEmployee: async (data: CreateEmployeeData): Promise<Employee> => {
		return apiClient.post<Employee>('/user/signup', {
			fullName: data.fullName,
			email: data.email,
			phone: data.phone,
			position: data.position,
			role: data.role || Role.USER,
			password: data.password || 'defaultPassword123', // Backend'da password talab qilinishi mumkin
		});
	},

	updateEmployee: async (data: UpdateEmployeeData): Promise<Employee> => {
		const { id, ...updateData } = data;
		return apiClient.put<Employee>(`/user/${id}`, updateData);
	},
};
