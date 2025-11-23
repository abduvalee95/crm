import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recentClients } from '@/lib/data/client';
import { DealStage, ViewMode } from '@/lib/enums/deal';
import { Deal } from '@/lib/interface/deal';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Progress } from '@radix-ui/react-progress';
import { MoreVertical, User } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function DealsPage() {
	const [view, setView] = useState<ViewMode>(ViewMode.Kanban);
	const [searchTerm, setSearchTerm] = useState('');
	const [stageFilter, setStageFilter] = useState<DealStage | 'all'>('all');

	// FILTRLANGAN MA'LUMOTLAR
	// `useMemo` hook'i yordamida ma'lumotlarni filtrlash jarayonini optimallashtiramiz.
	// Bu funksiya faqat `searchTerm` yoki `stageFilter` o'zgargandagina qayta ishlaydi.
	// Bu katta ma'lumotlar to'plami bilan ishlaganda performanceni sezilarli darajada oshiradi.
	const filteredDeals = useMemo(() => {
		return recentClients.filter((deal) => {
			const matchesSearch =
				deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				deal.company?.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
			return matchesSearch && matchesStage;
		});
	}, [searchTerm, stageFilter]);

	// // KANBAN infaormatsiyalarni gruppa
	const kanbanColumns = useMemo(() => {
		const columns: Record<DealStage, Deal[]> = {
			[DealStage.New]: [],
			[DealStage.InProgress]: [],
			[DealStage.Closed]: [],
		};

		recentClients.forEach((deal) => {
			columns[deal.stage as DealStage].push(deal as unknown as Deal);
		});

		return columns;
	}, [filteredDeals]);

	const renderKanbanView = () => (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{(Object.keys(kanbanColumns) as DealStage[]).map((stage) => (
				<div key={stage} className="bg-[#0F1115] rounded-lg p-4">
					<div className="flex justify-between items-center mb-4">
						{/* <h2 className="font-semibold text-white">{stageLabels[stage]}</h2> */}
						<Badge variant="secondary">{kanbanColumns[stage].length}</Badge>
					</div>
					<div className="space-y-4">
						{kanbanColumns[stage].map((deal) => (
							<Card key={deal.company} className="bg-[#1B1E23] border-gray-800 text-white">
								<CardContent className="p-4">
									<h3 className="font-semibold">{deal.company}</h3>
									<p className="text-sm text-gray-400">{deal.company}</p>
									{/* <p className="font-bold my-2 text-lg">₽{deal.amount.toLocaleString()}</p> */}
									<div className="flex items-center text-sm text-gray-400 gap-2 mb-2">
										<Avatar className="h-5 w-5">
											<AvatarFallback>
												<User size={12} />
											</AvatarFallback>
										</Avatar>
										{deal.responsible}
									</div>
									<div className="flex justify-between items-center">
										{/* <Badge className={stageColors[deal.stage]}>{stageLabels[deal.stage]}</Badge> */}
										<span className="text-sm font-medium">{deal.progress}%</span>
									</div>
									<Progress value={deal.progress} className="mt-2 h-2" />
									<p className="text-xs text-gray-500 mt-2">Срок: {deal.deadline}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			))}
		</div>
	);

	const renderTableView = () => (
		<Card className="bg-[#1B1E23] border-gray-800 text-white">
			<CardHeader>
				<CardTitle>Список сделок</CardTitle>
			</CardHeader>
			<CardContent>
				{filteredDeals.map((deal) => (
					<div
						key={deal.id}
						className="grid grid-cols-6 items-center gap-4 p-4 border-b border-gray-800 last:border-b-0 hover:bg-gray-800/20"
					>
						<div className="col-span-2">
							<h3 className="font-semibold">{deal.company}</h3>
							<p className="text-sm text-gray-400">{deal.company}</p>
						</div>
						<div>
							<p className="font-bold text-lg">₽{deal.amount?.toLocaleString()}</p>
						</div>
						<div className="flex items-center text-sm text-gray-300 gap-2">
							<Avatar className="h-6 w-6">
								<AvatarFallback>
									<User size={14} />
								</AvatarFallback>
							</Avatar>
							{deal.responsible}
						</div>
						<div className="flex items-center gap-2">
							<Progress value={deal.progress} className="w-20 h-2" />
							<span>{deal.progress}%</span>
						</div>
						<div className="flex justify-end items-center gap-4">
							{/* <Badge className={stageColors[deal.stage]}>{stageLabels[deal.stage]}</Badge> */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<MoreVertical size={16} />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="bg-[#1B1E23] border-gray-700 text-white">
									<DropdownMenuItem>Редактировать</DropdownMenuItem>
									<DropdownMenuItem>Архивировать</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
