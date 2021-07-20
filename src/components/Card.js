function Card() {
	return (
		<div className='d-flex'>
			<div className='card'>
				<div className='favorite'>
					<img src='/img/heart-unliked.svg' alt='Unliked' />
				</div>
				<img width={133} height={112} src='/img/sneakers/1.jpeg' alt='Sneakers' />
				<h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
				<div className='d-flex justify-between align-center'>
					<div className='d-flex flex-column'>
						<span>Цена:</span>
						<b>12 199 руб.</b>
					</div>
					<button className='button'>
						<img src='/img/plus.svg' alt='Plus' />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Card;