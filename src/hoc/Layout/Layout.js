import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

const layout = props => {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const sideDrawerClosedHandler = () => {
		setSideDrawerIsVisible(false);
	}
	
	const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible(!sideDrawerIsVisible);
	}


	return (
		<Fragment>
			<Toolbar drawerToggleClicked={sideDrawerToggleHandler}
			isAuth={props.isAuthenticated}/>
			<SideDrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler}
			isAuth={props.isAuthenticated}/>
			<main className={classes.Content}>
				{props.children}
			</main>
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !==null
	}
}

export default connect(mapStateToProps)(layout);