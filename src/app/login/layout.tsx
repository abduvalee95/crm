import StoreProvider from '@/providers/StoreProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function LoginLayout({
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

