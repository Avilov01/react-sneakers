import React from 'react';
import Card from './components/Card/';
import Drawer from './components/Drawer';
import Header from './components/Header';

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	React.useEffect(() => {
		fetch('https://60fd18f51fa9e90017c70d67.mockapi.io/items')
			.then(res => res.json())
			.then(json => setItems(json));
	}, []);

	const onAddToCart = obj => {
		setCartItems(prev =>
			 !prev.some(item => item.imgUrl === obj.imgUrl) && [...prev, obj]);
	};

	const onChangeSearchInput = event => {
		setSearchValue(event.target.value);
	};

	const onDeleteToCart = obj => {
		setCartItems(prev => prev.filter(item => item.imgUrl !== obj.imgUrl));
	};

	const clearSearchValue =() => {
		setSearchValue('')
	}

	return (
		<div className='wrapper clear'>
			{cartOpened && (
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onDelete={onDeleteToCart}
				/>
			)}

			<Header onOpen={() => setCartOpened(true)} />

			<div className='content p-40'>
				<div className='mb-40 d-flex align-center justify-between'>
					<h1>{searchValue ? `Поискпо запросу: ${searchValue}` : 'Все кросовки'}</h1>
					<div className='search-block'>
						<img src='/img/search.svg' alt='Search' />

						<input
							onChange={onChangeSearchInput}
							value={searchValue}
							placeholder='Поиск...'
						/>
						{searchValue && (
							<img className='clear cu-p' src='img/btn-remove.svg' alt='Clear' onClick={clearSearchValue}/>
						)}
					</div>
				</div>

				<div className='d-flex flex-wrap'>
					{items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map(item => (
						<Card
							title={item.title}
							cost={item.cost + ' руб.'}
							imgUrl={item.imgUrl}
							onFavorite={() => console.log('Добавили в закладки')}
							onPlus={obj => onAddToCart(obj)}
							onDelete={onDeleteToCart}
							key={item.imgUrl}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
