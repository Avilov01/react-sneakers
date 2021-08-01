import React from 'react';
import styles from './Card.module.scss';

function Card({ title, cost, imgUrl, id, onFavorite, onPlus, onRemove, favorited = false }) {
	const [isAdded, setIsAdded] = React.useState(false);
	const [isFavorite, setIsFavorite] = React.useState(favorited);

	const handleIsAdded = () => {
		setIsAdded(prev => !prev);
		!isAdded ? onPlus({ title, cost, imgUrl }) : onRemove({ title, cost, imgUrl });
	};

	const handleIsFavorite = () => {
		setIsFavorite(prev => !prev);
		onFavorite({ title, cost, imgUrl, id });
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img
					onClick={handleIsFavorite}
					src={isFavorite ? '/img/favorite-liked.svg' : '/img/favorite-unliked.svg'}
					alt='Unliked'
				/>
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
