import StoreProvider from '@/providers/StoreProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthInitializer } from '@/widgets/auth/ui/AuthInitializer';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import SidebarContainer from '../widgets/sidebar/ui/SidebarContainer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crm.localhost';

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'CRM система для управления продажами и клиентами',
		template: '%s | CRM система',
	},
	description:
		'Единая CRM платформа для аналитики, сделок и поддержки клиентов: дашборды, чаты, задачи и настройки команды.',
	keywords: [
		'CRM система',
		'управление клиентами',
		'аналитика продаж',
		'сделки и задачи',
		'контакт-центр',
		'настольная CRM',
	],
	openGraph: {
		title: 'CRM система для управления продажами и клиентами',
		description:
			'Контролируйте работу отделов продаж, задач и поддержки клиентов в одном интерфейсе с аналитикой и чатами.',
		url: siteUrl,
		type: 'website',
		locale: 'ru_RU',
		images: [
			{
				url: `${siteUrl}/analytics.png`,
				width: 1200,
				height: 630,
				alt: 'Дашборд CRM системы',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'CRM система для управления продажами и клиентами',
		description: 'Расширенные инструменты аналитики, сделок и коммуникации с клиентами в одной CRM платформе.',
		images: [`${siteUrl}/analytics.png`],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	alternates: {
		canonical: '/',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	viewportFit: 'cover',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body className={`${inter.className} antialiased bg-background text-foreground`}>
				<StoreProvider>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
						<AuthInitializer />
						<a className="skip-to-content" href="#main-content">
							Перейти к основному содержанию
						</a>
						<div className="flex min-h-screen bg-background text-foreground">
							<SidebarContainer />
							<main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
								{children}
							</main>
						</div>
					</ThemeProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
