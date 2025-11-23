'use client';

import DealSearchBar from '@/features/search/searchDeal/page';
import { ViewMode } from '@/lib/enums/deal';
import DealKanbanView from '@/shared/kanban/ui/DealKanbanView';
import { fetchDeals } from '@/shared/store/dealSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import DealTableView from '@/shared/table/DealTableView';
import Header from '@/widgets/header/ui/Header';
import { useEffect, useMemo, useState } from 'react';

export default function DealPage() {
	const [activeView, setActiveView] = useState<ViewMode>(ViewMode.Kanban);
	const [searchTerm, setSearchTerm] = useState('');
	const [stageFilter, setStageFilter] = useState<string>('all');

	const dispatch = useAppDispatch();
	const deals = useAppSelector((state) => state.deal.deals);
	const isLoading = useAppSelector((state) => state.deal.isLoading);
	const error = useAppSelector((state) => state.deal.error);

	// Fetch deals on mount
	useEffect(() => {
		dispatch(fetchDeals());
	}, [dispatch]);

	// Filter deals
	const filteredDeals = useMemo(() => {
		let filtered = [...deals];

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(deal) =>
					deal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					deal.company?.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		// Filter by stage
		if (stageFilter !== 'all') {
			filtered = filtered.filter((deal) => deal.stage === stageFilter);
		}

		return filtered;
	}, [deals, searchTerm, stageFilter]);

	const handleViewChange = (view: ViewMode) => {
		setActiveView(view);
	};

	return (
		<div className="bg-background flex-1 w-full min-h-screen p-4 space-y-6 shadow-lg">
			<Header pageType="deals" activeView={activeView} onViewChange={handleViewChange} />
			<DealSearchBar onSearchChange={setSearchTerm} onStatusFilter={setStageFilter} />
			{error && (
				<div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
					{error}
				</div>
			)}
			{isLoading ? (
				<div className="text-center py-8 text-gray-400">Загрузка сделок...</div>
			) : (
				<>
					{activeView === ViewMode.Kanban ? (
						<DealKanbanView deals={filteredDeals as any} />
					) : (
						<DealTableView deals={filteredDeals as any} />
					)}
				</>
			)}
		</div>
	);
}
