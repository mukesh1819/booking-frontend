import React from 'react';
import {ListGroup, Button, Modal, Nav, NavItem} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import history from '../../history';

function Sidebar({items = [], isVisible, onHide}) {
	return (
		<div className={`sidebar d-md-none ${isVisible ? 'show' : 'closed'}`}>
			<div className='list-group'>
				{items.map(({label, name, details, icon, value, link, ...rest}) => (
					<div
						className='list-group-item d-flex align-items-center'
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
						<span class='text-bold ml-auto'>{value}</span>
					</div>
				))}
				<hr />
				<div className='list-group-item d-flex justify-content-between' key='flights'>
					<span>
						<i className='icon-paper-plane p-2 text-primary' /> {'Flights'}
					</span>
				</div>
				<div className='list-group-item d-flex justify-content-between' key='packages'>
					<span>
						<i className='icon-paper-plane p-2 text-primary' /> {'Packages'}
					</span>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
