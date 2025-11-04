import { Badge } from '@/components/ui/badge';
import { Employee } from '@/lib/data/emloyers';
import { EmployeeStatus, Role } from '@/lib/enums/status';

export const getStatusBadge = (status: Employee['status']) => {
	switch (status) {
		case EmployeeStatus.active:
			return <span>Активен</span>;
		case EmployeeStatus.on_leave:
			return <span>Неактивен</span>;
		default:
			return <Badge variant="outline">Неизвестно</Badge>;
	}
};

export const getRoleBadge = (role: Employee['role']) => {
	switch (role) {
		case Role.ADMIN:
			return <span>Админ</span>;
		case Role.MANAGER:
			return <span>Менеджер</span>;
		case Role.ANALYST:
			return <span>Аналитик</span>;
		case Role.SUPPORT:
			return <span>Поддержка</span>;
		default:
			return <Badge variant="outline">Неизвестно</Badge>;
	}
};
