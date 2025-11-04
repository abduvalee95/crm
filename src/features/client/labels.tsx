import { Badge } from '@/components/ui/badge';
import { ClientStatus } from '@/lib/enums/status';
import { Client } from '@/lib/types/types';

export const getStatusBadge = (status: Client['status']) => {
	switch (status) {
		case ClientStatus.active:
			return (
				<Badge variant="default" className="bg-green-600/20 text-green-400 border-none p-2">
					Активен
				</Badge>
			);
		case ClientStatus.new:
			return (
				<Badge variant="default" className="bg-blue-600/20 text-blue-400 border-none p-2">
					Новый
				</Badge>
			);
		case ClientStatus.inactive:
			return (
				<Badge variant="secondary" className="bg-gray-600/20 text-gray-400 border-none p-2">
					Неактивен
				</Badge>
			);
		default:
			return <Badge variant="outline">Неизвестно</Badge>;
	}
};
