function Drawer({ items = [], onClose, onPlus }) {
	return (
		<div className='overlay'>
			<div className='drawer'>
				<h2 className='mb-30 d-flex justify-between'>
					Корзина{' '}
					<img className='removeBtn' src='img/btn-remove.svg' alt='Remove' onClick={onClose} />
				</h2>
				{items.length > 0 ? (
					<div>
						<div className='items'>
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
										onClick={() => onPlus(item)}
									/>
								</div>
							))}
						</div>

						<div className='cartTotalBlock'>
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>21 498 руб. </b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>1074 руб. </b>
								</li>
							</ul>
							<button className='greenButton'>
								Оформить заказ <img src='/img/arrow.svg' alt='Arrow' />
							</button>
						</div>
					</div>
				) : (
					<div className='cartEmpty d-flex align-center justify-center flex-column flex'>
						<img
							className='mb-20'
							width='120px'
							height='120px'
							src='/img/empty-cart.jpeg'
							alt='Empty'
						/>
						<h2>Корзина пустая</h2>
						<p className='opacity-6'>
							Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
						</p>
						<button onClick={onClose} className='greenButton'>
							<img src='/img/arrow.svg' alt='Arrow' />
							Вернуться назад
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Drawer;
