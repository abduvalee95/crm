'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { getRoleBadge, getStatusBadge } from '@/features/employee/labels';
import { formatAvatarUrl } from '@/lib/config/config'
import { EmployeeStatus, Role } from '@/lib/enums/status';
import { Employee } from '@/lib/interface/employee';
import { fetchEmployees } from '@/shared/store/employeeSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { formatTime } from '@/shared/utils/dateUtils';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const EmployeesList = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<Employee['status'] | 'all'>('all');
	const [roleFilter, setRoleFilter] = useState<Employee['role'] | 'all'>('all');

	const dispatch = useAppDispatch();
	const employees = useAppSelector((state) => state.employee.employees);
	const isLoading = useAppSelector((state) => state.employee.isLoading);
	const error = useAppSelector((state) => state.employee.error);

	// Component mount bo'lganda backend'dan employees yuklash
	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

	// Employees list - backend'dan olingan ma'lumotlar
	const filteredEmployees = useMemo(() => {
		let filtered = employees;

		// Search filter
		if (searchTerm) {
			filtered = filtered.filter(
				(employee) =>
					employee.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					employee.department?.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		// Status filter
		if (statusFilter !== 'all') {
			filtered = filtered.filter((employee) => employee.status === statusFilter);
		}

		// Role filter
		if (roleFilter !== 'all') {
			filtered = filtered.filter((employee) => employee.role === roleFilter);
		}

		return filtered;
	}, [employees, searchTerm, statusFilter, roleFilter]);

	const handleStatusFilter = (status: Employee['status'] | 'all') => {
		setStatusFilter(status);
	};
	const handleRoleFilter = (role: Employee['role'] | 'all') => {
		setRoleFilter(role);
	};

	return (
		<div>
			<Card className="bg-background border-gray-700 text-card-foreground shadow-xl">
				<CardHeader>
					<div className="flex gap-4 mt-4">
						<input
							type="text"
							placeholder="Поиск сотрудников..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-3 py-2 bg-background border border-gray-600 rounded-lg text-card-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
						/>
						{/* Status Filter */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="bg-background border-gray-700 text-card-foreground hover:bg-gray-500 rounded-lg w-50 justify-between"
								>
									{statusFilter === 'all' ? 'Все статусы' : statusFilter ? getStatusBadge(statusFilter) : 'Все статусы'}
									<ChevronDown className="w-4 h-4 ml-2" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="flex flex-col gap-2 bg-background
						 border-gray-700 text-card-foreground w-50 rounded-lg p-2 user-select-none "
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
									className="bg-background border-gray-700 text-card-foreground hover:bg-gray-500 rounded-lg w-50 justify-between"
								>
									{roleFilter === 'all' ? 'Все роли' : roleFilter ? getRoleBadge(roleFilter) : 'Все роли'}
									<ChevronDown className="w-4 h-4 ml-2" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="flex flex-col gap-2 bg-background
						 border-gray-700 text-card-foreground w-50 rounded-lg p-2 user-select-none "
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
			<Card className="bg-background border-gray-700 text-card-foreground shadow-xl mt-6">
				<CardTitle className="ml-4 text-xl font-semibold">Список сотрудников ( {filteredEmployees.length} )</CardTitle>
				<CardContent>
					{error && (
						<div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive mb-4">
							{error}
						</div>
					)}
					{isLoading ? (
						<div className="text-center py-8 text-gray-400">Загрузка сотрудников...</div>
					) : filteredEmployees.length === 0 ? (
						<div className="text-center py-8 text-gray-400">Сотрудники не найдены</div>
					) : (
						<div className="space-y-4">
							{filteredEmployees.map((employee) => (
								<div
									key={employee.id}
									className="border border-gray-700 rounded-lg p-4 hover:bg-gray-900/50 transition-colors"
								>
									<div className="flex items-center justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-4 mb-2">
												{ formatAvatarUrl(employee.avatar) ? (
													<img
														src={formatAvatarUrl(employee.avatar) || ''}
														alt={employee.fullName}
														className="w-10 h-10 rounded-full object-cover"
													/>
												) : (
													<div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
														<span className="text-card-foreground font-bold text-sm">
															{employee.fullName
																?.split(' ')
																.map((n) => n[0])
																.join('')
																.toUpperCase() || 'U'}
														</span>
													</div>
												)}
												<div>
													<h3 className="font-semibold text-card-foreground">{employee.fullName || 'Неизвестно'}</h3>
													<p className="text-muted-foreground text-sm">{employee.position || 'Не указано'}</p>
												</div>
											</div>
											<div className="grid grid-cols-2 gap-2 text-sm">
												<div>
													<span className="text-gray-500">Отдел:</span>
													<span className="text-card-foreground ml-2">{employee.department}</span>
												</div>
												<div>
													<span className="text-gray-500">Роль:</span>
													<span className="text-card-foreground ml-2">
														{employee.role ? getRoleBadge(employee.role) : 'Не указано'}
													</span>
												</div>
												<div>
													<span className="text-gray-500">Email:</span>
													<span className="text-card-foreground ml-2">{employee.email || 'Не указано'}</span>
												</div>
												<div>
													<span className="text-gray-500">Телефон:</span>
													<span className="text-card-foreground ml-2">{employee.phone || 'Не указано'}</span>
												</div>
												{employee.lastActivity && (
													<div>
														<span className="text-gray-500">Последняя активность:</span>
														<span className="text-card-foreground ml-2">{formatTime(new Date(employee.lastActivity))}</span>
													</div>
												)}
												<div>
													<span className="text-gray-500">Статус:</span>
													<span className="text-card-foreground ml-2">
														{employee.status ? getStatusBadge(employee.status) : 'Не указано'}
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
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default EmployeesList;
