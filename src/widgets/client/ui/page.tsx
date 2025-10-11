"use client"

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recentClients } from '@/lib/data/client';
import { ClientStatus } from '@/lib/enums/status';
import { Client } from '@/lib/types/types';
import { useMemo } from 'react';

const getStatusBadge = (status: Client['status']) => {
	switch (status) {
		case ClientStatus.active:
			return (
				<Badge variant="default" className="bg-green-600/20 text-green-400 border-none p-2">
					Активен
				</Badge>
			);
		case ClientStatus.new:
			return (
				<Badge variant="default" className="bg-blue-600/20 text-blue-400 border-none p-2">
					Новый
				</Badge>
			);
		case ClientStatus.inactive:
			return (
				<Badge variant="secondary" className="bg-gray-600/20 text-gray-400 border-none p-2">
					В работе
				</Badge>
			);
		default:
			return <Badge variant="outline">Неизвестно</Badge>;
	}
};

interface ClientsHomePageProps {
	searchTerm?: string;
	statusFilter?: Client['status'] | 'all';
	// sortBy?: 'name' | 'company' | 'status';
}

const ClientsHomePage = ({ 
	searchTerm = '', 
	statusFilter = 'all', 
	// sortBy = 'name' 
}: ClientsHomePageProps) => {
	const filteredAndSortedClients = useMemo(() => {
		let filtered = recentClients;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(client => 
				client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
				client.number.includes(searchTerm)
			);
		}

		// Filter by status
		if (statusFilter !== 'all') {
			filtered = filtered.filter(client => client.status === statusFilter);
		}

		// Sort clients
		// filtered.sort((a, b) => {
		// 	switch (sortBy) {
		// 		case 'name':
		// 			return a.name.localeCompare(b.name);
		// 		case 'company':
		// 			return a.company.localeCompare(b.company);
		// 		case 'status':
		// 			return a.status.localeCompare(b.status);
		// 		default:
		// 			return 0;
		// 	}
		// });

		return filtered;
	}, [searchTerm, statusFilter]);//sortBy

	return (
		<div>
			<Card className="bg-black border border-gray-800 text-white shadow-lg">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>
						Клиенты 
						{filteredAndSortedClients.length !== recentClients.length && 
							` (${filteredAndSortedClients.length} из ${recentClients.length})`
						}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{filteredAndSortedClients.length === 0 ? (
						<div className="text-center py-8 text-gray-400">
							Клиенты не найдены
						</div>
					) : (
						filteredAndSortedClients.map((client) => (
							<div
								key={client.name}
								className="border-gray-800 border rounded-lg flex justify-between item-center mt-5 p-3 hover:bg-gray-900/50 transition-colors"
							>
								<div>
									<div className="flex items-center justify-between">
										<span className="font-medium">{client.company}</span>
									</div>
									<span className="text-gray-400 text-sm">
										{client.name} . {client.number}
									</span>
								</div>
								<span>{getStatusBadge(client.status)}</span>
							</div>
						))
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default ClientsHomePage;
