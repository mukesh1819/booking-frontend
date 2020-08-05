import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import history from '../../history';
import SocialLinks from '../sessions/SocialLinks';

function Slidebar({items = [], isVisible, onHide}) {
	return (
		<div className={`slide-nav slide d-md-none ${isVisible ? 'show' : 'closed'}`}>
			<div className='list-group'>
				{items.map(({label, name, details, icon, value, link, ...rest}) => (
					<div
						className='item d-flex align-items-center'
						key={name}
						onClick={() => {
							history.push(link);
							onHide();
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
			<hr />
			<SocialLinks />
		</div>
	);
}

export default Slidebar;
