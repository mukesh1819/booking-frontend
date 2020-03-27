import React, {Component} from 'react';
import history from '../../history';
import {Link} from 'react-router-dom';

const SideBar = (props) => {
	const {items, onItemSelect} = props;
	return (
		<div className='side-nav top-nav'>
			{items.map(({label, name, details, icon, value, link, Component, ...rest}) => (
				<div className='item d-flex align-items-center' key={name} onClick={() => onItemSelect(Component)}>
					<i className={`${icon} p-2 text-primary`} />
					<span>
						<span>{label}</span>
						<span className='small text-muted' style={{display: 'table'}}>
							{details}
						</span>
					</span>
					<span className='text-bold ml-auto'>{value}</span>
				</div>
			))}
		</div>
	);
};

export default SideBar;
