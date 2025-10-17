'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ClientStatus } from '@/lib/enums/status';
import { Client } from '@/lib/types/types';
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
	onSearchChange: (searchTerm: string) => void;
	onStatusFilter: (status: Client['status'] | 'all') => void;
	//   onSortChange: (sortBy: 'name' | 'company' | 'status') => void;
}
// , onSortChange

const SearchBar = ({ onSearchChange, onStatusFilter }: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<Client['status'] | 'all'>('all');
	// const [selectedSort, setSelectedSort] = useState<'name' | 'company' | 'status'>('name');

	const getStatusBadge = (status: Client['status']) => {
		switch (status) {
			case ClientStatus.active:
				return <span>Активен</span>;
			case ClientStatus.new:
				return <span>Новый</span>;
			case ClientStatus.inactive:
				return <span> Неактивен </span>;
			default:
				return <Badge variant="outline">Неизвестно</Badge>;
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearchChange(value);
	};

	const handleStatusFilter = (status: Client['status'] | 'all') => {
		setSelectedStatus(status);
		onStatusFilter(status);
	};

	// const handleSortChange = (sortBy: 'name' | 'company' | 'status') => {
	//     setSelectedSort(sortBy);
	//     onSortChange(sortBy);
	// };

	return (
		<div className="bg-black border border-gray-800 text-white shadow-lg mt-4 rounded-lg">
			<div className="flex items-center p-4 justify-between gap-4 w-full">
				<div className="relative hidden md:block  flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
					<Input
						placeholder="Поиск по имени, компании или номеру телефона..."
						className="w-full pl-9 bg-[#1B1E23] border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
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
								className="bg-[#1B1E23] border-gray-700 text-white hover:bg-gray-500 rounded-lg w-50 justify-between"
							>
								{selectedStatus === 'all' ? 'Все Статусы' : getStatusBadge(selectedStatus)}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="flex flex-col gap-2 bg-white border-gray-700 text-black w-50 rounded-lg p-2">
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
					{/*
                    Sort Options
                 <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-[#1B1E23] border-gray-700 text-white hover:bg-gray-800">
                                <ArrowUpDown className="w-4 h-4 mr-2" />
                                Сортировка
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleSortChange('name')}>
                                По имени
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSortChange('company')}>
                                По компании
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSortChange('status')}>
                                По статусу
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
				</div>
			</div>
		</div>
	);
};
export default SearchBar;
