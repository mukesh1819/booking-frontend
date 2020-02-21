import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import UserDetails from './UserDetails';
import BookingDetails from './BookingDetails'
const TransactionDetails = () => {
    return (
        <div>
		<UserDetails />
		<BookingDetails />
	</div>
    );
};
export default TransactionDetails;