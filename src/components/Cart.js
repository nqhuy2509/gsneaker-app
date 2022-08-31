import React, { Component } from 'react';
import './Cart.scss';

import addBtn from '../assets/images/plus.png';
import minusBtn from '../assets/images/minus.png';
import trashBtn from '../assets/images/trash.png';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listCart: [],
			totalPrice: 0,
		};
	}

	componentDidMount() {}

	componentDidUpdate(preProps, preState, snapshot) {
		if (preProps.listCart !== this.props.listCart) {
			this.setState({
				listCart: this.props.listCart,
			});
		}
	}

	handleChangeBtn = (item, action) => {
		this.props.handleChangeAmount(item, action);
	};

	handleRemoveBtn = (item) => {
		this.props.handleRemoveItem(item);
	};

	render() {
		let { listCart, totalPrice } = this.state;
		return (
			<>
				<div className='heading'>
					<h2 className='title'>Your cart</h2>
					<div className='total-price'>
						${Number(this.props.totalPrice).toFixed(2)}
					</div>
				</div>

				<div className='cart-body'>
					{listCart.length > 0 ? (
						listCart.map((item, index) => {
							return (
								<div className='cart-item' key={index}>
									<div className='item-left'>
										<div
											className='item-img'
											style={{
												backgroundColor: item.color,
											}}>
											<img alt='shoe' src={item.image} />
										</div>
									</div>
									<div className='item-right'>
										<div className='item-name'>
											{item.name}
										</div>
										<div className='price'>
											${item.price}
										</div>
										<div className='actions'>
											<div className='count'>
												<button
													onClick={() =>
														this.handleChangeBtn(
															item,
															'MINUS'
														)
													}>
													<img src={minusBtn} />
												</button>
												<div className='amount'>
													{item.amount}
												</div>
												<button
													onClick={() =>
														this.handleChangeBtn(
															item,
															'ADD'
														)
													}>
													<img src={addBtn} />
												</button>
											</div>
											<div
												className='remove'
												onClick={() =>
													this.handleRemoveBtn(item)
												}>
												<img src={trashBtn} />
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div>Your cart is empty.</div>
					)}
				</div>
			</>
		);
	}
}

export default Cart;
