import { getStatusBadge } from '@/features/client/labels';
import { Client } from '@/lib/types/types';
import Link from 'next/link';

interface ClientListItemProps {
	client: Client;
}

export function ClientListItem({ client }: ClientListItemProps) {
	return (
		<Link href={`/clients/${client.id}`}>
			<div className="border border-border rounded-lg flex items-center justify-between mt-5 p-3 hover:bg-accent transition-colors cursor-pointer">
				<div>
					<div className="flex items-center justify-between">
						<span className="font-medium">{client.company}</span>
					</div>
					<span className="text-muted-foreground text-sm">
						{client.name} • {client.number}
					</span>
				</div>
				<span>{getStatusBadge(client.status)}</span>
			</div>
		</Link>
	);
}
