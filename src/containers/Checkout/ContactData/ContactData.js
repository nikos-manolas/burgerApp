import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			customer: {
				name: 'Nik asdf',
				address: {
					street: 'asdf',
					zipCode: '4141',
					country: 'Gerc'
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fastest'
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

	render () {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
				<input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
				<input className={classes.Input} type="text" name="street" placeholder="Street"/>
				<input className={classes.Input} type="text" name="postal" placeholder="Postal"/>
				<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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