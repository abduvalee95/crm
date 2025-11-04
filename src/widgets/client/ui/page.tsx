'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recentClients } from '@/lib/data/client';
import { Client } from '@/lib/types/types';
import { useMemo } from 'react';
import { ClientListItem } from './ClientListItem';

interface ClientsHomePageProps {
	searchTerm?: string;
	statusFilter?: Client['status'] | 'all';
}

const ClientsHomePage = ({ searchTerm = '', statusFilter = 'all' }: ClientsHomePageProps) => {
	const filteredAndSortedClients = useMemo(() => {
		let filtered = recentClients;

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(client) =>
					client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
					client.number.includes(searchTerm),
			);
		}

		// Filter by status
		if (statusFilter !== 'all') {
			filtered = filtered.filter((client) => client.status === statusFilter);
		}

		return filtered;
	}, [searchTerm, statusFilter]);

	return (
		<div>
			<Card className="bg-background border border-border text-card-foreground shadow-lg">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>
						Клиенты
						{filteredAndSortedClients.length !== recentClients.length &&
							` (${filteredAndSortedClients.length} из ${recentClients.length})`}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{filteredAndSortedClients.length === 0 ? (
						<div className="text-center py-8 text-gray-400">Клиенты не найдены</div>
					) : (
						filteredAndSortedClients.map((client) => <ClientListItem key={client.id} client={client} />)
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default ClientsHomePage;
