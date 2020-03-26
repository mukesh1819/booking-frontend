import React from 'react';
import {ListGroup, Button, Modal, Nav, NavItem} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import history from '../../history';
import SocialLinks from '../sessions/SocialLinks';

function Slidebar({items = [], isVisible, onHide}) {
	return (
		<div className={`side-nav slide d-md-none ${isVisible ? 'show' : 'closed'}`}>
			<div className='list-group'>
				{items.map(({label, name, details, icon, value, link, ...rest}) => (
					<div
						className='sidebar-item d-flex align-items-center'
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
				<hr className='m-0' />
				<div className='sidebar-item d-flex justify-content-between' key='flights'>
					<span>
						<i class='fas fa-plane-departure  p-2 text-primary' /> {'Flights'}
					</span>
				</div>
				<div className='sidebar-item d-flex justify-content-between' key='packages'>
					<span>
						<i class='fab fa-fort-awesome p-2 text-primary' />
						{'Packages'}
					</span>
				</div>
			</div>
			<SocialLinks />
		</div>
	);
}

export default Slidebar;
