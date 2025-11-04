'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { getStatusBadge } from '@/features/client/labels';
import { ClientStatus } from '@/lib/enums/status';
import { Client } from '@/lib/types/types';
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
	onSearchChange: (searchTerm: string) => void;
	onStatusFilter: (status: Client['status'] | 'all') => void;
}

const SearchBar = ({ onSearchChange, onStatusFilter }: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<Client['status'] | 'all'>('all');

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearchChange(value);
	};

	const handleStatusFilter = (status: Client['status'] | 'all') => {
		setSelectedStatus(status);
		onStatusFilter(status);
	};

	return (
		<div className="bg-background border border-gray-800 text-white !outline-none mt-4 rounded-lg">
			<div className="flex items-center p-4 justify-between gap-4 w-full">
				<div className="relative hidden md:block flex-1 !focus:outline-none">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !focus:outline-none" size={20} />
					<Input
						placeholder="Поиск по имени, компании или номеру телефона..."
						className="w-full pl-9 bg-background border-none text-card-foreground !focus:outline-none"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</div>

				<div className="flex gap-2">
					{/* Status Filter */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="bg-background border-border text-card-foreground hover:bg-accent rounded-lg w-50 justify-between"
							>
								{selectedStatus === 'all' ? (
									'Все Статусы'
								) : (
									<span className="inline-flex items-center">{getStatusBadge(selectedStatus)}</span>
								)}
								<ChevronDown className="w-4 h-4 ml-2 cursor-pointer" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="flex flex-col gap-2 bg-background border-border text-card-foreground w-50 rounded-lg p-2 user-select-none">
							<DropdownMenuItem onClick={() => handleStatusFilter('all')}>Все Статус</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleStatusFilter(ClientStatus.active)}>
								{getStatusBadge(ClientStatus.active)}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleStatusFilter(ClientStatus.new)}>
								{getStatusBadge(ClientStatus.new)}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleStatusFilter(ClientStatus.inactive)}>
								{getStatusBadge(ClientStatus.inactive)}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};
export default SearchBar;
