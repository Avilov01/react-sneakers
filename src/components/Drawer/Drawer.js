import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../hooks/useCart';

import styles from './Drawer.module.scss';

function Drawer({ items = [], onClose, onRemove, opened }) {
	const [isOrderComplite, setIsOrderComplite] = React.useState(false);
	const [orderId, setOrderId] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const { cartItems, setCartItems, totalPrice } = useCart();

	const onClickOrder = async () => {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		try {
			setIsLoading(true);
			const { data } = await axios.post('https://60fd18f51fa9e90017c70d67.mockapi.io/orders', {
				items: cartItems,
			});
			setOrderId(data.id);
			setIsOrderComplite(true);
			setCartItems([]);
			for (let i = 0; i < cartItems.length; i++) {
				let item = cartItems[i];
				await axios.delete('https://60fd18f51fa9e90017c70d67.mockapi.io/cart/' + item.id);
				await delay(1000);
				console.log(item);
			}
		} catch (error) {
			alert('Ошибка при создании заказа!');
		}
		setIsLoading(false);
	};

	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2 className='mb-30 d-flex justify-between'>
					Корзина{' '}
					<img className='removeBtn' src='img/btn-remove.svg' alt='Remove' onClick={onClose} />
				</h2>
				{items.length > 0 ? (
					<div className='d-flex flex-column flex'>
						<div className='items flex'>
							{items.map(item => (
								<div className='cartItem d-flex align-center mb-20' key={item.imgUrl}>
									<div
										style={{ backgroundImage: `url(${item.imgUrl})` }}
										className='cartItemsImg'></div>
									<div className='mr-20 flex'>
										<p className='mb-5'>{item.title}</p>
										<b>{item.cost} руб.</b>
									</div>
									<img
										className='removeBtn'
										src='img/btn-remove.svg'
										alt='Remove'
										onClick={() => onRemove(item.id)}
									/>
								</div>
							))}
						</div>

						<div className='cartTotalBlock'>
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб. </b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
								</li>
							</ul>
							<button className='greenButton' onClick={onClickOrder} disabled={isLoading}>
								Оформить заказ <img src='/img/arrow.svg' alt='Arrow' />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplite ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isOrderComplite
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						image={isOrderComplite ? '/img/complete-order.jpeg' : '/img/empty-cart.jpeg'}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
