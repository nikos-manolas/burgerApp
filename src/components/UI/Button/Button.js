import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
	let btnType = classes.Success;
	if (props.btnType === "Danger") {
		btnType = classes.Danger;
	}
	return (
		<button 
			className={[classes.Button, btnType].join(' ')} 
			onClick={props.clicked}
			disabled={props.disabled}
			>
			{props.children}
		</button>);
}
export default button;