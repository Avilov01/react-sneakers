import Card from '../components/Card';

function Favorites({ items, onAddtoFavorite, onAddToCart }) {
	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex align-center justify-between'>
				<h1>Мои закладки</h1>
				<div className='search-block'>
					<img src='/img/search.svg' alt='Search' />
				</div>
			</div>

			<div className='d-flex flex-wrap'>
				{items.map(item => (
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
