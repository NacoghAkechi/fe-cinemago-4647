import React from 'react';
import { ShowTime } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';

interface TableShowTimeProps {
	showTimes: ShowTime[]; // Adjust the prop type
	selectedShowTimes?: Set<string>;
	setSelectedShowTimes?: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen: () => void;
	onDeleteOpen: () => void;
	setShowTimeToEdit: React.Dispatch<React.SetStateAction<ShowTime | null>>;
	setShowTimeToDelete: React.Dispatch<React.SetStateAction<ShowTime | null>>;
	isLoading: boolean;
}

const TableShowTime: React.FC<TableShowTimeProps> = ({
	showTimes,
	selectedShowTimes,
	setSelectedShowTimes,
	onEditOpen,
	onDeleteOpen,
	setShowTimeToEdit,
	setShowTimeToDelete,
	isLoading,
}) => {
	const { isDarkMode } = useTheme();
	const locale = useLocale();
	console.log(showTimes);
	return (
		<div className='overflow-hidden rounded-md border-x border-t border-gray1'>
			<table className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} border-collapse`}>
				<thead>
					<tr className='border-b border-gray1'>
						<th className='border-r border-gray1 p-3'>Order</th>
						<th className='border-r border-gray1 p-3 text-left'>Movie</th>
						<th className='border-r border-gray1 p-3 text-center'>Room</th>
						<th className='border-r border-gray1 p-3 text-center'>Start Time</th>
						<th className='border-r border-gray1 p-3 text-center'>End Time</th>
						<th className='border-r border-gray1 p-3 text-center'>Price</th>
						<th className='p-3'></th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan={7} className='overflow-hidden border-b border-gray1 p-3 text-center'>
								<Loading />
							</td>
						</tr>
					) : (
						showTimes.map((showTime, index) => (
							<tr key={showTime.id} className='border-b border-gray1'>
								<td className='w-[5%] border-r border-gray1 p-3 text-center'>{index + 1}</td>
								<td className='border-r border-gray1 p-3'>
									{showTime.movie.translations
										.filter((translation) => translation.categoryLanguage.languageCode === locale)
										.map((translation) => translation.name)}
								</td>
								<td className='border-r border-gray1 p-3 text-center'>{showTime.room.name}</td>
								<td className='border-r border-gray1 p-3 text-center'>
									{showTime.show_time_start}
								</td>
								<td className='border-r border-gray1 p-3 text-center'>
									{showTime.show_time_end}

									{/* {new Date(showTime.show_time_end).toLocaleString(locale)} */}
								</td>
								<td className='border-r border-gray1 p-3 text-center'>{showTime.price}</td>
								<td className=''>
									<div className='flex items-center justify-center gap-2'>
										<div className='flex items-center justify-center'>
											<Button
												color='warning'
												onPress={() => {
													setShowTimeToEdit(showTime);
													onEditOpen();
												}}
												isIconOnly
												radius='sm'
												size='sm'
											>
												<Pencil className='text-white' height={20} width={20} />
											</Button>
										</div>
										<div className='flex items-center justify-center'>
											<Button
												color='danger'
												onPress={() => {
													setShowTimeToDelete(showTime);
													onDeleteOpen();
												}}
												isIconOnly
												radius='sm'
												variant='bordered'
												className='border'
											>
												<Trash2 height={20} width={20} />
											</Button>
										</div>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TableShowTime;
