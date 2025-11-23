'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import pageConfigs from '@/lib/config/headerConf';
import { downloadCSV } from '@/lib/cvsDownloader';

import { ViewMode } from '@/lib/enums/deal';
import { HeaderProps } from '@/lib/interface/header';
import type { AnalyticsPeriod } from '@/shared/store/analyticsSlice';
import { setPeriod } from '@/shared/store/analyticsSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import FormModal from '@/widgets/ModalForm/FormModal';
import { ChevronDown } from 'lucide-react';

const Header: React.FC<HeaderProps> = ({
	pageType = 'deals',
	customConfig,
	activeView = ViewMode.Kanban,
	onViewChange,
}) => {
	// Используем кастомную конфигурацию или конфигурацию по типу страницы
	const config = customConfig || pageConfigs[pageType];

	const dispatch = useAppDispatch();
	const analyticsPeriod = useAppSelector((s) => s.analytics?.period);
	const revenueData = useAppSelector((s) => s.analytics.revenueData);
	const monthsMap: Record<string, number> = { year: 12, quarter: 3, month: 1 };
	const exportAnalytics = () => {
		const months = monthsMap[analyticsPeriod || 'year'];
		const filtered = revenueData.slice(-months);
		const rows = filtered.map((p) => ({ period: p.name, revenueK: p.revenue, profitK: p.profit }));
		downloadCSV(rows, { filename: `analytics_${analyticsPeriod}.csv` });
	};

	const tableForPage = (pt: HeaderProps['pageType']): 'client' | 'deal' | 'task' | 'employees' | null => {
		switch (pt) {
			case 'clients':
				return 'client';
			case 'deals':
				return 'deal';
			case 'employees':
				return 'employees';
			// если появится страница задач
			default:
				return null;
		}
	};

	return (
		<header className="mt-5 flex justify-between px-6">
			<div>
				<h1 className="text-2xl font-bold">{config.title}</h1>
				<p className="text-muted-foreground mt-1">{config.subtitle}</p>
			</div>
			<div className="flex items-center space-x-4 px-8">
				{pageType === 'analytics' ? (
					<div className="flex items-center gap-3">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="gap-2 bg-background border-gray-700 text-card-foreground hover:bg-gray-500 rounded-lg w-30 justify-between cursor-pointer"
								>
									{
										({ year: 'За год', quarter: 'За квартал', month: 'За месяц' } as Record<AnalyticsPeriod, string>)[
											analyticsPeriod || 'year'
										]
									}
									<ChevronDown className="w-4 h-4 ml-2 cursor-pointer" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="flex flex-col gap-2 bg-background border-gray-700 text-card-foreground w-30 rounded-lg p-2 user-select-none"
							>
								<DropdownMenuItem onClick={() => dispatch(setPeriod('year'))} className="cursor-pointer">
									За год
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => dispatch(setPeriod('quarter'))} className="cursor-pointer">
									За квартал
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => dispatch(setPeriod('month'))} className="cursor-pointer">
									За месяц
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Button size="sm" onClick={exportAnalytics}>
							Экспорт данных
						</Button>
					</div>
				) : (
					config.actions?.map((action, index) => {
						switch (action.type) {
							case 'button': {
								const table = tableForPage(pageType);
								const isAddAction = typeof action.label === 'string' && action.label.toLowerCase().includes('добавить');
								if (isAddAction && table) {
									return <FormModal key={index} table={table} type="create" />;
								}
								return (
									<Button key={index} onClick={action.onClick} className={action.className}>
										{action.icon}
										{action.label}
									</Button>
								);
							}

							case 'view-switcher':
								return (
									<div
										key={index}
										className="flex items-center p-1 bg-card rounded-lg border border-gray-700 cursor-pointer"
									>
										{action.options.map((option) => (
											<Button
												key={option.view}
												variant={activeView === option.view ? 'default' : 'outline'} // korinishni ajratib korsatish
												size="sm"
												onClick={() => onViewChange?.(option.view)} // OnClick orqali holatni o'zgartirish
												className="gap-2 cursor-pointer"
											>
												{option.icon}
												{option.label}
											</Button>
										))}
									</div>
								);

							default:
								return null; // Agar nomalum tur kelsa, hech narsa chizmaymiz
						}
					})
				)}
			</div>
		</header>
	);
};

export default Header;
