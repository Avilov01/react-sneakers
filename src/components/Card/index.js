import React from 'react';
import styles from './Card.module.scss';

function Card({ title, cost, imgUrl, onFavorite, onPlus, onDelete }) {
	const [isAdded, setIsAdded] = React.useState(false);

	const handleIsAdded = () => {
		setIsAdded(!isAdded);
		!isAdded ? onPlus({ title, cost, imgUrl }) : onDelete({ title, cost, imgUrl });
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img src='/img/heart-unliked.svg' alt='Unliked' onClick={onFavorite} />
			</div>
			<img width={133} height={112} src={imgUrl} alt='Sneakers' />
			<h5>{title}</h5>
			<div className='d-flex justify-between align-center'>
				<div className='d-flex flex-column'>
					<span>Цена:</span>
					<b>{cost}</b>
				</div>

				<img
					className={styles.plus}
					onClick={handleIsAdded}
					src={isAdded ? '/img/btn-cheked.svg' : '/img/btn-plus.svg'}
					alt='Plus'
				/>
			</div>
		</div>
	);
}

export default Card;
