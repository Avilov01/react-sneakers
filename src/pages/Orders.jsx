import React from 'react';
import Card from '../components/Card';
import axios from 'axios';
import AppContext from '../context';

function Orders() {
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const { favorites } = React.useContext(AppContext);

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://60fd18f51fa9e90017c70d67.mockapi.io/orders');
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert('Не удалось получить список покупок!');
				console.log(console.error());
			}
		})();
	}, []);

	console.log(isLoading);

	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex align-center justify-between'>
				<h1>Мои заказы</h1>
				<div className='search-block'>
					<img src='/img/search.svg' alt='Search' />
				</div>
			</div>

			<div className='d-flex flex-wrap'>
				{(isLoading ? [...Array(8)] : orders).map((item, index) => (
					<Card
						favorited={favorites && favorites.some(obj => obj.title === item.title)}
						isLoading={isLoading}
						key={index}
						{...item}
					/>
				))}
			</div>
		</div>
	);
}

export default Orders;
