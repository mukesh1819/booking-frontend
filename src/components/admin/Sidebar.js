import React, {Component} from 'react';
import history from '../../history';

const SideBar = (props) => {
	const {items} = props;
	return (
		<div className='side-nav'>
			{items.map(({label, name, details, icon, value, link, ...rest}) => (
				<div
					className='sidebar-item d-flex align-items-center'
					key={name}
					onClick={() => {
						history.push(link);
					}}
				>
					<i className={`${icon} p-2 text-primary`} />
					<div>
						<span>{label}</span>
						<span className='small text-muted' style={{display: 'table'}}>
							{details}
						</span>
					</div>
					<span className='text-bold ml-auto'>{value}</span>
				</div>
			))}
		</div>
	);
};

export default SideBar;
