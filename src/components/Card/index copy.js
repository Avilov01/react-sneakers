import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"

function Card({ title, cost, imgUrl, id, onFavorite, onPlus, favorited = false, added = false }) {
	const [isAdded, setIsAdded] = React.useState(added);
	const [isFavorite, setIsFavorite] = React.useState(favorited);

	const handleIsAdded = () => {
		setIsAdded(prev => !prev);
		onPlus({ id, title, cost, imgUrl });
	};

	const handleIsFavorite = () => {
		setIsFavorite(prev => !prev);
		onFavorite({ title, cost, imgUrl, id });
	};

	return (
		<div className={styles.card}>
			
		</div>
	);
}

export default Card;
