import React from 'react';
import AppContext from './context';
import { Route } from 'react-router';
import axios from 'axios';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const [favorites, setFavorites] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		try {
			async function fetchData() {
				const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
					axios.get('https://60fd18f51fa9e90017c70d67.mockapi.io/cart'),
					axios.get('https://60fd18f51fa9e90017c70d67.mockapi.io/favorites'),
					axios.get('https://60fd18f51fa9e90017c70d67.mockapi.io/items'),
				]);

				setIsLoading(false);
				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			}

			fetchData();
		} catch (error) {
			alert('Не удалось загрузить данные!');
			console.log(error);
		}
	}, []);

	const totalPrice = cartItems.reduce((total, item) => total + item.cost, 0);

	const onAddToCart = async obj => {
		try {
			const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
			if (findItem) {
				setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://60fd18f51fa9e90017c70d67.mockapi.io/cart/${findItem.id}`);
			} else {
				setCartItems(prev => [...prev, obj]);
				const { data } = await axios.post(
					'https://60fd18f51fa9e90017c70d67.mockapi.io/cart',
					obj,
				);
				setCartItems(prev =>
					prev.map(item => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id,
							};
						}
						return item;
					}),
				);
			}
		} catch (error) {
			alert('Не удалось добавить товар в корзину');
			console.log(error);
		}
	};

	const onRemoveItem = id => {
		try {
			setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(id)));
			axios.delete(`https://60fd18f51fa9e90017c70d67.mockapi.io/cart/${id}`);
		} catch (error) {
			alert('Не удалось удалить товар из корзины!');
			console.log(error);
		}
	};

	const onAddtoFavorite = async obj => {
		try {
			if (favorites.find(item => Number(item.id) === Number(obj.id))) {
				await axios.delete(`https://60fd18f51fa9e90017c70d67.mockapi.io/favorites/${obj.id}`);
				setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post(
					'https://60fd18f51fa9e90017c70d67.mockapi.io/favorites',
					obj,
				);
				setFavorites(prev => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить в избранное!');
			console.log(error);
		}
	};

	const onChangeSearchInput = event => {
		setSearchValue(event.target.value);
	};

	const clearSearchValue = () => {
		setSearchValue('');
	};

	const isAddedItems = id => cartItems.some(obj => Number(obj.parentId) === Number(id));

	return (
		<AppContext.Provider
			value={{
				items,
				favorites,
				cartItems,
				isAddedItems,
				setCartOpened,
				setCartItems,
				totalPrice,
				onAddToCart,
				onAddtoFavorite,
			}}>
			<div className='wrapper clear'>
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onPlus={onAddToCart}
					onRemove={onRemoveItem}
					opened={cartOpened}
				/>

				<Header onOpen={() => setCartOpened(true)} />

				<Route path='/' exact>
					<Home
						searchValue={searchValue}
						onChangeSearchInput={onChangeSearchInput}
						clearSearchValue={clearSearchValue}
						isLoading={isLoading}
					/>
				</Route>

				<Route path='/favorites' exact>
					<Favorites onAddtoFavorite={onAddtoFavorite} onAddToCart={onAddToCart} />
				</Route>

				<Route path='/orders' exact>
					<Orders />
				</Route>
			</div>
		</AppContext.Provider>
	);
}

export default App;
