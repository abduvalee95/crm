import { EmployeeStatus, Role } from '../enums/status';

export const getRoleLabel = (role: Role | string): string => {
	const labels: Record<string, string> = {
		[Role.ADMIN]: 'Админ',
		[Role.MANAGER]: 'Менеджер',
		[Role.ANALYST]: 'Аналитик',
		[Role.SUPPORT]: 'Поддержка',
		[Role.USER]: 'Пользователь',
	};
	return labels[role] || role;
};

export const getStatusLabel = (status: EmployeeStatus | string): string => {
	const labels: Record<string, string> = {
		[EmployeeStatus.active]: 'Активен',
		[EmployeeStatus.on_leave]: 'В отпуске',
	};
	return labels[status] || status;
};
