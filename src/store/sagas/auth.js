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
		const postData = (url='', data={}) => {
			return yield fetch(url, {
				method: "POST",
				header: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			.then(resp => resp.json())
		};
		const resp1 = yield fetch(url, {
				method: "POST",
				header: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});
		const jsonData = yield resp1.json();
		const response = yield jsonData;
		const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);
		yield localStorage.setItem('token', response.data.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', response.data.localId);
		yield put(actions.authSuccess(response.data.idToken, response.data.localId));
		yield put(actions.checkAuthTimeout(response.data.expiresIn));		
	} 
	catch(error ) {
		yield put(actions.authFail(error, response.data.error));
	}
	
}