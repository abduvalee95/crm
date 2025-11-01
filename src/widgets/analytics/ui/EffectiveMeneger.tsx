import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Employee, employeesData } from '@/lib/data/emloyers'
import { analyticsData } from '@/lib/data/mock';
import { Client } from '@/lib/types/types';
import { useMemo } from 'react';

interface EffectProps {
	searchTerm?: string;
	statusFilter?: Employee['performance'] | 'all';
}

const EffectiveMeneger = ({ searchTerm = '', statusFilter = 'all' }: EffectProps) => {
	const filteredAndSortedClients = useMemo(() => {
		let filtered = employeesData.map((employee) => employee);
console.log(filtered)

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(client) =>
					client.performance.toLowerCase().includes(searchTerm.toLowerCase()) ||
					client.name.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		// Filter by status
		if (statusFilter !== 'all') {
			filtered = filtered.filter((client) => client.performance === statusFilter);
		}
		return filtered;
	}, [searchTerm, statusFilter]); //sortBy

	return (
		<Card className="bg-black border-gray-700 text-white shadow-xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
				Эффективность менеджеров
					{filteredAndSortedClients.length !== analyticsData.clientPerformance.length &&
						` (${filteredAndSortedClients.length} of ${analyticsData.clientPerformance.length})`}
				</CardTitle>
			</CardHeader>
			<CardContent className="max-h-[330px] overflow-y-auto">
				{filteredAndSortedClients.length === 0 ? (
					<div className="text-center py-8 text-gray-400">No clients found</div>
				) : (
					<div className="space-y-3">
						{filteredAndSortedClients.map((client) => (
							<div
								key={client.name}
								className="border border-gray-600 rounded-lg flex justify-between items-center p-4 hover:bg-gray-700/50 transition-colors"
							>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-1">
										<span className="font-medium text-white">{client.name}</span>
										<span className="text-green-400 font-semibold">₽{client.performance.toLocaleString()}</span>
									</div>
									<span className="text-gray-300 text-sm">
										{client.position} • {client.deals} сделок
									</span>
								</div>
								<div className="ml-4">
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											client.status === 'active'
												? 'bg-green-100 text-green-800'
												: client.email === 'new'
												? 'bg-blue-100 text-blue-800'
												: 'bg-gray-100 text-gray-800'
										}`}
									>
										{/* {client.status === 'active' ? 'Активный' : client.performance=== 'new' ? 'Новый' : 'Неактивный'} */}
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
