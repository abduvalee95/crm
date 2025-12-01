import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getStatusBadge } from '@/features/client/labels';
import { Client } from '@/lib/types/types';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface ClientListItemProps {
	client: Client;
	onEdit: (client: Client) => void;
	onDelete: (client: Client) => void;
}

export function ClientListItem({ client, onEdit, onDelete }: ClientListItemProps) {
	return (
		<div className="border border-border rounded-lg flex items-center justify-between mt-5 p-3 hover:bg-accent transition-colors cursor-pointer group">
			<Link href={`/clients/${client.id}`} className="flex-1">
				<div>
					<div className="flex items-center justify-between">
						<span className="font-medium">{client.company}</span>
					</div>
					<span className="text-muted-foreground text-sm">
						{client.name} • {client.phone}
					</span>
				</div>
			</Link>
			<div className="flex items-center gap-4">
				<span>{getStatusBadge(client.status)}</span>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onEdit(client)}>
							<Edit className="mr-2 h-4 w-4" />
							Изменить
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onDelete(client)} className="text-red-600">
							<Trash2 className="mr-2 h-4 w-4" />
							Удалить
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
