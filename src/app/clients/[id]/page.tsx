'use client';

import ClientDetail from '@/widgets/client/ui/ClientDetail';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const isValidUuid = (value: string) =>
	/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value.trim());

export default function ClientDetailPage() {
	const params = useParams();
	const rawId = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string | undefined);
	const clientId = rawId?.trim();

	if (!clientId || !isValidUuid(clientId)) {
		return (
			<div className="flex-1 min-h-screen p-6 bg-black text-white">
				<div className="text-center py-8 space-y-4">
					<p className="text-gray-400">
						Invalid client ID format. ID must be a valid UUID (e.g., 123e4567-e89b-12d3-a456-426614174000)
					</p>
					<Link href="/clients" className="text-blue-400 hover:text-blue-300 inline-block">
						Назад к списку клиентов
					</Link>
				</div>
			</div>
		);
	}

	return <ClientDetail clientId={clientId} />;
}
