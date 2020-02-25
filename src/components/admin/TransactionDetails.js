import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import UserDetails from '../users/UserDetailCard';
import BookingDetails from './BookingDetails'

const TransactionDetails = (props) => {
    const {transaction} = props.location.state;
    console.log(transaction);
    return (
        <div>
		<UserDetails user= {transaction.user} />
		<BookingDetails bookings= {transaction.bookings} />
	</div>
    );
};
export default TransactionDetails;