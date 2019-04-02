import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

const postData = (url='', data={}) => {
	return fetch(url, {
		method: "POST",
		header: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	.then(resp => resp.json())
}

export const purchaseBurger = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		postData('https://react-my-burger-b09a6.firebaseio.com/orders.json', orderData)
		.then(data => {
			dispatch(purchaseBurgerSuccess(data.name, orderData));
		})
		.catch(error => {
			dispatch(purchaseBurgerFail(error));
		})
		
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
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
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(error => {
				dispatch(fetchOrdersFail(error));
			})
	}
}

