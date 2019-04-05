import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
	const getData = (url='') => {
		return fetch(url)
		.then(response => response.json());
	}
	try {
		const data = yield getData('https://react-my-burger-b09a6.firebaseio.com/ingredients.json');
		yield put(actions.setIngredients(data))	
	}
	catch (error) {
		yield put(actions.fetchIngredientsFailed())
	}
}