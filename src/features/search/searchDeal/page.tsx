import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DealStage } from '@/lib/enums/deal'
import { Deal } from '@/lib/interface/deal';
import { Client } from '@/lib/types/types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';


const getStageBadge = (stage: Deal['stage']) => {
    switch (stage) {
        case DealStage.New:
            return <span>Новый</span>;
        case DealStage.InProgress:
            return <span>В работе</span>;
        case DealStage.Closed:
            return <span> Закрыт </span>;
        default:
            return <Badge variant="outline">Неизвестно</Badge>;
    }
};

interface SearchBarProps {
	onSearchChange: (searchTerm: string) => void;
	onStatusFilter: (status: Deal['stage'] | 'all') => void;
}

const DealSearchBar = ({ onSearchChange, onStatusFilter }: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStage, setSelectedStage] = useState<Deal['stage'] | 'all'>('all');

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearchChange(value);
	};

	const handleStatusFilter = (stage: Client['stage'] | 'all') => {
		setSelectedStage(stage);
		onStatusFilter(stage);
	};

	return (
		<div className="bg-black border border-gray-800 text-white shadow-lg mt-4 rounded-lg">
			<div className="flex items-center p-4 justify-between gap-4 w-full">
				<div className="relative hidden md:block  flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
					<Input
						placeholder="Поиск по имени, компании или email..."
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
								{selectedStage === 'all' ? 'Все Стадии' : getStageBadge(selectedStage)}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="flex flex-col gap-2 bg-white border-gray-700 text-black w-50 rounded-lg p-2">
							<DropdownMenuItem onClick={() => handleStatusFilter('all')}>Все Стадии</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleStatusFilter(DealStage.New)}>
								{getStageBadge(DealStage.New)}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleStatusFilter(DealStage.InProgress)}>
								{getStageBadge(DealStage.InProgress)}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleStatusFilter(DealStage.Closed)}>
								{getStageBadge(DealStage.Closed)}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};
export default DealSearchBar;
