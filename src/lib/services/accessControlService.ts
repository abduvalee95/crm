import { apiClient } from '../api/client';
import { Role } from '../enums/status';

export interface RoleInfo {
	role: Role;
	name: string;
	description: string;
	permissions: string[];
}

export const accessControlService = {
	getRoles: async (): Promise<RoleInfo[]> => {
		return apiClient.get<RoleInfo[]>('/access-control/roles');
	},

	getRoleInfo: async (role: Role): Promise<RoleInfo | null> => {
		return apiClient.get<RoleInfo | null>(`/access-control/roles/${role}`);
	},
};
