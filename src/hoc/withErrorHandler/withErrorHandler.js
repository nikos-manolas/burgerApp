import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent) => {
	return class extends Component {
		render () {
			return (
				<Aux>
					<Modal>
						Something didn't work!
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	}
}

export default withErrorHandler;