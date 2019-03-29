import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = ({ingredients, purchaseCancelled, purchaseContinued, price}) => {
	const ingredientSummary = Object.keys(ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}
				</li> );
		})
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total price: {price.toFixed(2)}</strong></p>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked = {purchaseCancelled}>CANCEL</Button>
			<Button btnType="Success" clicked = {purchaseContinued}>CONTINUE</Button>
		</Aux>
	)
};

export default orderSummary;