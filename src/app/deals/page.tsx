'use client';

import DealSearchBar from '@/features/search/searchDeal/page';
import { ViewMode } from '@/lib/enums/deal';
import { useClientFilter } from '@/shared/hooks/useClientFilter';
import DealKanbanView from '@/shared/kanban/ui/DealKanbanView';

import DealTableView from '@/shared/table/DealTableView';
import Header from '@/widgets/header/ui/Header';
import { useState } from 'react';

export default function DealPage() {
	const [activeView, setActiveView] = useState<ViewMode>(ViewMode.Kanban);

	const {
		searchTerm,
		setSearchTerm,
		stageFilter,
		setStageFilter,
		filteredClients,
		// sortBy,
		// setSortBy
	} = useClientFilter();

	const handleViewChange = (view: ViewMode) => {
		setActiveView(view);
	};

	return (
		<div className="bg-black flex-1 w-full min-h-screen p-4 space-y-6 shadow-lg">
			<Header pageType="deals" activeView={activeView} onViewChange={handleViewChange} />
			<DealSearchBar onSearchChange={setSearchTerm} onStatusFilter={setStageFilter} />
			{/* Pass filtered clients list as deals */}
			{activeView === ViewMode.Kanban ? (
				<DealKanbanView deals={filteredClients as any} />
			) : (
				<DealTableView deals={filteredClients as any} />
			)}
		</div>
	);
}
