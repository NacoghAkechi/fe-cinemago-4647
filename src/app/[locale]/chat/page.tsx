// pages/chat.tsx
'use client';
import { useContext, useEffect } from 'react';
import UserChat from '@/app/components/UserChat';

import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import { useLocale } from 'next-intl';

const ChatPage: React.FC = () => {
	const { user, isLogin, isLoading, role } = useUser();

	const router = useRouter();
	const locale = useLocale();
	useEffect(() => {
		console.log('user', user);
		console.log('isLogin', isLogin);

		// if (!isLogin) {
		// 	router.push(`/${locale}/login`); // Redirect nếu chưa đăng nhập
		// } else if (role !== 'user') {
		// 	router.push(`/${locale}/`); // Redirect nếu không phải khách hàng
		// }
	}, [isLogin, user, router]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
			<h1>Chat với Admin</h1>
			<UserChat />
		</div>
	);
};

export default ChatPage;