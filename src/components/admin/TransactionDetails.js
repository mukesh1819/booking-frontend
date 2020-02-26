import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal, Tabs, Tab } from 'react-bootstrap';
import UserDetailCard from '../users/UserDetailCard';
import BookingDetails from './BookingDetails';
import TransactionApiResponse from './TransactionApiResponse';
import ModalExample from '../shared/Modal';
import {ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';

const TransactionDetails = (props) => {
    const {transaction} = props.location.state;
    const [show, setShow] = React.useState(false);
    const [key, setKey] = React.useState('user');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(transaction);
    return (
        <div>
            <Button variant="primary">
                Transaction Details
            </Button>
		
	    </div>
    );
};
export default TransactionDetails;