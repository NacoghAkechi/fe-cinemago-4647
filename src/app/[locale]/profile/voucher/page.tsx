'use client';

import React, { useEffect, useState } from 'react';
import { data } from './voucher';
import { Card } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { Tickets } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import { useTheme } from '@/app/context/ThemeContext';

interface CategoryLanguage {
	id: string; // Include the id field
	languageCode: string;
}

interface Translation {
	id: string;
	name: string;
	description: string;
	categoryLanguage: CategoryLanguage;
}

interface Promotion {
	id: string;
	discountType: 'percentage' | 'amount'; // Add other types if needed
	discountValue: string;
	startDate: string; // You can use Date if needed
	endDate: string; // You can use Date if needed
	minimumPurchase: number;
	applicableMovies: {
		movieIds: string[];
	};
	usageLimit: number;
	usageCount: number;
	isActive: boolean;
	createdAt: string; // You can use Date if needed
	translations: Translation[];
}
const App: React.FC = () => {
	const [selectedTranslation, setSelectedTranslation] = useState<any | null>(null);
	const [dataPromotion, setDataPromotion] = useState<Promotion[]>([]);
	const [selectedVoucher, setSelectedVoucher] = useState<any | null>(null);
	const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
	const t = useTranslations('UserProfile.voucher');
	const locale = useLocale();
	const router = useRouter();
	const { isOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { isDarkMode } = useTheme();
	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API}/promotions?languageCode=${locale}`)
			.then((response) => {
				setDataPromotion(response.data.data);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error);
			});
	});
	const formatDateForDisplay = (dateString: string) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const handleUseNow = () => {
		router.push(`/${locale}/movies`);
	};

	const openModal = (value: Translation, voucher: any) => {
		onOpenChange();
		setSelectedTranslation(value);
		setSelectedVoucher(voucher);
		setSelectedMovies(voucher.applicableMovies.movieIds);
	};
	if (!isLoading) {
		return (
			<div className='flex h-[50vh] items-center justify-center'>
				<Loading />
			</div>
		);
	}
	return (
		<div>
			<Card
				className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} mb-5 w-[90%] border-gray1 p-3 pb-10`}
				extra={
					<a href='#' className='font-semibold text-primary'>
						{t('voucherUsed')}
					</a>
				}
				title={
					<span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} `}>
						{t('voucherStore')}
					</span>
				}
			>
				<div className='-mx-2 flex flex-wrap'>
					{dataPromotion.map((voucher) => {
						const usagePercentage =
							voucher.usageLimit > 0
								? ((voucher.usageCount / voucher.usageLimit) * 100).toFixed(0)
								: '0';

						return (
							<div key={voucher.id} className='mt-4 w-1/2'>
								<Card
									className={`${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} mx-1 rounded-md border-gray1`}
								>
									<div className='flex'>
										<div className='flex aspect-[1/1] h-1/2 w-1/4 flex-col items-center justify-center rounded-md bg-primary px-2 py-5 text-white'>
											<Tickets className='h-full' size={50} />
											<div className='bg-gray-200 flex items-end justify-center'>
												<h3 className='h-fit text-nowrap text-center text-[11px] text-xs font-semibold'>
													{voucher.translations[0].name}
												</h3>
											</div>
										</div>
										<div className='flex w-[60%] flex-col justify-between px-3 py-3'>
											<p>{voucher.translations[0].description}</p>
											<div>
												<div
													className='bg-gray-200 relative h-1 w-4/5 rounded-full'
													style={{
														background: `linear-gradient(90deg, transparent ${usagePercentage}%, #e8e8e8 0), linear-gradient(90deg, #eb1717, #ffb000)`,
													}}
												></div>
												<div className='mt-2 flex gap-3 text-xs'>
													<p>
														{t('used')}: {usagePercentage}%
													</p>
													<p>
														{t('expirationDate')}: {formatDateForDisplay(voucher.endDate)}
													</p>
													<a
														className='text-green1'
														onClick={() => openModal(voucher.translations[0], voucher)}
													>
														{t('t&c')}
													</a>
												</div>
											</div>
										</div>
										<div className='flex w-[15%] items-center justify-center pr-3'>
											<Button
												className='text-nowrap rounded-sm border border-primary bg-transparent text-primary hover:bg-primary hover:text-white'
												onClick={handleUseNow}
											>
												{t('useNow')}
											</Button>
										</div>
									</div>
								</Card>
							</div>
						);
					})}
				</div>
			</Card>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
				<ModalContent
					className={`rounded-sm ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}
				>
					{(onClose) => (
						<>
							<ModalHeader className='flex h-20 w-full flex-col items-center justify-center gap-1 rounded-sm bg-gradient-to-r from-[#FF5C73] from-10% via-[#F0284A] via-30% to-[#A02136] to-90%'>
								{selectedTranslation ? <p>{selectedTranslation.name}</p> : <p></p>}
							</ModalHeader>
							<ModalBody className='rounded-sm p-5 text-medium'>
								<div className='flex flex-col gap-4'>
									<div className='flex flex-col gap-2 text-xs'>
										<p className='text-medium font-semibold'>{t('modal.valid')}</p>
										<div className='pl-2'>
											{selectedVoucher ? (
												`${formatDateForDisplay(selectedVoucher.startDate)} - ${formatDateForDisplay(selectedVoucher.endDate)}`
											) : (
												<p></p>
											)}
										</div>
									</div>
									<div className='flex flex-col gap-2 text-xs'>
										<p className='text-medium font-semibold'>{t('modal.reward')}</p>
										{selectedTranslation ? (
											<p className='pl-2'>{selectedTranslation.description}</p>
										) : (
											<p></p>
										)}
									</div>
									<div className='flex flex-col gap-2 text-xs'>
										<p className='text-medium font-semibold'>{t('modal.applicable')}</p>
										<div className='pl-2'>
											{selectedMovies.map((movieId) => (
												<li key={movieId}>{movieId}</li>
											))}
										</div>
									</div>
									<div className='flex flex-nowrap items-end gap-4'>
										<p className='font-semibold'>
											{t('modal.payment')}{' '}
											{selectedVoucher ? (
												<span className='pl-2 text-xs font-normal'>
													{t('modal.to')} {selectedVoucher.minimumPurchase} {t('modal.upto')}
												</span>
											) : (
												<p></p>
											)}
										</p>
									</div>
									<div className='flex flex-nowrap items-end gap-4'>
										<p className='font-semibold'>
											{t('modal.used')}{' '}
											{selectedVoucher ? (
												<span className='pl-2 text-xs font-normal'>
													{selectedVoucher.usageCount}
												</span>
											) : (
												<p></p>
											)}
										</p>
									</div>
									<div className='gap-4'>
										<p className='font-semibold'>
											{t('modal.max')}{' '}
											{selectedVoucher ? (
												<span className='pl-2 text-xs font-normal'>
													{selectedVoucher.usageLimit}
												</span>
											) : (
												<span></span>
											)}
										</p>
									</div>
								</div>
							</ModalBody>
							<ModalFooter className='flex items-center justify-center rounded-b-sm'>
								<Button
									onClick={handleUseNow}
									className='hover:bg-prborder-primary text-nowrap rounded-sm border border-primary bg-transparent text-primary hover:opacity-50'
								>
									{t('useNow')}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default App;
