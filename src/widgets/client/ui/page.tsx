import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recentClients } from '@/lib/data/client';
import { ClientStatus } from '@/lib/enums/status';
import { Client } from '@/lib/types/types';

const getStatusBadge = (status: Client['status']) => {
	switch (status) {
		case ClientStatus.active:
			return (
				<Badge variant="default" className="bg-green-600/20 text-green-400 border-none p-2">
					Активен
				</Badge>
			);
		case ClientStatus.new:
			return (
				<Badge variant="default" className="bg-blue-600/20 text-blue-400 border-none p-2">
					Новый
				</Badge>
			);
		case ClientStatus.inactive:
			return (
				<Badge variant="secondary" className="bg-gray-600/20 text-gray-400 border-none p-2">
					В работе
				</Badge>
			);
		default:
			return <Badge variant="outline">Неизвестно</Badge>;
	}
};

const ClientsHomePage = () => {
	return (
		<div>
			<Card className="bg-black border border-gray-800 text-white shadow-lg">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Последние клиенты</CardTitle>
				</CardHeader>
				<CardContent>
					{recentClients.map((client) => (
						<div
							key={client.name}
							className="border-gray-800 border rounded-lg flex justify-between item-center mt-5 p-3"
						>
							<div>
								<div className="flex items-center justify-between">
									<span className="font-medium">{client.company}</span>
								</div>
								<span className="text-gray-400 text-sm">
									{client.name} . {client.number}
								</span>
							</div>
							<span>{getStatusBadge(client.status)}</span>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default ClientsHomePage;
