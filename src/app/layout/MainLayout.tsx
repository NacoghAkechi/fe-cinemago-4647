// layout/MainLayout.tsx
'use client';
import { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import SidebarProfile from './SidebarProfile';
// import ScrollToTop from '../components/ScrollToTop';
import ClientOnly from '../components/ClientOnly'; // Import thành phần client-only
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
// import AdminGuard from '../components/AdminGuard';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
// import SidebarAdmin from './SidebarAdmin';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	const locale = useLocale();
	return (
		<div className='flex min-h-screen flex-col'>
			{pathname.startsWith(`/${locale}/admin`) ? (
				// <AdminGuard>
				<div className=''>
					<PanelGroup direction='horizontal'>
						<Panel defaultSize={15} className='shadow-md' minSize={10}>
							{/* <SidebarAdmin /> */}
						</Panel>
						<PanelResizeHandle />
						<Panel defaultSize={70}>
							{/* <main className=''> */}
							<div className='p-5'>{children}</div>
							{/* </main> */}
						</Panel>
						<PanelResizeHandle />
					</PanelGroup>
				</div>
			) : (
				// </AdminGuard>
				<>
					<Header />
					<main className='flex-grow pt-16'>
						<ClientOnly>
							{pathname.startsWith(`/${locale}/profile`) ? (
								<div className='mx-auto my-5 flex max-w-[1200px] gap-4'>
									{/* <SidebarProfile /> */}
									<div className='w-[80%]'>{children}</div>
								</div>
							) : (
								<main className='flex-grow'>
									{/* <ScrollToTop /> */}
									{children}
								</main>
							)}
						</ClientOnly>
					</main>
					<Footer />
				</>
			)}
		</div>
	);
};

export default MainLayout;
