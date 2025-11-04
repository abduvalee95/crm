import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Employee, employeesData } from '@/lib/data/emloyers';
import { analyticsData } from '@/lib/data/mock';
import { Performance } from '@/lib/enums/status';
import { useMemo } from 'react';

interface EffectProps {
	searchTerm?: string;
	statusFilter?: Employee['performance'] | 'all';
}

const EffectiveMeneger = ({ searchTerm = '', statusFilter = 'all' }: EffectProps) => {
	const filteredAndSortedClients = useMemo(() => {
		let filtered = employeesData.map((employee) => employee);

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
	}, [searchTerm, statusFilter]);

	return (
		<Card className="bg-background text-card-foreground border-border shadow-xl">
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
										<span className="font-medium text-card-foreground">{client.name}</span>
										<span className="text-accent-green font-semibold">₽{client.revenue?.toLocaleString()}</span>
									</div>
									<span className="text-muted-foreground text-sm">
										{client.position} • {client.deals} сделок
									</span>
								</div>
								<div className="ml-4">
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											client.performance === Performance.EXCELLENT
												? 'bg-green-500/20 text-green-400 border border-green-500/30'
												: client.performance === Performance.GOOD
												? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
												: client.performance === Performance.AVERAGE
												? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
												: 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
										}`}
									>
										{client.performance === Performance.EXCELLENT
											? 'Отлично'
											: client.performance === Performance.GOOD
											? 'Хорошо'
											: client.performance === Performance.AVERAGE
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
