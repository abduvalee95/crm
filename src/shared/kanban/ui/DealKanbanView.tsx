import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { DealStage } from '@/lib/enums/deal';
import { Deal, DealViewProps } from '@/lib/interface/deal';
import { MinimalDeal } from '@/lib/types/types';
import FormModal from '@/widgets/ModalForm/FormModal';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useMemo, useState } from 'react';

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
	const [selectedDeal, setSelectedDeal] = useState<{ deal: MinimalDeal; action: 'update' | 'delete' } | null>(null);

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
		<Fragment>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{(Object.keys(columns) as DealStage[]).map((stage) => (
					<div key={stage} className="bg-background rounded-xl border border-border p-4 flex flex-col gap-4">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-card-foreground text-lg font-semibold ">{stage}</h2>
							<Badge className="bg-background border-border text-card-foreground">{columns[stage].length}</Badge>
						</div>
						<div className="space-y-4 flex flex-col">
							{columns[stage].map((deal) => (
								<Card key={deal.id} className="bg-background border-border text-card-foreground">
									<CardContent className="p-4">
										<div className="flex items-start justify-between mb-2">
											<div className="flex-1">
												<h3 className="font-semibold">{deal.title}</h3>
												<p className="text-sm text-muted-foreground">{deal.company || deal.responsible}</p>
											</div>
											<div className="flex items-center gap-2">
												<span className="border-border text-muted-foreground">{stageLabels(deal.stage)}</span>
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
										{deal.amount && (
											<div className="mt-2">
												<span className="text-sm font-medium text-card-foreground">
													₽{deal.amount.toLocaleString()}
												</span>
											</div>
										)}
										{typeof deal.progress === 'number' && (
											<div className="mt-3">
												<div className="flex items-center justify-between text-sm">
													<span className="text-muted-foreground">{deal.progress ?? 0} %</span>
												</div>
												<Progress value={deal.progress} className="mt-2 h-2" />
											</div>
										)}

										<div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
											<div className="flex items-center gap-2">
												<Image src="/clients.png" alt="client" width={15} height={15} className="invert" />
												<span>{deal.responsible || 'Не назначен'}</span>
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

export default DealKanbanView;
