import { delay, put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());	
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};
	let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCaGodHwnzT-yvPhRRiwsPAzLAA7MHXwLM'
	if (!action.isSignup) {
		url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCaGodHwnzT-yvPhRRiwsPAzLAA7MHXwLM'
	}

	try {
		const resp1 = yield fetch(url, {
				method: "POST",
				header: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(authData)
			});
		const response = yield resp1.json();
		const expirationDate = new Date(new Date().getTime() + response.expiresIn*1000);
		yield localStorage.setItem('token', response.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', response.localId);
		yield put(actions.authSuccess(response.idToken, response.localId));
		yield put(actions.checkAuthTimeout(response.expiresIn));		
	} 
	catch(error) {
		yield put(actions.authFail(error));
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem('token');
	if (!token) {
		yield put(actions.logout());
	} else {
		const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
		if (expirationDate <= new Date()) {
			yield put(actions.logout());
		} else {
			const userId = yield localStorage.getItem('userId');
			yield put(actions.authSuccess(token, userId));
			yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
		}	
	}
}