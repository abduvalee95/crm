import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DealStage } from '@/lib/enums/deal';
import { Deal, DealViewProps } from '@/lib/interface/deal';
import FormModal from '@/widgets/ModalForm/FormModal';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import React, { Fragment, useState } from 'react';

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
	const [selectedDeal, setSelectedDeal] = useState<{ deal: Deal; action: 'update' | 'delete' } | null>(null);

	return (
		<Fragment>
			<Card className="bg-background border-gray-700 text-card-foreground">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>
						Список сделок
						{deals.length === deals.length && `(${deals.length})`}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					{deals.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">Сделки не найдены</div>
					) : (
						deals.map((deal) => (
							<div
								key={deal.id}
								className="flex gap-4 justify-between border border-gray-700 rounded-lg items-center hover:bg-gray-700/50 transition-colors p-4"
							>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-semibold text-card-foreground">{deal.title}</h3>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<span>{deal.company ||  deal.clientId}</span>
										{deal.amount && (
											<span className="font-medium text-card-foreground">₽{deal.amount.toLocaleString()}</span>
										)}
										{deal.responsible && <span>Ответственный: {deal.responsible}</span>}
										{deal.deadline && <span>Срок: {deal.deadline}</span>}
										{typeof deal.progress === 'number' && <span>Прогресс: {deal.progress}%</span>}
									</div>
								</div>
								<div className="flex items-center gap-2">
									{stageLabel(deal.stage)}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="h-8 w-8">
												<MoreVertical className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem
												onClick={() => setSelectedDeal({ deal, action: 'update' })}
												className="cursor-pointer"
											>
												<div className="flex items-center gap-2">
													<Edit className="h-4 w-4" />
													Редактировать
												</div>
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setSelectedDeal({ deal, action: 'delete' })}
												className="cursor-pointer text-destructive focus:text-destructive"
											>
												<div className="flex items-center gap-2">
													<Trash2 className="h-4 w-4" />
													Удалить
												</div>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						))
					)}
				</CardContent>
			</Card>
			{selectedDeal && (
				<FormModal
					table="deal"
					type={selectedDeal.action}
					data={selectedDeal.action === 'update' ? selectedDeal.deal : undefined}
					id={selectedDeal.deal.id}
					open={true}
					onOpenChange={(open) => {
						if (!open) setSelectedDeal(null);
					}}
				/>
			)}
		</Fragment>
	);
};

export default DealTableView;

