import AnalyticsBlock from '@/widgets/analytics/page';
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
			<AnalyticsBlock />
		</div>
	);
}
