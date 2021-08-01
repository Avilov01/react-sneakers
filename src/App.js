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

	React.useEffect(() => {
		axios
			.get('https://60fd18f51fa9e90017c70d67.mockapi.io/items')
			.then(res => setItems(res.data));

		axios
			.get('https://60fd18f51fa9e90017c70d67.mockapi.io/cart')
			.then(res => setCartItems(res.data));
		axios

			.get('https://60fd18f51fa9e90017c70d67.mockapi.io/favorites')
			.then(res => setFavorites(res.data));
	}, []);

	const onAddToCart = obj => {
		axios.post('https://60fd18f51fa9e90017c70d67.mockapi.io/cart', obj);
		setCartItems(prev => [...prev, obj]);
	};

	const onRemoveToCart = id => {
		axios.delete(`https://60fd18f51fa9e90017c70d67.mockapi.io/cart/${id}`);
		setCartItems(prev => prev.filter(item => item.id !== id));
	};

	const onAddtoFavorite = async obj => {
		if (favorites.find(item => item.id === obj.id)) {
			axios.delete(`https://60fd18f51fa9e90017c70d67.mockapi.io/favorites/${obj.id}`);
		} else {
			const { data } = await axios.post(
				'https://60fd18f51fa9e90017c70d67.mockapi.io/favorites',
				obj,
			);
			setFavorites(prev => [...prev, data]);
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
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveToCart}
				/>
			)}

			<Header onOpen={() => setCartOpened(true)} />

			<Route path='/home' exact>
				<Home
					items={items}
					searchValue={searchValue}
					searchValue={searchValue}
					onChangeSearchInput={onChangeSearchInput}
					clearSearchValue={clearSearchValue}
					onAddtoFavorite={onAddtoFavorite}
					onAddToCart={onAddToCart}
					onRemoveToCart={onRemoveToCart}
				/>
			</Route>

			<Route path='/favorites' exact>
				<Favorites
					items={favorites}
					onAddtoFavorite={onAddtoFavorite}
					onAddToCart={onAddToCart}
					onRemoveToCart={onRemoveToCart}
				/>
			</Route>
		</div>
	);
}

export default App;
