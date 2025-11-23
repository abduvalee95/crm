'use client';

import { DealStage } from '@/lib/enums/deal';
import { fetchClients } from '@/shared/store/clientSlice';
import { fetchDeals } from '@/shared/store/dealSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import ClientsHomePage from '@/widgets/client/ui/page';
import DashboardPage from '@/widgets/dashboard/ui/page';
import Header from '@/widgets/header/ui/Header';
import StatCard from '@/widgets/stat-card/ui/page';
import { useEffect, useMemo } from 'react';

export default function HomePage() {
	const dispatch = useAppDispatch();
	const clients = useAppSelector((state) => state.client.clients);
	const deals = useAppSelector((state) => state.deal.deals);
	const clientsLoading = useAppSelector((state) => state.client.isLoading);
	const dealsLoading = useAppSelector((state) => state.deal.isLoading);

	useEffect(() => {
		dispatch(fetchClients());
		dispatch(fetchDeals());
	}, [dispatch]);

	// Calculate statistics
	const stats = useMemo(() => {
		const totalClients = clients.length;
		const activeDeals = deals.filter((deal) => deal.stage !== DealStage.Closed).length;
		const closedDeals = deals.filter((deal) => deal.stage === DealStage.Closed).length;
		const totalRevenue = deals
			.filter((deal) => deal.stage === DealStage.Closed && deal.amount)
			.reduce((sum, deal) => sum + (deal.amount || 0), 0);

		// Calculate changes (mock for now, can be improved with date comparison)
		const clientsChange = totalClients > 0 ? `Всего: ${totalClients}` : 'Нет данных';
		const dealsChange = activeDeals > 0 ? `Активных: ${activeDeals}` : 'Нет активных';
		const tasksChange = 'Новые задачи'; // Will be updated when task slice is added
		const revenueChange = totalRevenue > 0 ? `Закрыто сделок: ${closedDeals}` : 'Нет данных';

		return {
			clients: {
				value: totalClients.toLocaleString(),
				change: clientsChange,
			},
			deals: {
				value: activeDeals.toString(),
				change: dealsChange,
			},
			tasks: {
				value: '0', // Will be updated when task slice is added
				change: tasksChange,
			},
			revenue: {
				value: `₽${totalRevenue.toLocaleString()}`,
				change: revenueChange,
			},
		};
	}, [clients, deals]);

	return (
		<div className="flex-1 min-h-screen p-4 space-y-6 shadow-lg">
			<Header pageType="home" />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mt-4">
				<StatCard
					title="Всего клиентов"
					value={stats.clients.value}
					change={stats.clients.change}
					icon={'/clients.png'}
				/>
				<StatCard title="Активные сделки" value={stats.deals.value} change={stats.deals.change} icon={'/deal.png'} />
				<StatCard title="Новые задачи" value={stats.tasks.value} change={stats.tasks.change} icon={'/tasks.png'} />
				<StatCard
					title="Доход за месяц"
					value={stats.revenue.value}
					change={stats.revenue.change}
					icon={'/dollor.png'}
				/>
			</div>
			<DashboardPage />
			<ClientsHomePage />
		</div>
	);
}
