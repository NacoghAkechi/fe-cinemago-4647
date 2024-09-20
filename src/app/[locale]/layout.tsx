
import { Inter } from 'next/font/google';
import './globals.css';
import { FC, ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from '../context/ThemeContext';
import MainLayout from '../layout/MainLayout'; // Import MainLayout
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
	title: 'Cinema',
	description: 'Generated by create next app',
};
interface RootLayoutProps {
	children: ReactNode;
	params: {
		locale: string;
	};
}

export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<RootLayoutProps>) {
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<body className={inter.className}>
				<NextIntlClientProvider messages={messages}>
					<NextUIProvider>

						<ThemeProvider>
							<MainLayout>{children}</MainLayout>
						</ThemeProvider>

					</NextUIProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
