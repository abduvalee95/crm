import { Badge } from '@/components/ui/badge';
import { DealStage } from '@/lib/enums/deal';
import { Deal } from '@/lib/interface/deal';

export const getStageBadge = (stage: Deal['stage']) => {
	switch (stage) {
		case DealStage.New:
			return <span>Новый</span>;
		case DealStage.InProgress:
			return <span>В работе</span>;
		case DealStage.Closed:
			return <span>Закрыт</span>;
		default:
			return <Badge variant="outline">Неизвестно</Badge>;
	}
};
