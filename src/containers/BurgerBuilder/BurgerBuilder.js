import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const burgerBuilder = props => {
	const [purchasingState, setPurchasingState] = useState(false);
	
	useEffect (() => {
		props.onInitIngredients();
	}, []);

	const updatePurchaseState = () => {
		const sum = Object.keys(props.ings)
			.map(igKey => {
				return props.ings[igKey]
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasingState(true);
		} else {
			props.onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	}
	
	const purchaseCancelHandler = () => {
		setPurchasingState(false);
	}

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push('/checkout');
	}

	const disabledInfo = {
		...props.ings
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0
	}
	
	let orderSummary = null;
	let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

	if (props.ings) {
		burger = (
			<Aux>
				<Burger ingredients = {props.ings}/>
				<BuildControls 
					ingredientAdded={props.onIngredientAdded} 
					ingredientRemoved={props.onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={updatePurchaseState()}
					price={props.tlprice}
					isAuth={props.isAuthenticated}
					ordered={purchaseHandler}
				/>
			</Aux>
		);
		orderSummary = <OrderSummary 
		purchaseCancelled={purchaseCancelHandler} 
		purchaseContinued={purchaseContinueHandler} 
		ingredients={props.ings}
		price={props.tlprice}/>;
	}

	return (
		<Aux>
			<Modal show={purchasingState} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		tlprice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder));