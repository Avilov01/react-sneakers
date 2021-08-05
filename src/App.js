import React from 'react';
import { Route } from 'react-router';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const [favorites, setFavorites] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get('https://60fd18f51fa9e90017c70d67.mockapi.io/cart');
			const favoritesResponse = await axios.get(
				'https://60fd18f51fa9e90017c70d67.mockapi.io/favorites',
			);
			const itemsResponse = await axios.get('https://60fd18f51fa9e90017c70d67.mockapi.io/items');

			setIsLoading(false);

			setCartItems(cartResponse.data);
			setFavorites(favoritesResponse.data);
			setItems(itemsResponse.data);
		}

		fetchData();
	}, []);

	const onAddToCart = obj => {
		try {
			if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
				setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
				axios.delete(`https://60fd18f51fa9e90017c70d67.mockapi.io/cart/${obj.id}`);
			} else {
				setCartItems(prev => [...prev, obj]);
				axios.post('https://60fd18f51fa9e90017c70d67.mockapi.io/cart', obj);
			}
		} catch (error) {
			alert('Не удалось добавить/удалить товар в корзину');
		}
	};
	const onAddtoFavorite = async obj => {
		try {
			if (favorites.find(item => item.id === obj.id)) {
				axios.delete(`https://60fd18f51fa9e90017c70d67.mockapi.io/favorites/${obj.id}`);
			} else {
				const { data } = await axios.post(
					'https://60fd18f51fa9e90017c70d67.mockapi.io/favorites',
					obj,
				);
				setFavorites(prev => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить в избранное!');
		}
	};

	const onChangeSearchInput = event => {
		setSearchValue(event.target.value);
	};

	const clearSearchValue = () => {
		setSearchValue('');
	};

	return (
		<div className='wrapper clear'>
			{cartOpened && (
				<Drawer items={cartItems} onClose={() => setCartOpened(false)} onPlus={onAddToCart} />
			)}

			<Header onOpen={() => setCartOpened(true)} />

			<Route path='/' exact>
				<Home
					items={items}
					cartItems={cartItems}
					searchValue={searchValue}
					searchValue={searchValue}
					onChangeSearchInput={onChangeSearchInput}
					clearSearchValue={clearSearchValue}
					onAddtoFavorite={onAddtoFavorite}
					onAddToCart={onAddToCart}
					isLoading={isLoading}
				/>
			</Route>

			<Route path='/favorites' exact>
				<Favorites
					items={favorites}
					onAddtoFavorite={onAddtoFavorite}
					onAddToCart={onAddToCart}
				/>
			</Route>
		</div>
	);
}

export default App;
