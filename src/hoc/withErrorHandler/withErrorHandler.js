import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
// import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent) => {
	return props => {
		// const [error, clearError] = useHttpErrorHandler();
		
		return (
			<Fragment>
				<Modal>
					Something didn't work!
				</Modal>
				<WrappedComponent {...props} />
			</Fragment>
		);
	}
}

export default withErrorHandler;