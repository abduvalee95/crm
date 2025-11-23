'use client';
import { Card } from '@/components/ui/card';
import { employeeStats } from '@/lib/data/emloyers';
import { Activity } from 'lucide-react';
import { useAppSelector } from '@/shared/store/hooks';
import { Role } from '@/lib/enums/status'

const EmployeesStat = () => {
	const employees = useAppSelector((state) => state.employee.employees);
	const statCards = [
		{
			title: 'Всего сотрудников',
			value: employees.length,
			icon: Activity,
			color: 'text-blue-400',
			bgColor: 'bg-background',
		},
		{
			title: 'Активные',
			value: employees.filter((employee) => employee.role === Role.ADMIN).length,
			icon: Activity,
			color: 'text-green-400',
			bgColor: 'bg-background',
		},
		{
			title: 'Неактивные',
			value: employees.filter((employee) => employee.role === Role.SUPPORT).length,
			icon: Activity,
			color: 'text-red-400',
			bgColor: 'bg-background',
		},
		{
			title: 'Менеджеры',
			value: employees.filter((employee) => employee.role === Role.MANAGER).length,
			icon: Activity,
			color: 'text-blue-400',
			bgColor: 'bg-background',
		}
	];

	return (
		<div className="flex gap-4 w-full ">
			{statCards.map((stat, index) => (
				<Card key={index} className="bg-background border-gray-700 text-foreground shadow-xl w-full">
					<div className="p-2">
						<div className="flex items-center">
							<div className={`p-3 rounded-full ${stat.bgColor}`}>
								<stat.icon className={`w-6 h-6 ${stat.color}`} />
							</div>
							<div>
								<p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
								<p className="text-2xl font-bold text-card-foreground mt-1">{stat.value}</p>
							</div>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
};

export default EmployeesStat;
