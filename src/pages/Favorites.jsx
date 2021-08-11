import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
	const { favorites, onAddtoFavorite, onAddToCart } = React.useContext(AppContext);

	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex align-center justify-between'>
				<h1>Мои закладки</h1>
				<div className='search-block'>
					<img src='/img/search.svg' alt='Search' />
				</div>
			</div>

			<div className='d-flex flex-wrap'>
				{favorites.map(item => (
					<Card
						onFavorite={obj => onAddtoFavorite(obj)}
						onPlus={obj => onAddToCart(obj)}
						favorited={true}
						key={item.imgUrl}
						{...item}
					/>
				))}
			</div>
		</div>
	);
}

export default Favorites;
