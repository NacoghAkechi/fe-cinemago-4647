// import { Button, Input, Spacer, Spinner, Checkbox } from '@nextui-org/react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { MovieData, Genre, MovieAdd } from '../types';
// import { useLocale, useTranslations } from 'next-intl';
// interface AddMovieModalProps {
// 	isOpen: boolean;
// 	onOpenChange?: () => void;
// 	onAddMovie: (movie: MovieData) => void;
// 	onFinishAdding: () => void;
// 	onReloadData: () => void;
// }
// const AddMovieModal: React.FC<AddMovieModalProps> = ({
// 	isOpen,
// 	onOpenChange,
// 	onAddMovie,
// 	onFinishAdding,
// 	onReloadData,
// }) => {
// 	const [isAdding, setIsAdding] = useState(false);
// 	const t = useTranslations('AdminMovieAdd');
// 	const [newMovie, setNewMovie] = useState<MovieAdd>({
// 		director: '',
// 		cast: '',
// 		releaseDate: new Date(),
// 		duration: 0,
// 		language: '',
// 		country: '',
// 		rating: 0,
// 		poster_url: '',
// 		trailer_url: '',
// 		is_showing: false,
// 		translations: [
// 			{
// 				categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
// 				name: '',
// 				description: '',
// 			},
// 			{
// 				categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
// 				name: '',
// 				description: '',
// 			},
// 		],
// 		genres: [{ id: '' }],
// 	});
// 	const [categories, setCategories] = useState<any[]>([]);
// 	const [genres, setGenres] = useState<Genre[]>([]);
// 	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
// 	const [translationFields, setTranslationFields] = useState<{
// 		[key: string]: { name: string; description: string };
// 	}>({
// 		vi: { name: '', description: '' },
// 		en: { name: '', description: '' },
// 	});
// 	const locale = useLocale();

// 	useEffect(() => {
// 		// Fetch categories
// 		axios
// 			.get('http://localhost:5000/category-language')
// 			.then((response) => {
// 				setCategories(response.data.data);
// 			})
// 			.catch((error) => console.error('Error fetching categories:', error));

// 		// Fetch genres
// 		axios
// 			.get('http://localhost:5000/movie-genres')
// 			.then((response) => {
// 				setGenres(response.data.data);
// 			})
// 			.catch((error) => console.error('Error fetching genres:', error));
// 	}, []);

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		setNewMovie((prevState) => ({
// 			...prevState,
// 			[name]: name === 'releaseDate' ? new Date(value) : value,
// 		}));
// 	};
// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files && e.target.files.length > 0) {
// 			const file = e.target.files[0];
// 			// Convert file to a blob or URL as necessary
// 			setNewMovie((prevState) => ({
// 				...prevState,
// 				poster_url: file, // File can be processed separately if needed
// 			}));
// 		}
// 	};

// 	const handleTranslationFieldChange = (
// 		langId: string,
// 		field: 'name' | 'description',
// 		value: string,
// 	) => {
// 		setTranslationFields((prev) => ({
// 			...prev,
// 			[langId]: { ...prev[langId], [field]: value },
// 		}));
// 	};

// 	const handleTranslationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		const updatedTranslations = [...newMovie.translations];
// 		updatedTranslations[index] = {
// 			...updatedTranslations[index],
// 			[name]: value,
// 		};
// 		setNewMovie((prevState: MovieAdd) => ({
// 			...prevState,
// 			translations: updatedTranslations,
// 		}));
// 	};
// 	const handleAddMovie = async () => {
// 		setIsAdding(true);
// 		const updatedTranslations = Object.keys(translationFields).map((langId) => {
// 			let categoryLanguageId = '';
// 			if (langId === 'vi') {
// 				categoryLanguageId = '33348724-5aec-4f4b-8c44-4fbcab59b09d'; // Vietnamese ID
// 			} else if (langId === 'en') {
// 				categoryLanguageId = 'd5784fc5-3695-40e5-84ff-2456c9f6a199'; // English ID
// 			}
// 			return {
// 				categoryLanguageId,
// 				name: translationFields[langId]?.name || '',
// 				description: translationFields[langId]?.description || '',
// 			};
// 		});

// 		const updatedGenres = selectedGenres.map((genreId) => {
// 			return {
// 				id: genreId,
// 			};
// 			// return { id: genreId, name: genre ? genre.name : '' };
// 		});
// 		// useEffect(() => {
// 		// 	console.log(updatedGenres);
// 		// }, [updatedGenres]);
// 		const movieData = {
// 			...newMovie,
// 			// translations: updatedTranslations,
// 			genres: updatedGenres,
// 		};

// 		// Uncomment and use the API call as needed
// 		console.log(movieData);
// 		const formData = new FormData();
// 		formData.append('director', movieData.director);
// 		formData.append('cast', movieData.cast);
// 		formData.append('releaseDate', movieData.releaseDate.toISOString());
// 		formData.append('duration', movieData.duration.toString());
// 		formData.append('language', movieData.language);
// 		formData.append('country', movieData.country);
// 		formData.append('rating', movieData.rating.toString());
// 		if (movieData.poster_url) {
// 			formData.append('poster_url', movieData.poster_url);
// 		}
// 		formData.append('trailer_url', movieData.trailer_url);
// 		formData.append('is_showing', movieData.is_showing.toString());
// 		movieData.translations.forEach((translation) => {
// 			formData.append('translations[]', JSON.stringify(translation));
// 		});
// 		movieData.genres.forEach((genre) => {
// 			formData.append('genres[]', JSON.stringify(genre));
// 		});

// 		for (const [key, value] of formData.entries()) {
// 			console.log(`${key}: ${value}`);
// 		}
// 		try {
// 			const response = await axios.post('http://localhost:5000/movies', formData, {
// 				headers: { 'Content-Type': 'multipart/form-data' },
// 			});
// 			console.log('API Response:', response);

// 			if (response.data && response.data.success) {
// 				onAddMovie(response.data.data);
// 				onFinishAdding();
// 				onReloadData();

// 				// Reset form
// 				setNewMovie({
// 					director: '',
// 					cast: '',
// 					releaseDate: new Date(),
// 					duration: 0,
// 					language: '',
// 					country: '',
// 					rating: 0,
// 					poster_url: '',
// 					trailer_url: '',
// 					is_showing: false,
// 					translations: [
// 						{
// 							categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d',
// 							name: '',
// 							description: '',
// 						},
// 						{
// 							categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
// 							name: '',
// 							description: '',
// 						},
// 					],
// 					genres: [],
// 				});
// 				setSelectedGenres([]);
// 				setTranslationFields({
// 					vi: { name: '', description: '' },
// 					en: { name: '', description: '' },
// 				});

// 				// Close the modal
// 				onOpenChange && onOpenChange();
// 				toast.success('The new movie has been successfully added.', {
// 					duration: 3000,
// 				});
// 			} else {
// 				onAddMovie(response.data.data);
// 				onFinishAdding();
// 				onReloadData();
// 				console.error('Failed to add movie. Response:', response.data);
// 				toast.error('Failed to add food/drink. Please try again.', {
// 					duration: 3000,
// 				});
// 			}
// 		} catch (error) {
// 			console.error('Error adding movie:', error);
// 			toast.error('An error occurred while adding the movie. Please try again.', {
// 				duration: 3000,
// 			});
// 		} finally {
// 			setIsAdding(false);
// 		}
// 	};

// 	// const handleAddMovie = async () => {
// 	// 	setIsAdding(true);
// 	// 	const updatedTranslations = Object.keys(translationFields).map((langId) => {
// 	// 		return {
// 	// 			categoryLanguageId:
// 	// 				langId === 'vi'
// 	// 					? '33348724-5aec-4f4b-8c44-4fbcab59b09d'
// 	// 					: 'd5784fc5-3695-40e5-84ff-2456c9f6a199',
// 	// 			...translationFields[langId],
// 	// 		};
// 	// 	});

// 	// 	const updatedGenres = selectedGenres.map((genreId) => ({ id: genreId }));

// 	// 	const movieData = {
// 	// 		...newMovie,
// 	// 		translations: updatedTranslations,
// 	// 		genres: updatedGenres,
// 	// 	};

// 	// 	const formData = new FormData();
// 	// 	Object.entries(movieData).forEach(([key, value]) => {
// 	// 		if (key === 'translations' || key === 'genres') {
// 	// 			(value as any[]).forEach((item) => formData.append(`${key}[]`, JSON.stringify(item)));
// 	// 		} else {
// 	// 			formData.append(key, value instanceof File ? value : String(value));
// 	// 		}
// 	// 	});
// 	// 	for (const [key, value] of formData.entries()) {
// 	// 		console.log(`${key}: ${value}`);
// 	// 	}
// 	// 	try {
// 	// 		const response = await axios.post('http://localhost:5000/movies', formData, {
// 	// 			headers: { 'Content-Type': 'multipart/form-data' },
// 	// 		});
// 	// 		console.log('API Response:', response);
// 	// 		if (response.data && response.data.success) {
// 	// 			// Success message
// 	// 			toast.success('The new movie has been successfully added.', { duration: 3000 });
// 	// 			onAddMovie(response.data.data);
// 	// 			onFinishAdding();
// 	// 			onReloadData();
// 	// 			resetForm(); // clear fields after success
// 	// 		} else {
// 	// 			// Error handling for non-successful response
// 	// 			toast.error('Failed to add the movie. Please try again.', { duration: 3000 });
// 	// 		}
// 	// 	} catch (error) {
// 	// 		console.error('Error adding movie:', error);
// 	// 		toast.error('An error occurred while adding the movie. Please try again.', {
// 	// 			duration: 3000,
// 	// 		});
// 	// 	} finally {
// 	// 		setIsAdding(false);
// 	// 	}
// 	// };

// 	// const resetForm = () => {
// 	// 	// setNewMovie({ ...initialMovieState });
// 	// 	setSelectedGenres([]);
// 	// 	setTranslationFields({ vi: { name: '', description: '' }, en: { name: '', description: '' } });
// 	// 	onOpenChange && onOpenChange(); // close modal
// 	// };
// 	const handleGenreChange = (genreId: string) => {
// 		setSelectedGenres((prev) =>
// 			prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId],
// 		);
// 	};

// 	if (!isOpen) {
// 		return null;
// 	}

// 	return (
// 		<div className='container mx-auto rounded-lg p-4'>
// 			<h1 className='mb-4 text-2xl font-bold'>Add New Movie</h1>
// 			<form
// 				onSubmit={(e) => {
// 					e.preventDefault();
// 					handleAddMovie();
// 				}}
// 				className='space-y-4'
// 			>
// 				<Input
// 					fullWidth
// 					type='text'
// 					name='director'
// 					value={newMovie.director}
// 					onChange={handleInputChange}
// 					label={t('director')}
// 					required
// 					variant='bordered'
// 				/>
// 				<Input
// 					fullWidth
// 					type='text'
// 					name='cast'
// 					value={newMovie.cast}
// 					onChange={handleInputChange}
// 					label={t('cast')}
// 					required
// 					variant='bordered'
// 				/>
// 				<Input
// 					fullWidth
// 					type='date'
// 					name='releaseDate'
// 					value={newMovie.releaseDate.toString()}
// 					onChange={handleInputChange}
// 					label='Release Date'
// 					required
// 					variant='bordered'
// 				/>
// 				<Input
// 					fullWidth
// 					type='number'
// 					name='duration'
// 					value={newMovie.duration.toString()}
// 					onChange={handleInputChange}
// 					label={t('duration')}
// 					min={1}
// 					required
// 					variant='bordered'
// 				/>
// 				<Input
// 					fullWidth
// 					type='text'
// 					name='language'
// 					value={newMovie.language}
// 					onChange={handleInputChange}
// 					label={t('language')}
// 					required
// 					variant='bordered'
// 				/>
// 				<Input
// 					fullWidth
// 					type='text'
// 					name='country'
// 					value={newMovie.country}
// 					onChange={handleInputChange}
// 					label={t('country')}
// 					required
// 					variant='bordered'
// 				/>
// 				<Input
// 					fullWidth
// 					type='number'
// 					name='rating'
// 					value={newMovie.rating.toString()}
// 					onChange={handleInputChange}
// 					label={t('rating')}
// 					min={0}
// 					max={10}
// 					required
// 					variant='bordered'
// 				/>
// 				<Input
// 					fullWidth
// 					type='file'
// 					name='poster_url'
// 					// value={newMovie.poster_url}
// 					onChange={handleFileChange}
// 					label={t('poster_url')}
// 					required
// 					variant='bordered'
// 				/>
// 				<Input
// 					fullWidth
// 					type='url'
// 					name='trailer_url'
// 					value={newMovie.trailer_url}
// 					onChange={handleInputChange}
// 					label={t('trailer_url')}
// 					required
// 					variant='bordered'
// 				/>

// 				{/* Fixed Translation Inputs */}
// 				{/* <div className='translation-fields space-y-4'>

// 					<Input
// 						fullWidth
// 						type='text'
// 						value={translationFields['vi']?.name || ''}
// 						onChange={(e) => handleTranslationFieldChange('vi', 'name', e.target.value)}
// 						label={t('name_vi')}
// 						required
// 						variant='bordered'
// 					/>
// 					<Input
// 						fullWidth
// 						type='text'
// 						value={translationFields['vi']?.description || ''}
// 						onChange={(e) => handleTranslationFieldChange('vi', 'description', e.target.value)}
// 						label={t('description_vi')}
// 						required
// 						variant='bordered'
// 					/>
// 					<Input
// 						fullWidth
// 						type='text'
// 						value={translationFields['en']?.name || ''}
// 						onChange={(e) => handleTranslationFieldChange('en', 'name', e.target.value)}
// 						label={t('name_en')}
// 						required
// 						variant='bordered'
// 					/>
// 					<Input
// 						fullWidth
// 						type='text'
// 						value={translationFields['en']?.description || ''}
// 						onChange={(e) => handleTranslationFieldChange('en', 'description', e.target.value)}
// 						label={t('description_en')}
// 						required
// 						variant='bordered'
// 					/>
// 				</div> */}
// 				{newMovie.translations.map((translation, index) => (
// 					<div key={index} className='space-y-2'>
// 						<h3 className='text-xl font-semibold'>
// 							{translation.categoryLanguageId === '33348724-5aec-4f4b-8c44-4fbcab59b09d'
// 								? 'Tiếng Việt'
// 								: 'English'}
// 						</h3>
// 						<Input
// 							fullWidth
// 							type='text'
// 							name='name'
// 							value={translation.name}
// 							onChange={(e) => handleTranslationChange(index, e)}
// 							label={t('name')}
// 							required
// 							variant='bordered'
// 						/>
// 						<Input
// 							fullWidth
// 							type='text'
// 							name='description'
// 							value={translation.description}
// 							onChange={(e) => handleTranslationChange(index, e)}
// 							label={t('description')}
// 							required
// 							variant='bordered'
// 						/>
// 					</div>
// 				))}
// 				{/* Handle genres */}
// 				{genres.length > 0 && (
// 					<>
// 						<div className='flex items-center'>
// 							<span className='mr-2 font-semibold'>{t('genres')}:</span>
// 						</div>
// 						<div className='flex flex-wrap gap-2'>
// 							{genres.map((genre) =>
// 								genre.movieGenreTranslation
// 									.filter((genres) => genres.categoryLanguage.languageCode === locale)
// 									.map((genres) => (
// 										<Checkbox
// 											key={genre.id}
// 											isSelected={selectedGenres.includes(genre.id)}
// 											onChange={() => handleGenreChange(genre.id)}
// 										>
// 											{genres.name}
// 										</Checkbox>
// 									)),
// 							)}
// 						</div>
// 					</>
// 				)}
// 				<Spacer y={2} />
// 				<Button
// 					onClick={handleAddMovie}
// 					type='submit'
// 					color='primary'
// 					isDisabled={isAdding}
// 					fullWidth
// 				>
// 					{isAdding ? <Spinner size='sm' /> : t('addMovie')}
// 				</Button>
// 			</form>
// 		</div>
// 	);
// };

// export default AddMovieModal;
import { Button, Input, Spacer, Spinner, Checkbox } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MovieData, Genre, MovieAdd } from '../types';
import { useLocale, useTranslations } from 'next-intl';

interface AddMovieModalProps {
	isOpen: boolean;
	onOpenChange?: () => void;
	onAddMovie: (movie: MovieData) => void;
	onFinishAdding: () => void;
	onReloadData: () => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({
	isOpen,
	onOpenChange,
	onAddMovie,
	onFinishAdding,
	onReloadData,
}) => {
	const [isAdding, setIsAdding] = useState(false);
	const t = useTranslations('AdminMovieAdd');
	const [newMovie, setNewMovie] = useState<MovieAdd>({
		director: '',
		cast: '',
		releaseDate: new Date(),
		duration: 0,
		language: '',
		country: '',
		rating: 0,
		poster_url: '',
		trailer_url: '',
		is_showing: false,
		translations: [
			{ categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d', name: '', description: '' },
			{ categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199', name: '', description: '' },
		],
		genres: [{ id: '' }],
	});
	// const [categories, setCategories] = useState<any[]>([]);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const locale = useLocale();
	const [imageFile, setImageFile] = useState<File | null>(null);
	useEffect(() => {
		// Fetch categories and genres
		const fetchData = async () => {
			try {
				const genreResponse = await axios.get('http://localhost:5000/movie-genres');
				setGenres(genreResponse.data.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewMovie((prevState) => ({
			...prevState,
			[name]: name === 'releaseDate' ? new Date(value) : value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setImageFile(e.target.files[0]);
		}
	};

	const handleTranslationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const updatedTranslations = [...newMovie.translations];
		console.log(updatedTranslations);
		updatedTranslations[index] = {
			...updatedTranslations[index],
			[name]: value,
		};
		setNewMovie((prevState) => ({
			...prevState,
			translations: updatedTranslations,
		}));
	};

	const handleAddMovie = async () => {
		setIsAdding(true);
		console.log('newMovie633', newMovie);
		const updatedGenres = selectedGenres.map((genreId) => ({ id: genreId }));
		const movieData = { ...newMovie, genres: updatedGenres };
		console.log('movieData633genres', movieData.genres);
		console.log('movieData633translations', movieData.translations);

		const formData = new FormData();
		formData.append('director', movieData.director);
		formData.append('cast', movieData.cast);
		formData.append('releaseDate', movieData.releaseDate.toISOString());
		formData.append('duration', movieData.duration.toString());
		formData.append('language', movieData.language);
		formData.append('country', movieData.country);
		formData.append('rating', movieData.rating.toString());
		if (imageFile) {
			console.log('imageFile', imageFile);
			console.log('imageFile', typeof imageFile);
			formData.append('poster_url', imageFile);
		}
		formData.append('trailer_url', movieData.trailer_url);
		formData.append('is_showing', movieData.is_showing.toString());
		movieData.translations.forEach((translation) => {
			formData.append('translations[]', JSON.stringify(translation));
		});
		movieData.genres.forEach((genre) => {
			formData.append('genres[]', JSON.stringify(genre));
		});
		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
			// console.log(`${key}: ${typeof value}`);
		}
		try {
			const response = await axios.post('http://localhost:5000/movies', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			console.log(response.data);
			if (response.status === 201) {
				onAddMovie(response.data.data);
				onFinishAdding();
				onReloadData();
				resetForm();
				onOpenChange && onOpenChange();
				toast.success('The new movie has been successfully added.', { duration: 3000 });
			} else {
				console.error('Failed to add movie. Response:', response.data);
				toast.error('Failed to add movie. Please try again.', { duration: 3000 });
			}
		} catch (error) {
			console.error('Error adding movie:', error);
			toast.error('An error occurred while adding the movie. Please try again.', {
				duration: 3000,
			});
		} finally {
			setIsAdding(false);
		}
	};

	const resetForm = () => {
		setNewMovie({
			director: '',
			cast: '',
			releaseDate: new Date(),
			duration: 0,
			language: '',
			country: '',
			rating: 0,
			poster_url: '',
			trailer_url: '',
			is_showing: false,
			translations: [
				{ categoryLanguageId: '33348724-5aec-4f4b-8c44-4fbcab59b09d', name: '', description: '' },
				{ categoryLanguageId: 'd5784fc5-3695-40e5-84ff-2456c9f6a199', name: '', description: '' },
			],
			genres: [
				{
					id: '',
				},
			],
		});
		setImageFile(null);
		setSelectedGenres([]);
	};

	const handleGenreChange = (genreId: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId],
		);
	};

	if (!isOpen) return null;

	return (
		<div className='container mx-auto rounded-lg p-4'>
			<h1 className='mb-4 text-2xl font-bold'>Add New Movie</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddMovie();
				}}
				className='space-y-4'
			>
				<Input
					fullWidth
					type='text'
					name='director'
					value={newMovie.director}
					onChange={handleInputChange}
					label={t('director')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='cast'
					value={newMovie.cast}
					onChange={handleInputChange}
					label={t('cast')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='date'
					name='releaseDate'
					value={newMovie.releaseDate.toString()}
					onChange={handleInputChange}
					label='Release Date'
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='number'
					name='duration'
					value={newMovie.duration.toString()}
					onChange={handleInputChange}
					label={t('duration')}
					min={1}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='language'
					value={newMovie.language}
					onChange={handleInputChange}
					label={t('language')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='text'
					name='country'
					value={newMovie.country}
					onChange={handleInputChange}
					label={t('country')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='number'
					name='rating'
					value={newMovie.rating.toString()}
					onChange={handleInputChange}
					label={t('rating')}
					min={0}
					max={10}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='file'
					name='poster_url'
					onChange={handleFileChange}
					label={t('poster_url')}
					required
					variant='bordered'
				/>
				<Input
					fullWidth
					type='url'
					name='trailer_url'
					value={newMovie.trailer_url}
					onChange={handleInputChange}
					label={t('trailer_url')}
					required
					variant='bordered'
				/>

				{/* Fixed Translation Inputs */}
				{/* <div className='translation-fields space-y-4'>

					<Input
						fullWidth
						type='text'
						value={translationFields['vi']?.name || ''}
						onChange={(e) => handleTranslationFieldChange('vi', 'name', e.target.value)}
						label={t('name_vi')}
						required
						variant='bordered'
					/>
					<Input
						fullWidth
						type='text'
						value={translationFields['vi']?.description || ''}
						onChange={(e) => handleTranslationFieldChange('vi', 'description', e.target.value)}
						label={t('description_vi')}
						required
						variant='bordered'
					/>
					<Input
						fullWidth
						type='text'
						value={translationFields['en']?.name || ''}
						onChange={(e) => handleTranslationFieldChange('en', 'name', e.target.value)}
						label={t('name_en')}
						required
						variant='bordered'
					/>
					<Input
						fullWidth
						type='text'
						value={translationFields['en']?.description || ''}
						onChange={(e) => handleTranslationFieldChange('en', 'description', e.target.value)}
						label={t('description_en')}
						required
						variant='bordered'
					/>
				</div> */}
				{newMovie.translations.map((translation, index) => (
					<div key={index} className='space-y-2'>
						<h3 className='text-xl font-semibold'>
							{translation.categoryLanguageId === '33348724-5aec-4f4b-8c44-4fbcab59b09d'
								? 'Tiếng Việt'
								: 'English'}
						</h3>
						<Input
							fullWidth
							type='text'
							name='name'
							value={translation.name}
							onChange={(e) => handleTranslationChange(index, e)}
							label={t('name')}
							required
							variant='bordered'
						/>
						<Input
							fullWidth
							type='text'
							name='description'
							value={translation.description}
							onChange={(e) => handleTranslationChange(index, e)}
							label={t('description')}
							required
							variant='bordered'
						/>
					</div>
				))}
				{/* Handle genres */}
				{genres.length > 0 && (
					<>
						<div className='flex items-center'>
							<span className='mr-2 font-semibold'>{t('genres')}:</span>
						</div>
						<div className='flex flex-wrap gap-2'>
							{genres.map((genre) =>
								genre.movieGenreTranslation
									.filter((genres) => genres.categoryLanguage.languageCode === locale)
									.map((genres) => (
										<Checkbox
											key={genre.id}
											isSelected={selectedGenres.includes(genre.id)}
											onChange={() => handleGenreChange(genre.id)}
										>
											{genres.name}
										</Checkbox>
									)),
							)}
						</div>
					</>
				)}
				<Spacer y={2} />
				<Button
					onClick={handleAddMovie}
					type='submit'
					color='primary'
					isDisabled={isAdding}
					fullWidth
				>
					{isAdding ? <Spinner size='sm' /> : t('addMovie')}
				</Button>
			</form>
			<Toaster />
		</div>
	);
};

export default AddMovieModal;