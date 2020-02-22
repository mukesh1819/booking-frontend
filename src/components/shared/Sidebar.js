import React from 'react';
import {ListGroup, Button, Modal, Nav, NavItem} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import history from '../../history';

function Sidebar({items = [], isVisible, onHide}) {
	return (
		<div className={`sidebar d-md-none ${isVisible ? 'show' : 'closed'}`}>
			<div>
				<ListGroup>
					{items.map(({label, name, icon, value, link, ...rest}) => (
						<ListGroup.Item
							className='d-flex justify-content-between'
							key={name}
							onClick={() => {
								history.push(link);
								onHide();
							}}
						>
							<span>
								<i className={icon} /> {label}
							</span>
							<span class='text-bold'>{value}</span>
						</ListGroup.Item>
					))}
					<ListGroup.Item className='d-flex justify-content-between' key='flights'>
						<span>
							<i className='icon-paper-plane' /> {'Flights'}
						</span>
					</ListGroup.Item>
					<ListGroup.Item className='d-flex justify-content-between' key='packages'>
						<span>
							<i className='icon-paper-plane' /> {'Packages'}
						</span>
					</ListGroup.Item>
				</ListGroup>
			</div>
		</div>
	);
}

export default Sidebar;
