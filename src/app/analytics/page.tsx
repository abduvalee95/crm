import AnalyticsBlock from '@/widgets/analytics/page';
import CirleStatic from '@/widgets/analytics/ui/CirleStatic'
import Conversion from '@/widgets/analytics/ui/Conversion'
import EffectiveMeneger from '@/widgets/analytics/ui/EffectiveMeneger'
import RevenueDash from '@/widgets/analytics/ui/RevenueDash'
import RevenueTable from '@/widgets/analytics/ui/RevenueTable'
import Header from '@/widgets/header/ui/Header';
import StatCard from '@/widgets/stat-card/ui/page';

export default function AnalyticsPage() {
	return (
		<div className="flex-1 min-h-screen p-4 shadow-lg bg-black">
			<Header pageType="analytics" />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4  mt-4">
				<StatCard title="Общий доход" value="2,847" change="+12% с прошлого месяца" icon={'/clients.png'} />
				<StatCard title="Сделки закрыты" value="156" change="+4 новых на этой неделе" icon={'/deal.png'} />
				<StatCard title="Новые клиенты" value="23" change="5 просроченных" icon={'/tasks.png'} />
				<StatCard title="Конверсия" value="₽1,247,000" change="+18% к цели" icon={'/dollor.png'} />
			</div>
			<div className="min-h-screen p-4">
			<div className="max-w-8xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
					<div className="lg:col-span-2">
						<RevenueDash />
					</div>
					<div className="lg:col-span-2">
						<CirleStatic />
					</div>
					<div className="lg:col-span-2">
						<Conversion />
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
