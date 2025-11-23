'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmployeeStatus, Performance } from '@/lib/enums/status';
import { Employee } from '@/lib/interface/employee'
import { fetchEmployees } from '@/shared/store/employeeSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { useEffect, useMemo } from 'react';

interface EffectProps {
	searchTerm?: string;
	statusFilter?: EmployeeStatus | 'all';
}

const EffectiveMeneger = ({ searchTerm = '', statusFilter = 'all' }: EffectProps) => {
	const dispatch = useAppDispatch();
	const employees = useAppSelector((s) => s.employee.employees);
	const isLoading = useAppSelector((s) => s.employee.isLoading);

	// Employee ma'lumotlarini yuklash
	useEffect(() => {
		if (employees.length === 0 && !isLoading) {
			dispatch(fetchEmployees());
		}
	}, [dispatch, employees.length, isLoading]);

	const filteredAndSortedEmployees = useMemo(() => {
		let filtered = employees.filter((emp) => emp.id !== undefined && emp.fullName !== undefined).map((emp) => emp);

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(emp) =>
					emp.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					emp.position?.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		// Filter by status
		if (statusFilter !== 'all') {
			filtered = filtered.filter((emp) => emp.status === statusFilter);
		}

		// Sort by revenue (descending)
		return filtered as Employee[]; //.sort((a, b) => (b.revenue || 0) - (a.revenue || 0));
	}, [searchTerm, statusFilter, employees]);

	return (
		<Card className="bg-background text-card-foreground border-border shadow-xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
					Эффективность менеджеров
					{filteredAndSortedEmployees.length !== employees.filter((e) => e.id !== undefined).length &&
						` (${filteredAndSortedEmployees.length} of ${employees.filter((e) => e.id !== undefined).length})`}
				</CardTitle>
			</CardHeader>
			<CardContent className="max-h-[330px] overflow-y-auto">
				{filteredAndSortedEmployees.length === 0 ? (
					<div className="text-center py-8 text-gray-400">Менеджеры не найдены</div>
				) : (
					<div className="space-y-3">
						{filteredAndSortedEmployees.map((employee) => (
							<div
								key={employee.id}
								className="border border-gray-600 rounded-lg flex justify-between items-center p-4 hover:bg-gray-700/50 transition-colors"
							>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-1">
										<span className="font-medium text-card-foreground">{employee.fullName}</span>
										<span className="text-accent-green font-semibold">₽{employee.revenue?.toLocaleString()}</span>
									</div>
									<span className="text-muted-foreground text-sm">
										{employee.position} • {employee.deals} сделок
									</span>
								</div>
								<div className="ml-4">
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											employee.performance === Performance.EXCELLENT
												? 'bg-green-500/20 text-green-400 border border-green-500/30'
												: employee.performance === Performance.GOOD
												? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
												: employee.performance === Performance.AVERAGE
												? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
												: 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
										}`}
									>
										{employee.performance === Performance.EXCELLENT
											? 'Отлично'
											: employee.performance === Performance.GOOD
											? 'Хорошо'
											: employee.performance === Performance.AVERAGE
											? 'Средне'
											: 'Нужно улучшение'}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default EffectiveMeneger;
