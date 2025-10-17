import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DealStage } from '@/lib/enums/deal';
import { Deal } from '@/lib/interface/deal';
import { Client } from '@/lib/types/types';
import { useMemo } from 'react';

type MinimalDeal = (Deal | Client) & {
	name: string;
	company: string;
	stage: DealStage;
	progress?: number;
	responsible?: string;
	deadline?: string;
};

interface DealKanbanViewProps {
	deals: MinimalDeal[];
}
//bu er tepadegi column atlari
const stageLabels: Record<DealStage, string> = {
	[DealStage.New]: 'Новый',
	[DealStage.InProgress]: 'В работе',
	[DealStage.Closed]: 'Закрыт',
};

const DealKanbanView: React.FC<DealKanbanViewProps> = ({ deals }) => {
	const columns = useMemo(() => {
		const grouped: Record<DealStage, MinimalDeal[]> = {
			[DealStage.New]: [],
			[DealStage.InProgress]: [],
			[DealStage.Closed]: [],
		};
		deals.forEach((deal) => {
			grouped[deal.stage].push(deal);
		});
		return grouped;
	}, [deals]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{(Object.keys(columns) as DealStage[]).map((stage) => (
				<div key={stage} className="bg-black rounded-xl border border-gray-700 p-4 flex flex-col gap-4">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-white text-lg font-semibold ">{stageLabels[stage]}</h2>
						<Badge className="bg-black border-gray-700 text-gray-300">{columns[stage].length}</Badge>
					</div>
					<div className="space-y-4 flex flex-col">
						{columns[stage].map((deal, idx) => (
							<Card key={`${deal.company}-${deal.name}-${idx}`} className="bg-black border-gray-800 text-white">
								<CardContent className="p-4">
									<div className="flex items-start justify-between">
										<div>
											<h3 className="font-semibold">{deal.name}</h3>
											<p className="text-sm text-gray-400">{deal.company}</p>
										</div>
										<Badge variant="outline" className="border-gray-700 text-gray-300">
											{stageLabels[deal.stage]}
										</Badge>
									</div>

									{typeof deal.progress === 'number' && (
										<div className="mt-3">
											<div className="flex items-center justify-between text-sm">
												<span className="text-gray-400">Прогресс</span>
												<span className="text-gray-200">{deal.progress}%</span>
											</div>
											<Progress value={deal.progress} className="mt-2 h-2" />
										</div>
									)}

									<div className="mt-3 flex items-center justify-between text-sm text-gray-400">
										<div className="flex items-center gap-2">
											<Avatar className="h-6 w-6">
												<AvatarFallback>{deal.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
											</Avatar>
											<span>{deal.responsible || '—'}</span>
										</div>
										{deal.deadline && <span>Срок: {deal.deadline}</span>}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default DealKanbanView;
