import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableCell } from '@/components/ui/table';
import { DealStage } from '@/lib/enums/deal';
import { Deal, DealViewProps } from '@/lib/interface/deal';
import React from 'react';

const stageLabel = (stage: Deal['stage']) => {
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

const DealTableView: React.FC<DealViewProps> = ({ deals }) => {
	return (
		<Card className="bg-black border-gray-800 text-white">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>
					Список сделок
					{deals.length === deals.length && `(${deals.length})`}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{deals.map((deal, idx) => (
					<div
						key={`${deal.company}-${deal.name}-${idx}`}
						className="flex gap-4 justify-between border border-gray-800 rounded-lg items-center hover:bg-gray-800/50 transition-colors p-2 cursor-pointer "
					>
						<div
							key={deal.name}
							className="flex justify-between item-center p-3 hover:bg-gray-900/50 transition-colors flex-col"
						>
							<div>
								<div className="flex items-center justify-between">
									<span className="font-medium">{deal.company}</span>
								</div>
								<span className="text-gray-400 text-sm">{deal.name}</span>
							</div>
							<span className="text-gray-400 text-sm">{deal.progress ?? 0}%</span>
						</div>
						<TableCell className="text-right">
							<div>{stageLabel(deal.stage)}</div>
						</TableCell>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default DealTableView;
//* */
/* 
<DropdownMenu>
<DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-800/50">
	<MoreVertical size={16} />
</DropdownMenuTrigger>
<DropdownMenuContent className="bg-[#1B1E23] border-gray-700 text-white">
	<DropdownMenuItem>Открыть</DropdownMenuItem>
	<DropdownMenuItem>Редактировать</DropdownMenuItem>
	<DropdownMenuItem>Архивировать</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu> */
