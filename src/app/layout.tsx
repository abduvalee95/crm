import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Menu from '../widgets/sidebar/ui/Menu';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'CRM system',
	description: 'crm system dashboard',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
					<div className="w-full h-screen flex text-white bg-black dark:bg-black">
						<div className="flex flex-col w-70 shadow-lg border-l border-gray-800">
							<Menu />
						</div>
						<div className="flex-1">{children}</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}