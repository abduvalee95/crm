'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex-1 min-h-screen bg-background text-foreground flex items-center justify-center p-6">
			<div className="text-center space-y-6 max-w-md">
				<div className="space-y-2">
					<h1 className="text-6xl font-bold">404</h1>
					<h2 className="text-2xl font-semibold">Страница не найдена</h2>
					<p className="text-muted-foreground">Извините, запрашиваемая страница не существует или была перемещена.</p>
				</div>
				<div className="flex gap-3 justify-center">
					<Link href="/">
						<Button>
							<Home className="w-4 h-4 mr-2" />
							На главную
						</Button>
					</Link>
					<Button variant="outline" onClick={() => window.history.back()}>
						Назад
					</Button>
				</div>
			</div>
		</div>
	);
}
