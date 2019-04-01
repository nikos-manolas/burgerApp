import React, { Component } from 'react';

import Order from '../../components/Order/Order';

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {
		fetch('https://react-my-burger-b09a6.firebaseio.com/orders.json')
			.then(resp => resp.json())
			.then(data => {
				const fetchedOrders = [];
				for (let key in data) {
					fetchedOrders.push({
						...data[key],
						id: key
					});
				}
				this.setState({loading: false, orders: fetchedOrders});
			})
			.catch(error => {
				console.log(error);
				this.setState({loading: false});
			})
	}

	render () {
		return (
			<div>
				{this.state.orders.map(order => {
					return (
						<Order 
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}/>
					)
				})}
			</div>
		);
	}
}

export default Orders;