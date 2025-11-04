import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { getStageBadge } from '@/features/deal/labels';
import { DealStage } from '@/lib/enums/deal';
import { Deal } from '@/lib/interface/deal';
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

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

	const handleStatusFilter = (stage: Deal['stage'] | 'all') => {
		setSelectedStage(stage);
		onStatusFilter(stage);
	};

	return (
		<div className="bg-background border border-gray-800 text-white shadow-lg mt-4 rounded-lg">
			<div className="flex items-center p-4 justify-between gap-4 w-full">
				<div className="relative hidden md:block  flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
					<Input
						placeholder="Поиск по имени, компании или email..."
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
								{selectedStage === 'all' ? (
									'Все Стадии'
								) : (
									<span className="inline-flex items-center">{getStageBadge(selectedStage)}</span>
								)}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="flex flex-col gap-2 bg-background border-border text-card-foreground w-50 rounded-lg p-2 user-select-none">
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
