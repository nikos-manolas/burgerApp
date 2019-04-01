import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [{value: 'fastest',
					displayValue: 'Fastest'},
					{value: 'cheapest',
					displayValue: 'Cheapest'},]
				},
				value: 'fastest',
				validation: {},
				valid: false
			}
		},
		formIsValid: false,
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});

		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData
		};

		this.postData('https://react-my-burger-b09a6.firebaseio.com/orders.json', order)
		.then(data => {
			console.log(data);
			this.setState({loading: false});
			this.props.history.push('/');
		})
		.catch(err => {
			console.log(err);
			this.setState({loading: false});
		})
	}


	postData = (url='', data={}) => {
		return fetch(url, {
			method: "POST",
			header: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(resp => resp.json())
	}

	checkValidity = (value, rules) => {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation )
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		
		let formIsValid = true;
		for (let inputIdentifierz in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifierz].valid && formIsValid;
		}
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
	}

	render () {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => {
					return (
						<Input elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value} 
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						key={formElement.id}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
					);
				})}
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>);
		if (this.state.loading) {
			form = <Spinner />;
		} 
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{ form }
			</div>
		);
	}
}

export default ContactData;