'use client';

import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import './cart.css';

const items = [
	{
		id: 1,
		title: 'Sản phẩm 1',
		quantity: 2,
		seat: 'Hàng A, Ghế 5',
		price: '500.000 VND',
		paymentStatus: 'completed',
		image: 'https://via.placeholder.com/100',
	},
	{
		id: 2,
		title: 'Sản phẩm 2',
		quantity: 1,
		seat: 'Hàng B, Ghế 3',
		price: '300.000 VND',
		paymentStatus: 'cancelled',
		image: 'https://via.placeholder.com/100',
	},
	{
		id: 3,
		title: 'Sản phẩm 3',
		quantity: 4,
		seat: 'Hàng C, Ghế 10-13',
		price: '1.200.000 VND',
		paymentStatus: 'return',
		image: 'https://via.placeholder.com/100',
	},
	{
		id: 4,
		title: 'Sản phẩm 4',
		quantity: 3,
		seat: 'Hàng D, Ghế 2-4',
		price: '900.000 VND',
		paymentStatus: 'completed',
		image: 'https://via.placeholder.com/100',
	},
];

const tabListNoTitle = [
	{ key: 'all', label: 'Tất cả' },
	{ key: 'completed', label: 'Đã thanh toán' },
	{ key: 'cancelled', label: 'Đã hủy' },
	{ key: 'return', label: 'Đã hoàn tiền' },
];

const renderItems = (
	items: {
		id: number;
		title: string;
		quantity: number;
		seat: string;
		price: string;
		paymentStatus: string;
		image: string;
	}[],
) => (
	<div className='grid grid-cols-1 gap-4'>
		{items.map((item) => (
			<Card key={item.id} bordered className='p-5 shadow-md'>
				<div className='grid grid-cols-2 justify-between gap-6'>
					{/* Cột hình ảnh + mô tả sản phẩm */}
					<div className='flex gap-4'>
						{/* Hình ảnh */}
						<div className='flex items-center'>
							<img src={item.image} alt={item.title} className='object-cover' />
						</div>

						{/* Mô tả sản phẩm */}
						<div className='flex flex-col justify-center text-lg'>
							<h3 className='text-2xl font-bold'>{item.title}</h3>
							<p>Số lượng: {item.quantity}</p>
							<p>Số ghế: {item.seat}</p>
						</div>
					</div>

					{/* Cột giá + trạng thái */}
					<div className='flex items-center justify-end gap-2'>
						{/* Giá */}
						<div>
							<p className='font-bold text-primary'>{item.price}</p>
						</div>

						{/* Trạng thái */}
						<div className='flex w-32 justify-center'>
							<p
								className={`h-fit w-fit rounded px-2 py-1 ${
									item.paymentStatus === 'completed'
										? 'bg-green-200 text-green-800'
										: item.paymentStatus === 'cancelled'
											? 'bg-red-200 text-red-800'
											: 'bg-yellow-200 text-yellow-800'
								}`}
							>
								{item.paymentStatus === 'completed'
									? 'Đã thanh toán'
									: item.paymentStatus === 'cancelled'
										? 'Đã hủy'
										: 'Đã hoàn tiền'}
							</p>
						</div>
					</div>
				</div>
			</Card>
		))}
	</div>
);

const App: React.FC = () => {
	const [activeTabKey, setActiveTabKey] = useState<string>('all');

	useEffect(() => {
		const storedTabKey = localStorage.getItem('activeTabKey');
		if (storedTabKey) {
			setActiveTabKey(storedTabKey);
		}
	}, []);

	const onTabChange = (key: string) => {
		setActiveTabKey(key);
		localStorage.setItem('activeTabKey', key);
	};

	const filteredItems =
		activeTabKey === 'all' ? items : items.filter((item) => item.paymentStatus === activeTabKey);

	return (
		<div>
			<Card style={{ width: '95%' }} className='flex h-auto w-[95%] flex-col gap-4 p-4'>
				<Tabs defaultActiveKey='all' activeKey={activeTabKey} onChange={onTabChange}>
					{tabListNoTitle.map((tab) => (
						<Tabs.TabPane
							key={tab.key}
							tab={
								<span className={`p-4 text-lg font-bold uppercase text-primary`}>{tab.label}</span>
							}
						/>
					))}
				</Tabs>
				{renderItems(filteredItems)}
			</Card>
		</div>
	);
};

export default App;