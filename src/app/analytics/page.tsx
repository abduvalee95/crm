'use client';
import { useAppSelector } from '@/shared/store/hooks';
import CirleStatic from '@/widgets/analytics/ui/CirleStatic';
import Conversion from '@/widgets/analytics/ui/Conversion';
import EffectiveMeneger from '@/widgets/analytics/ui/EffectiveMeneger';
import RevenueDash from '@/widgets/analytics/ui/RevenueDash';
import RevenueTable from '@/widgets/analytics/ui/RevenueTable';
import Header from '@/widgets/header/ui/Header';
import StatCard from '@/widgets/stat-card/ui/page';
import { useMemo } from 'react';

const PERIODS = [
	{ key: 'year', label: 'За год', months: 12 },
	{ key: 'quarter', label: 'За квартал', months: 3 },
	{ key: 'month', label: 'За месяц', months: 1 },
] as const;

type PeriodKey = (typeof PERIODS)[number]['key'];

export default function AnalyticsPage() {
	const period = useAppSelector((s) => s.analytics.period) as PeriodKey;
	const revenueData = useAppSelector((s) => s.analytics.revenueData);
	const monthlyMetrics = useAppSelector((s) => s.analytics.monthlyMetrics);

	const revenueDataFiltered = useMemo(() => {
		const months = PERIODS.find((p) => p.key === period)!.months;
		return revenueData.slice(-months);
	}, [period, revenueData]);

	const totals = useMemo(() => {
		const totalRevenueK = revenueDataFiltered.reduce((sum, p) => sum + p.revenue, 0);
		const totalProfitK = revenueDataFiltered.reduce((sum, p) => sum + p.profit, 0);
		const conversionPct = Math.round((totalProfitK / Math.max(totalRevenueK, 1)) * 100);
		return {
			revenueDisplay: `₽${(totalRevenueK * 1000).toLocaleString()}`,
			conversionDisplay: `${conversionPct}%`,
		};
	}, [revenueDataFiltered]);

	return (
		<div className="flex-1 min-h-screen p-4 shadow-lg bg-background">
			<Header pageType="analytics" />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mt-4">
				<StatCard title="Общий доход" value={totals.revenueDisplay} change="" icon={'/clients.png'} />
				<StatCard title="Сделки закрыты" value={monthlyMetrics.closedDeals.toString()} change="" icon={'/deal.png'} />
				<StatCard title="Новые клиенты" value={monthlyMetrics.newClients.toString()} change="" icon={'/tasks.png'} />
				<StatCard title="Конверсия" value={totals.conversionDisplay} change="" icon={'/dollor.png'} />
			</div>

			<div className="min-h-screen p-4">
				<div className="max-w-8xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
						<div className="lg:col-span-2">
							<RevenueDash data={revenueDataFiltered} />
						</div>
						<div className="lg:col-span-2">
							<CirleStatic />
						</div>
						<div className="lg:col-span-2">
							<Conversion data={revenueDataFiltered} />
						</div>
						<div className="lg:col-span-2">
							<EffectiveMeneger />
						</div>
						<div className="lg:col-span-2 xl:col-span-4">
							<RevenueTable />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
