import Card from '../components/Card';
import React from 'react';
import AppContext from '../context';

function Home({ searchValue, onChangeSearchInput, clearSearchValue, isLoading }) {
	const { items, cartItems, onAddtoFavorite, onAddToCart, favorites } = React.useContext(AppContext);

	const renderItems = () => {
		const filteredItems = items.filter(item =>
			item.title.toLowerCase().includes(searchValue.toLowerCase()),
		);

		return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
			<Card
				cartItems={cartItems}
				onFavorite={obj => onAddtoFavorite(obj)}
				favorited = {favorites && favorites.some(obj => obj.title === item.title)}
				onPlus={obj => onAddToCart(obj)}
				isLoading={isLoading}
				key={index}
				{...item}
			/>
		));
	};

	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex align-center justify-between'>
				<h1>{searchValue ? `Поискпо запросу: ${searchValue}` : 'Все кросовки'}</h1>
				<div className='search-block'>
					<img src='/img/search.svg' alt='Search' />

					<input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...' />
					{searchValue && (
						<img
							className='clear cu-p'
							src='img/btn-remove.svg'
							alt='Clear'
							onClick={clearSearchValue}
						/>
					)}
				</div>
			</div>

			<div className='d-flex flex-wrap'>{renderItems()}</div>
		</div>
	);
}

export default Home;
