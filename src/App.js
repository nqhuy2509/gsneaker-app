import logo from './logo.svg';
import React, { Component } from 'react';
import './App.scss';

import logoImg from './assets/images/nike.png';
import OurProduct from './components/OurProduct';
import Cart from './components/Cart';

import data from './assets/data/shoes.json';

const calculateCart = (listCart) => {
	let totalPrice = 0;
	if (listCart.length > 0) {
		totalPrice = listCart.reduce(
			(total, item) => (total += item.price * item.amount),
			0
		);
	}

	return totalPrice;
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listProduct: data.shoes,
			listCart: [],
			totalPrice: 0,
		};
	}

	componentDidMount() {
		this.state.listProduct.forEach((item) => (item.isAdded = false));
	}

	componentDidUpdate(preProps, preState, snapshot) {}

	handleAddToCartFromParent = (product) => {
		let curListProduct = this.state.listProduct;
		let curListCart = this.state.listCart;

		curListProduct.forEach((item) => {
			if (item.id === product.id) item.isAdded = true;
		});

		product = { ...product, amount: 1 };

		curListCart = [...curListCart, product];
		let totalPrice = calculateCart(curListCart);

		localStorage.setItem('cartList', curListCart);

		this.setState({
			listCart: curListCart,
			listProduct: curListProduct,
			totalPrice,
		});
	};

	handleChangeAmount = (product, action) => {
		if (action === 'ADD') {
			let curListCart = this.state.listCart;
			curListCart.forEach((item) => {
				if (item.id === product.id) {
					item.amount += 1;
				}
			});

			let totalPrice = calculateCart(curListCart);

			this.setState({
				listCart: curListCart,
				totalPrice,
			});
		} else {
			let curListCart = this.state.listCart;
			curListCart.forEach((item) => {
				if (item.id === product.id) {
					if (item.amount === 1) {
						curListCart = curListCart.filter(
							(item) => item.id !== product.id
						);
						let curListProduct = this.state.listProduct;
						curListProduct.forEach((item) => {
							if (item.id === product.id) item.isAdded = false;
						});

						this.setState({
							listProduct: curListProduct,
						});
					} else {
						item.amount -= 1;
					}
				}
			});
			let totalPrice = calculateCart(curListCart);

			this.setState({
				listCart: curListCart,
				totalPrice,
			});
		}
	};

	handleRemoveItem = (product) => {
		let curListCart = this.state.listCart;
		let curListProduct = this.state.listProduct;

		curListCart = curListCart.filter((item) => item.id !== product.id);

		curListProduct.forEach((item) => {
			if (item.id === product.id) item.isAdded = false;
		});
		let totalPrice = calculateCart(curListCart);

		this.setState({
			listCart: curListCart,
			listProduct: curListProduct,
			totalPrice,
		});
	};

	render() {
		return (
			<div className='App'>
				<div className='container'>
					<div className='card'>
						<div className='logo'>
							<img src={logoImg} alt='Logo' />
						</div>
						<div className='card-content'>
							<OurProduct
								listProduct={this.state.listProduct}
								handleAddToCartFromParent={
									this.handleAddToCartFromParent
								}
							/>
						</div>
					</div>
					<div className='card'>
						<div className='logo'>
							<img src={logoImg} alt='Logo' />
						</div>
						<div className='card-content'>
							<Cart
								listCart={this.state.listCart}
								totalPrice={this.state.totalPrice}
								handleChangeAmount={this.handleChangeAmount}
								handleRemoveItem={this.handleRemoveItem}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
