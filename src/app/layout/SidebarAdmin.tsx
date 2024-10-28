'use client';
import { Button, Image } from '@nextui-org/react';
import {
	Bell,
	ChartBarStacked,
	CirclePercent,
	Clapperboard,
	ClipboardList,
	FileQuestion,
	House,
	LogOut,
	MessageCircleMore,
	NotebookTabs,
	NotepadText,
	Phone,
	Popcorn,
	ShoppingBag,
	Star,
	Store,
	Ticket,
	UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { Panel } from 'react-resizable-panels';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import TabItem from '../components/TabItem';
import { useTheme } from '../context/ThemeContext';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
const SidebarAdmin: FC = () => {
	const t = useTranslations('LayoutSideBarAdmin'); // Initialize translations
	const [activeMainTab, setActiveMainTab] = useState<string>('');
	const [activeSubTab, setActiveSubTab] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const { isLogin, setIsLogin, setRole } = useUser();
	const { isCollapsedAdmin, isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();
	const divWidth = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const storedMainTab = localStorage.getItem('activeMainTab');
		const storedSubTab = localStorage.getItem('activeSubTab');
		if (storedMainTab) setActiveMainTab(storedMainTab);
		if (storedSubTab) setActiveSubTab(storedSubTab);
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem('activeMainTab', activeMainTab);
			localStorage.setItem('activeSubTab', activeSubTab);
		}
	}, [activeMainTab, activeSubTab, isLoaded]);

	useEffect(() => {
		// console.log(1);
		// console.log('activeMainTab', localStorage.setItem('activeMainTab', activeMainTab));
		// console.log('activeSubTab', localStorage.setItem('activeSubTab', activeSubTab));

		if (isLoaded) {
			// Use a timeout to ensure the states are fully updated before storing in localStorage
			const timeoutId = setTimeout(() => {
				localStorage.setItem('activeMainTab', activeMainTab);
				localStorage.setItem('activeSubTab', activeSubTab);
			}); // You can adjust the delay if needed

			return () => clearTimeout(timeoutId); // Clean up the timeout
		}
	}, [activeMainTab, activeSubTab, isLoaded]);

	if (!isLoaded) {
		return null;
	}

	const handleLogOutAdmin = () => {
		setRole('dXNlcg');
		setIsLogin(false);
		router.push(`/${locale}/`);
	};

	return (
		<div
			ref={divWidth}
			// className={`fixed bottom-0 left-0 top-0 min-h-screen bg-white shadow ${isCollapsedAdmin ? 'w-[112px]' : 'w-[320px]'}`}
			className={`fixed bottom-0 left-0 top-0 min-h-screen shadow transition-all duration-500 ${isCollapsedAdmin ? 'w-[112px]' : 'w-[320px]'} ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}
		>
			<div className=''>
				<div className='flex items-center justify-center'>
					{/* {t('title')}  */}
					<Image src='/images/logo1.png' width={80} height={60} alt='Logo' />
				</div>

				<ul className='space-y-2 py-3'>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='/'
						title={t('home')}
						icon={House}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='AdminCustomerCare'
						title={t('customerCare')}
						icon={NotebookTabs}
						subItems={[
							{
								name: 'chat',
								label: t('chat'), // Use translation for chat
								icon: <MessageCircleMore height={20} width={20} />,
							},
							{
								name: 'tickets',
								label: t('supportRequests'), // Use translation for support requests
								icon: <Phone height={20} width={20} />,
							},
							{
								name: 'faq',
								label: t('faq'), // Use translation for FAQ
								icon: <FileQuestion height={20} width={20} />,
							},
						]}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-movie'
						title={t('movieManagement')}
						icon={Clapperboard}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminReport'
						title={t('statisticsReports')}
						icon={NotepadText}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminOrder'
						title={t('revenueManagement')}
						icon={ShoppingBag}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-branch'
						title={t('branchManagement')}
						icon={Store}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-room'
						title={t('roomManagement')}
						icon={ChartBarStacked}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-food-drink'
						title={t('foodDrinkManagement')}
						icon={Popcorn}
					/>
					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-user'
						title={t('userManagement')}
						icon={UserRound}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='adminInteract'
						title={t('commentsReviews')}
						icon={Star}
					/>

					<TabItem
						activeMainTab={activeMainTab}
						setActiveMainTab={setActiveMainTab}
						activeSubTab={activeSubTab}
						setActiveSubTab={setActiveSubTab}
						tabName='admin-voucher'
						title={t('promotionManagement')}
						icon={CirclePercent}
					/>
				</ul>
				{/* Uncomment the logout button if needed */}
				{/* <div className='w-full'>
		            <Button
		                color='danger'
		                className='w-full'
		                startContent={<LogOut />}
		                onClick={handleLogOutAdmin}
		            >
		                {t('logout')} {/* Use translation for logout */}
				{/* </Button>
		        </div> */}
			</div>
		</div>
		// <div>
		// 	{' '}
		// 	<div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
		// 		<Sidebar collapsed={collapsed}>
		// 			<Menu>
		// 				<MenuItem> Documentation</MenuItem>
		// 				<MenuItem> Calendar</MenuItem>
		// 				<MenuItem> E-commerce</MenuItem>
		// 				<MenuItem> Examples</MenuItem>
		// 			</Menu>
		// 		</Sidebar>
		// 		<main style={{ padding: 10 }}>
		// 			<div>
		// 				<button className='sb-button' onClick={() => setCollapsed(!collapsed)}>
		// 					Collapse
		// 				</button>
		// 			</div>
		// 		</main>
		// 	</div>
		// </div>
	);
};

export default SidebarAdmin;
