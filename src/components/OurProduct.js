import React, { Component } from 'react';
import './OurProduct.scss';

import checkedIcon from '../assets/images/check.png';

class OurProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listProduct: [],
		};
	}

	componentDidMount() {
		this.setState({
			listProduct: this.props.listProduct,
		});
	}

	componentDidUpdate(preProps, preState, snapshot) {}

	handleAddToCart = (product) => {
		this.props.handleAddToCartFromParent(product);
	};

	render() {
		let { listProduct } = this.state;
		return (
			<>
				<h2 className='title'>Our Products</h2>
				<div className='product-container'>
					{listProduct &&
						listProduct.map((item, index) => {
							return (
								<div className='product-item' key={index}>
									<div
										className='image'
										style={{ backgroundColor: item.color }}>
										<img src={item.image} alt='img-shoe' />
									</div>

									<h3>{item.name}</h3>
									<p>{item.description}</p>
									<div className='item-bottom'>
										<div className='price'>
											${item.price}
										</div>

										{item.isAdded === true ? (
											<div className='checked'>
												<img
													src={checkedIcon}
													alt='checked'
												/>
											</div>
										) : (
											<button
												className='add-btn'
												onClick={() =>
													this.handleAddToCart(item)
												}>
												add to cart
											</button>
										)}
									</div>
								</div>
							);
						})}
				</div>
			</>
		);
	}
}

export default OurProduct;
