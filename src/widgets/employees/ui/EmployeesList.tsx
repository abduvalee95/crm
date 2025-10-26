'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { employeesData } from '@/lib/data/emloyers';
import { formatTime } from '@/shared/utils/dateUtils';
import { useState } from 'react';

const EmployeesList = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'on_leave'>('all');
	const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'manager' | 'analyst' | 'support'>('all');

	const filteredEmployees = employeesData.filter((employee) => {
		const matchesSearch =
			employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.department.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
		const matchesRole = roleFilter === 'all' || employee.role === roleFilter;

		return matchesSearch && matchesStatus && matchesRole;
	});

	const getRoleLabel = (role: string) => {
		switch (role) {
			case 'admin':
				return 'Админ';
			case 'manager':
				return 'Менеджер';
			case 'analyst':
				return 'Аналитик';
			case 'support':
				return 'Поддержка';
			default:
				return role;
		}
	};

	return (
		<div>
			<Card className="bg-black border-gray-700 text-white shadow-xl">
				<CardHeader>
					<div className="flex gap-4 mt-4">
						<input
							type="text"
							placeholder="Поиск сотрудников..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value as any)}
							className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="all">Все статусы</option>
							<option value="active">Активные</option>
							<option value="inactive">Неактивные</option>
							<option value="on_leave">В отпуске</option>
						</select>
						<select
							value={roleFilter}
							onChange={(e) => setRoleFilter(e.target.value as any)}
							className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="all">Все роли</option>
							<option value="admin">Админ</option>
							<option value="manager">Менеджер</option>
							<option value="analyst">Аналитик</option>
							<option value="support">Поддержка</option>
						</select>
					</div>
				</CardHeader>
			</Card>
			<Card className="bg-black border-gray-700 text-white shadow-xl mt-6">
				<CardTitle className="ml-4 text-xl font-semibold">Список сотрудников ( {filteredEmployees.length} )</CardTitle>
				<CardContent>
					<div className="space-y-4">
						{filteredEmployees.map((employee) => (
							<div
								key={employee.id}
								className="border border-gray-700 rounded-lg p-4 hover:bg-gray-900/50 transition-colors"
							>
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<div className="flex items-center gap-4 mb-2">
											<div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
												<span className="text-white font-bold text-sm">
													{employee.name
														.split(' ')
														.map((n) => n[0])
														.join('')}
												</span>
											</div>
											<div>
												<h3 className="font-semibold text-white">{employee.name}</h3>
												<p className="text-gray-400 text-sm">{employee.position}</p>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-2 text-sm">
											<div>
												<span className="text-gray-500">Отдел:</span>
												<span className="text-white ml-2">{employee.department}</span>
											</div>
											<div>
												<span className="text-gray-500">Роль:</span>
												<span className="text-white ml-2">{getRoleLabel(employee.role)}</span>
											</div>
											<div>
												<span className="text-gray-500">Email:</span>
												<span className="text-white ml-2">{employee.email}</span>
											</div>
											<div>
												<span className="text-gray-500">Телефон:</span>
												<span className="text-white ml-2">{employee.phone}</span>
											</div>
											<div>
												<span className="text-gray-500">Последняя активность:</span>
												<span className="text-white ml-2">{formatTime(new Date(employee.lastActivity))}</span>
											</div>
											<div>
												<span className="text-gray-500">Статус:</span>
												<span
													className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
														employee.status === 'active'
															? 'bg-green-100 text-green-800'
															: employee.status === 'inactive'
															? 'bg-red-100 text-red-800'
															: 'bg-yellow-100 text-yellow-800'
													}`}
												>
													{employee.status === 'active'
														? 'Активен'
														: employee.status === 'inactive'
														? 'Неактивен'
														: 'В отпуске'}
												</span>
											</div>
										</div>
									</div>
									{(employee.deals || employee.revenue) && (
										<div className="mt-3 flex flex-col gap-4">
											{employee.deals && <span className="text-blue-400 font-medium">{employee.deals} сделок</span>}
											{employee.revenue && (
												<span className="text-green-400 font-medium">₽{employee.revenue.toLocaleString()}</span>
											)}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default EmployeesList;
