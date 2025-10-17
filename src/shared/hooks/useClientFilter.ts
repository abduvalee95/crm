import { recentClients } from '@/lib/data/client';
import { Client } from '@/lib/types/types';
import { useMemo, useState } from 'react';

export const useClientFilter = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<Client['status'] | 'all'>('all');
	const [stageFilter, setStageFilter] = useState<Client['stage'] | 'all'>('all');
	// const [sortBy, setSortBy] = useState<'name' | 'company' | 'status'>('name');

	const filteredClients = useMemo(() => {
		let filtered = recentClients;

		if (searchTerm) {
			filtered = filtered.filter(
				(client) =>
					client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
					client.number.includes(searchTerm),
			);
		}

		// Filter by deal stage if selected
		if (stageFilter !== 'all') {
			filtered = filtered.filter((client) => client.stage === stageFilter);
		}

		// // Filter by status (kept for future use)
		// if (statusFilter !== 'all') {
		//   filtered = filtered.filter(client => client.status === statusFilter);
		// }

		return filtered;
	}, [searchTerm, statusFilter, stageFilter]);

	return {
		searchTerm,
		setSearchTerm,
		statusFilter,
		setStatusFilter,
		stageFilter,
		setStageFilter,
		// sortBy,
		// setSortBy,
		filteredClients,
		totalClients: recentClients.length,
		filteredCount: filteredClients.length,
	};
};
