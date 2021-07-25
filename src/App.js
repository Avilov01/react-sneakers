import React from 'react';
import Card from './components/Card/';
import Drawer from './components/Drawer';
import Header from './components/Header';

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);

	React.useEffect(() => {
		fetch('https://60fd18f51fa9e90017c70d67.mockapi.io/items')
			.then(res => res.json())
			.then(json => setItems(json));
	}, []);

	const onAddToCart = obj => {
		setCartItems(prev =>
			!prev.some(item => item.imgUrl === obj.imgUrl) ? [...prev, obj] : [...prev],
		);
	};

	const onDeleteToCart = obj => {
		const filter = cartItems.filter(item => item.imgUrl !== obj.imgUrl);
		setCartItems([...filter]);
	};

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
					<h1>Все кроссовки</h1>
					<div className='search-block'>
						<img src='/img/search.svg' alt='Search' />
						<input placeholder='Поиск...' />
					</div>
				</div>

				<div className='d-flex flex-wrap'>
					{items.map(item => (
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
