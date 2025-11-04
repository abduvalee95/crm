'use client';

import ClientDetail from '@/widgets/client/ui/ClientDetail';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ClientDetailPage() {
	const params = useParams();
	const clientId = params?.id ? parseInt(params.id as string, 10) : null;

	if (!clientId || isNaN(clientId)) {
		return (
			<div className="flex-1 min-h-screen p-6 bg-black text-white">
				<div className="text-center py-8">
					<p className="text-gray-400">Неверный ID клиента</p>
					<Link href="/clients" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
						Назад к списку клиентов
					</Link>
				</div>
			</div>
		);
	}

	return <ClientDetail clientId={clientId} />;
}
