import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

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

export function* purchaseBurgerSaga(action) {
	try {
		yield put(actions.purchaseBurgerStart());
		const data = yield postData('https://react-my-burger-b09a6.firebaseio.com/orders.json?auth=' + action.token, action.orderData)
		yield put(actions.purchaseBurgerSuccess(data.name, action.orderData));
	} catch (error) {
		yield put(actions.purchaseBurgerFail(error));
	}
}

export function* fetchOrdersSaga(action) {
	try {
		yield put(actions.fetchOrdersStart());
		const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
		const resp = yield fetch('https://react-my-burger-b09a6.firebaseio.com/orders.json' + queryParams);
		const data = yield resp.json();
		const fetchedOrders = [];
		for (let key in data) {
			fetchedOrders.push({
				...data[key],
				id: key
			});
		}
		yield put(actions.fetchOrdersSuccess(fetchedOrders));
	} catch(error) {
		yield put(actions.fetchOrdersFail(error));
	}
}