import React from 'react';
import {ListGroup, Button, Modal, Nav, NavItem} from 'react-bootstrap';

function Sidebar(props) {
	const items = [
		{name: 'home', label: 'Home'},
		{name: 'billing', label: 'Billing'},
		{name: 'settings', label: 'Settings'}
	];
	console.log('Sidebar', items);
	return (
		<div className='sidebar'>
			<Modal className='Sidebar left' show={props.isVisible} onHide={props.onHide} autoFocus keyboard>
				<Modal.Header closeButton>
					<Modal.Title>Sidebar Menu</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
				<ListGroup>
					{items.map(({label, name, ...rest}) => (
						<ListGroup.Item key={name} variant='primary'>
							{label}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Modal>
		</div>
	);
}

export default Sidebar;
