import React, {Component} from 'react';
import {Button, ButtonToolbar, Modal, Tabs, Tab} from 'react-bootstrap';

const TransactionDetails = (props) => {
	const {transaction} = props.location.state;
	const [show, setShow] = React.useState(false);
	const [key, setKey] = React.useState('user');
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// console.log(transaction);
	return (
		<div>
			<Button variant='primary'>Transaction Details</Button>
		</div>
	);
};
export default TransactionDetails;
