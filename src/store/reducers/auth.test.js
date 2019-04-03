import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
	const initialState = {
		token: null,
		userId: null,
		error: null,
		loading: false,
		authRedirect: '/'
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('should store the token upon login', () => {	
		expect(reducer(initialState, 
			{	
				type: actionTypes.AUTH_SUCCESS, 
				idToken: 'some-Token', 
				userId: 'some-UserId'
			}
		)).toEqual({
			token: 'some-Token',
			userId: 'some-UserId',
			error: null,
			loading: false ,
			authRedirect: '/'
		});
	});
})