import StoreProvider from '@/providers/StoreProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function RegisterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<StoreProvider>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
				{children}
			</ThemeProvider>
		</StoreProvider>
	);
}

