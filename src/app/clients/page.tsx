'use client';

import SearchBar from '@/features/search/search';
import { useClientFilter } from '@/shared/hooks/useClientFilter';
import ClientsHomePage from '@/widgets/client/ui/page';
import Header from '@/widgets/header/ui/Header';

export default function ClientPage() {
	const {
		searchTerm,
		setSearchTerm,
		statusFilter,
		setStatusFilter,
		// sortBy,
		// setSortBy
	} = useClientFilter();

	return (
		<div className="w-full flex-1 bg-black min-h-screen p-4 space-y-6 shadow-lg">
			<div>
				<Header pageType="clients" />
				<SearchBar
					onSearchChange={setSearchTerm}
					onStatusFilter={setStatusFilter}
					// onSortChange={setSortBy}
				/>
			</div>
			<ClientsHomePage
				searchTerm={searchTerm}
				statusFilter={statusFilter}
				// sortBy={sortBy}
			/>
		</div>
	);
}
