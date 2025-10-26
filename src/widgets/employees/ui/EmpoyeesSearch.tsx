'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { employeesData } from '@/lib/data/emloyers';
import { Download, Search } from 'lucide-react';
import { useState } from 'react';

const EmployeesSearch = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [departmentFilter, setDepartmentFilter] = useState('all');
	const [statusFilter, setStatusFilter] = useState('all');
	const [performanceFilter, setPerformanceFilter] = useState('all');
	const [roleFilter, setRoleFilter] = useState('all');

	const departments = [...new Set(employeesData.map((emp) => emp.department))];
	const statuses = ['active', 'inactive', 'on_leave'];
	const performances = ['excellent', 'good', 'average', 'needs_improvement'];

	const filteredEmployees = employeesData.filter((employee) => {
		const matchesSearch =
			employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.email.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
		const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
		const matchesPerformance = performanceFilter === 'all' || employee.performance === performanceFilter;
		const matchesRole = roleFilter === 'all' || employee.role === roleFilter;

		return matchesSearch && matchesDepartment && matchesStatus && matchesPerformance && matchesRole;
	});

	const exportData = () => {
		const csvContent = [
			['Имя', 'Должность', 'Отдел', 'Email', 'Телефон', 'Статус', 'Производительность', 'Сделки', 'Доход'],
			...filteredEmployees.map((emp) => [
				emp.name,
				emp.position,
				emp.department,
				emp.email,
				emp.phone,
				emp.status,
				emp.performance,
				emp.deals || 0,
				emp.revenue || 0,
			]),
		]
			.map((row) => row.join(','))
			.join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'employees.csv';
		a.click();
		window.URL.revokeObjectURL(url);
	};

	return (
		<Card className="bg-black border-gray-700 text-white shadow-xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold flex items-center gap-2">
					<Search className="w-5 h-5" />
					Поиск и фильтрация сотрудников
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* Search Input */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
						<input
							type="text"
							placeholder="Поиск по имени, должности или email..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Filters */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">Отдел</label>
							<select
								value={departmentFilter}
								onChange={(e) => setDepartmentFilter(e.target.value)}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="all">Все отделы</option>
								{departments.map((dept) => (
									<option key={dept} value={dept}>
										{dept}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">Статус</label>
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="active">Активные</option>
								<option value="inactive">Неактивные</option>
								<option value="on_leave">В отпуске</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">Производительность</label>
							<select
								value={performanceFilter}
								onChange={(e) => setPerformanceFilter(e.target.value)}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="all">Все уровни</option>
								<option value="excellent">Отлично</option>
								<option value="good">Хорошо</option>
								<option value="average">Средне</option>
								<option value="needs_improvement">Требует улучшения</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">Роль</label>
							<select
								value={roleFilter}
								onChange={(e) => setRoleFilter(e.target.value)}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="all">Все роли</option>
								<option value="admin">Админ</option>
								<option value="manager">Менеджер</option>
								<option value="analyst">Аналитик</option>
								<option value="support">Поддержка</option>
							</select>
						</div>
					</div>

					{/* Results Summary and Export */}
					<div className="flex items-center justify-between pt-4 border-t border-gray-700">
						<div className="text-sm text-gray-400">
							Найдено: <span className="text-white font-semibold">{filteredEmployees.length}</span> сотрудников
						</div>
						<button
							onClick={exportData}
							className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
						>
							<Download className="w-4 h-4" />
							Экспорт CSV
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default EmployeesSearch;
