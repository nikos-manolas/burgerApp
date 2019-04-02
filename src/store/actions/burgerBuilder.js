import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	}
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	}
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
};

const getData = (url='') => {
	return fetch(url)
	.then(response => response.json());
}

export const initIngredients = () => {
	return dispatch => {
		getData('https://react-my-burger-b09a6.firebaseio.com/ingredients.json')
		.then(data => {
			dispatch(setIngredients(data))
		})
		.catch(error => {
			dispatch(fetchIngredientsFailed())
		});
	}
}



