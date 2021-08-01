import Card from '../components/Card';

function Home({
	items,
	searchValue,
	onChangeSearchInput,
	clearSearchValue,
	onAddtoFavorite,
	onAddToCart,
	onRemoveToCart,
}) {
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

			<div className='d-flex flex-wrap'>
				{items
					.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
					.map(item => (
						<Card
							onFavorite={obj => onAddtoFavorite(obj)}
							onPlus={obj => onAddToCart(obj)}
							onRemove={onRemoveToCart}
							key={item.imgUrl}
							{...item}
						/>
					))}
			</div>
		</div>
	);
}

export default Home;
