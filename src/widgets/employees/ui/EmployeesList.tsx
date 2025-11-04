'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { getRoleBadge, getStatusBadge } from '@/features/employee/labels';
import { Employee, employeesData } from '@/lib/data/emloyers';
import { EmployeeStatus, Role } from '@/lib/enums/status';
import { formatTime } from '@/shared/utils/dateUtils';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const EmployeesList = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<Employee['status'] | 'all'>('all');
	const [roleFilter, setRoleFilter] = useState<Employee['role'] | 'all'>('all');

	const filteredEmployees = employeesData.filter((employee) => {
		const matchesSearch =
			employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.department.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
		const matchesRole = roleFilter === 'all' || employee.role === roleFilter;

		return matchesSearch && matchesStatus && matchesRole;
	});

	const handleStatusFilter = (status: Employee['status'] | 'all') => {
		setStatusFilter(status);
	};
	const handleRoleFilter = (role: Employee['role'] | 'all') => {
		setRoleFilter(role);
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
							className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
						/>
						{/* Status Filter */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="bg-card border-gray-700 text-white hover:bg-gray-500 rounded-lg w-50 justify-between"
								>
									{statusFilter === 'all' ? 'Все статусы' : getStatusBadge(statusFilter)}
									<ChevronDown className="w-4 h-4 ml-2" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="flex flex-col gap-2 bg-foreground
						 border-gray-700 text-black w-50 rounded-lg p-2 user-select-none "
							>
								<DropdownMenuItem onClick={() => handleStatusFilter('all')}>Все Статусы</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleStatusFilter(EmployeeStatus.active)}>
									{getStatusBadge(EmployeeStatus.active)}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleStatusFilter(EmployeeStatus.on_leave)}>
									{getStatusBadge(EmployeeStatus.on_leave)}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						{/* Role Filter */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="bg-card border-gray-700 text-white hover:bg-gray-500 rounded-lg w-50 justify-between"
								>
									{roleFilter === 'all' ? 'Все роли' : getRoleBadge(roleFilter)}
									<ChevronDown className="w-4 h-4 ml-2" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="flex flex-col gap-2 bg-foreground
						 border-gray-700 text-black w-50 rounded-lg p-2 user-select-none "
							>
								<DropdownMenuItem onClick={() => handleRoleFilter('all')}>Все роли</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleRoleFilter(Role.ADMIN)}>
									{getRoleBadge(Role.ADMIN)}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleRoleFilter(Role.MANAGER)}>
									{getRoleBadge(Role.MANAGER)}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleRoleFilter(Role.ANALYST)}>
									{getRoleBadge(Role.ANALYST)}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleRoleFilter(Role.SUPPORT)}>
									{getRoleBadge(Role.SUPPORT)}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
												<span className="text-white ml-2">
													{employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
												</span>
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
														employee.status === EmployeeStatus.active
															? 'bg-green-100 text-green-800'
															: employee.status === EmployeeStatus.on_leave
															? 'bg-red-100 text-red-800'
															: 'bg-yellow-100 text-yellow-800'
													}`}
												>
													{employee.status === EmployeeStatus.active
														? 'Активен'
														: employee.status === EmployeeStatus.on_leave
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
