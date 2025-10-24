import ClientsHomePage from '@/widgets/client/ui/page'
import DashboardPage from '@/widgets/dashboard/ui/page'
import SellsDashboard from '@/widgets/dashboard/ui/page'
import Header from '@/widgets/header/ui/Header'
import StatCard from '@/widgets/stat-card/ui/page'
import React from 'react'

export default function HomePage(){
return(
	<div className="flex-1 min-h-screen p-4 space-y-6 shadow-lg">
		<Header pageType="home"/>
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mt-4">
			<StatCard title="Всего клиентов" value="2,847" change="+12% с прошлого месяца" icon={'/clients.png'} />
			<StatCard title="Активные сделки" value="156" change="+4 новых на этой неделе" icon={'/deal.png'} />
			<StatCard title="Новые задачи" value="23" change="5 просроченных" icon={'/tasks.png'} />
			<StatCard title="Доход за месяц" value="₽1,247,000" change="+18% к цели" icon={'/dollor.png'} />
		</div>
		<DashboardPage/>
		<ClientsHomePage/>
	</div>
)
}
