import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad',  type: 'salad'},
	{ label: 'Bacon',  type: 'bacon'},
	{ label: 'Cheese',  type: 'cheese'},
	{ label: 'Meat',  type: 'meat'}
];

const buildControls = () => {
	return (
		<div className = {classes.BuildControls}>
			{
				controls.map((control) => {
					return <BuildControl key={control.label} label={control.label} />
				})
			}
		</div>		
	);
}

export default buildControls;