'use client';
import { Card } from '@/components/ui/card';
import { employeeStats } from '@/lib/data/emloyers';
import { Activity } from 'lucide-react';

const EmployeesStat = () => {
	const statCards = [
		{
			title: 'Всего сотрудников',
			value: employeeStats.total,
			icon: Activity,
			color: 'text-blue-400',
			bgColor: 'bg-black',
		},
		{
			title: 'Активные',
			value: employeeStats.active,
			icon: Activity,
			color: 'text-green-400',
			bgColor: 'bg-black',
		},
		{
			title: 'Неактивные',
			value: employeeStats.inactive,
			icon: Activity,
			color: 'text-red-400',
			bgColor: 'bg-black',
		},
		{
			title: 'Менеджеры',
			value: employeeStats.departments.Продажи,
			icon: Activity,
			color: 'text-blue-400',
			bgColor: 'bg-black',
		}
	];

	return (
		<div className="flex gap-4 w-full ">
			{statCards.map((stat, index) => (
				<Card key={index} className="bg-black border-gray-700 text-white shadow-xl w-full">
					<div className="p-2">
						<div className="flex items-center">
							<div className={`p-3 rounded-full ${stat.bgColor}`}>
								<stat.icon className={`w-6 h-6 ${stat.color}`} />
							</div>
							<div>
								<p className="text-gray-400 text-sm font-medium">{stat.title}</p>
								<p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
							</div>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
};

export default EmployeesStat;
