'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Client } from '@/lib/types/types';
import { fetchClients } from '@/shared/store/clientSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { useEffect, useMemo } from 'react';
import { ClientListItem } from './ClientListItem';

interface ClientsHomePageProps {
	searchTerm?: string;
	statusFilter?: Client['status'] | 'all';
}

const ClientsHomePage = ({ searchTerm = '', statusFilter = 'all' }: ClientsHomePageProps) => {
	const dispatch = useAppDispatch();
	const clients = useAppSelector((state) => state.client.clients);
	const isLoading = useAppSelector((state) => state.client.isLoading);
	const error = useAppSelector((state) => state.client.error);

	// Component mount bo'lganda backend'dan clients yuklash
	useEffect(() => {
		if (clients.length === 0 && !isLoading) {
			dispatch(fetchClients());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const filteredAndSortedClients = useMemo(() => {
		let filtered = [...clients];

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(client) =>
					client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					client.phone?.includes(searchTerm),
			);
		}

		// Filter by status
		if (statusFilter !== 'all') {
			filtered = filtered.filter((client) => client.status === statusFilter);
		}

		return filtered;
	}, [clients, searchTerm, statusFilter]);

	return (
		<div>
			<Card className="bg-background border border-border text-card-foreground shadow-lg">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>
						Клиенты
						{filteredAndSortedClients.length !== clients.length &&
							` (${filteredAndSortedClients.length} из ${clients.length})`}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="text-center py-8 text-gray-400">Загрузка...</div>
					) : error ? (
						<div className="text-center py-8 text-red-400">{error}</div>
					) : filteredAndSortedClients.length === 0 ? (
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
