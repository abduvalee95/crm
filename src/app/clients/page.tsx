"use client"

import ClientsHomePage from '@/widgets/client/ui/page'
import HeaderClient from '@/features/client/header/page'
import React from 'react'
import SearchBar from '@/features/search/search'
import { useClientFilter } from '@/shared/hooks/useClientFilter'

export default function ClientPage(){
	const {
		searchTerm,
		setSearchTerm,
		statusFilter,
		setStatusFilter,
		// sortBy,
		// setSortBy
	} = useClientFilter();

	return (
		<div className='w-full flex-1 bg-black min-h-screen p-4 space-y-6 shadow-lg'>
			<div>
				<HeaderClient/>
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
	)
}
 