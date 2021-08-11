import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

function Card({ title, cost, imgUrl, id, onFavorite, onPlus, favorited = false, isLoading }) {
	const [isFavorite, setIsFavorite] = React.useState(favorited);
	const { isAddedItems } = React.useContext(AppContext);

	const obj = { id, parentId: id, title, cost, imgUrl };

	const onClickPlus = () => {
		onPlus(obj);
	};

	const handleIsFavorite = () => {
		setIsFavorite(prev => !prev);
		onFavorite(obj);
	};

	return (
		<div className={styles.card}>
			{isLoading ? (
				<ContentLoader
					speed={2}
					width={155}
					height={250}
					viewBox='0 0 155 265'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'>
					<rect x='1' y='0' rx='10' ry='10' width='155' height='155' />
					<rect x='0' y='167' rx='5' ry='5' width='155' height='15' />
					<rect x='0' y='187' rx='5' ry='5' width='100' height='15' />
					<rect x='1' y='234' rx='5' ry='5' width='80' height='25' />
					<rect x='124' y='230' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					{onFavorite && (
						<div className={styles.favorite}>
							<img
								onClick={handleIsFavorite}
								src={isFavorite ? '/img/favorite-liked.svg' : '/img/favorite-unliked.svg'}
								alt='Unliked'
							/>
						</div>
					)}
					<img width='100%' height={135} src={imgUrl} alt='Sneakers' />
					<h5>{title}</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{cost}</b>
						</div>

						{onPlus && (
							<img
								className={styles.plus}
								onClick={onClickPlus}
								src={isAddedItems(id) ? '/img/btn-cheked.svg' : '/img/btn-plus.svg'}
								alt='Plus'
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Card;
