import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DealStage } from '@/lib/enums/deal';
import { Deal, DealViewProps } from '@/lib/interface/deal';
import { MinimalDeal } from '@/lib/types/types';
import { useMemo } from 'react';

const stageLabels = (stage: Deal['stage']) => {
	switch (stage) {
		case DealStage.New:
			return (
				<Badge variant="default" className="bg-blue-600/20 text-blue-400 border-none p-2">
					Новый
				</Badge>
			);
		case DealStage.InProgress:
			return (
				<Badge variant="default" className="bg-green-600/20 text-green-400 border-none p-2">
					В работе
				</Badge>
			);
		case DealStage.Closed:
			return (
				<Badge variant="secondary" className="bg-gray-600/20 text-gray-400 border-none p-2">
					Закрыт
				</Badge>
			);
		default:
			return <Badge variant="outline">Неизвестно</Badge>;
	}
};

const DealKanbanView: React.FC<DealViewProps> = ({ deals }) => {
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
						<h2 className="text-white text-lg font-semibold ">{(stage)}</h2>
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
										<span  className="border-gray-700 text-gray-300">
											{stageLabels(deal.stage)}
										</span>
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
											<span>{deal.responsible}</span>
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
