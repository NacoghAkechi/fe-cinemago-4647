import React from 'react';
import { FoodDrink } from '../types'; // Adjust the import based on your types
import { Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import Loading from '@/app/components/Loading';

interface FoodDrinkTableProps {
	foodDrinks: FoodDrink[]; // Adjust the prop type
	selectedFoodDrinks?: Set<string>;
	setSelectedFoodDrinks?: React.Dispatch<React.SetStateAction<Set<string>>>;
	onEditOpen: () => void;
	onDeleteOpen: () => void;
	setFoodDrinkToEdit: React.Dispatch<React.SetStateAction<FoodDrink | null>>;
	setFoodDrinkToDelete: React.Dispatch<React.SetStateAction<FoodDrink | null>>;
	isLoading: boolean;
}

const FoodDrinkTable: React.FC<FoodDrinkTableProps> = ({
	foodDrinks,
	selectedFoodDrinks,
	setSelectedFoodDrinks,
	onEditOpen,
	onDeleteOpen,
	setFoodDrinkToEdit,
	setFoodDrinkToDelete,
	isLoading,
}) => {
	const { isDarkMode } = useTheme();
	const router = useRouter();
	const locale = useLocale();

	return (
		<div className='bg-darkGreen overflow-hidden rounded-sm border-x border-t border-gray2'>
			<table
				className={`w-full ${isDarkMode ? 'bg-dark text-white' : 'bg-white text-black'} border-collapse`}
			>
				<thead>
					<tr className='border-b border-gray2'>
						<th className='border-r border-gray2 p-3'>Order</th>
						<th className='border-r border-gray2 p-3'>Name</th>
						<th className='border-r border-gray2 p-3'>Price</th>
						<th className='p-3'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<>
							{foodDrinks.map((foodDrink, index) => (
								<tr key={foodDrink.id} className='border-b border-gray2'>
									<td className='border-r border-gray2 p-3 text-center'>{index + 1}</td>
									<td className='border-r border-gray2 p-3 text-center'>
										{foodDrink.translations // Access translations from foodDrink
											.filter((translation) => translation.categoryLanguage.languageCode === locale)
											.map((translation) => translation.name)}
									</td>
									<td className='border-r border-gray2 p-3 text-center'>{foodDrink.price}</td>
									<td className='grid grid-cols-2 gap-2 p-3'>
										<div className='flex items-center justify-center'>
											<Button
												color='warning'
												onPress={() => {
													router.push(`/${locale}/admin/admin-food-drink/${foodDrink.id}`);
												}}
												isIconOnly
												radius='sm'
											>
												<Pencil className='text-white' />
											</Button>
										</div>
										<div className='flex items-center justify-center'>
											<Button
												color='danger'
												onPress={() => {
													setFoodDrinkToDelete(foodDrink);
													onDeleteOpen();
												}}
												isIconOnly
												radius='sm'
											>
												<Trash2 />
											</Button>
										</div>
									</td>
								</tr>
							))}
						</>
					) : (
						<tr>
							<td colSpan={4} className='overflow-hidden border-b border-gray2 p-3 text-center'>
								<Loading />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default FoodDrinkTable;