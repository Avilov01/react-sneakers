import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './hooks/useCart';

function Header({ onOpen }) {
	const { totalPrice } = useCart();

	return (
		<header className='d-flex justify-between align-center p-40'>
			<div className='d-flex align-center'>
				<Link to='/'>
					<img width={40} height={40} src='img/logo.png' alt='Logo' />
				</Link>
				<div>
					<h3 className='text-uppercase'>React Sneakers</h3>
					<p>Магазин лучших кроссовок</p>
				</div>
			</div>
			<ul className='d-flex'>
				<li className='mr-30 cu-p' onClick={onOpen}>
					<img width={18} height={18} src='img/cart.svg' alt='Корзина' />
					<span>{totalPrice} руб.</span>
				</li>
				<li className='mr-20 cu-p'>
					<Link to='/favorites'>
						<img src='img/favorites.svg' alt='Закладки' />
					</Link>
				</li>
				<li>
					<Link to='/orders'>
						<img src='img/user.svg' alt='Пользователь' />
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
