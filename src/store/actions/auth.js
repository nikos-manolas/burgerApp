import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

const postData = (url='', data={}) => {
	return fetch(url, {
		method: "POST",
		header: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	.then(resp => resp.json())
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000)
	}
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true
		};
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCaGodHwnzT-yvPhRRiwsPAzLAA7MHXwLM'
		if (!isSignup) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCaGodHwnzT-yvPhRRiwsPAzLAA7MHXwLM'
		}
		postData(url, authData)
			.then(data => {
				if (data.error) {
					dispatch(authFail(data.error))
				} else {
					const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);
					localStorage.setItem('token', data.idToken);
					localStorage.setItem('expirationDate', expirationDate);
					localStorage.setItem('userId', data.localId);
					dispatch(authSuccess(data.idToken, data.localId));
					dispatch(checkAuthTimeout(data.expiresIn));
				}
			})
			.catch(error => {
				dispatch(authFail(error));
			});		
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.AUTH_REDIRECT_PATH,
		path
	}
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}	
		}

	}
}