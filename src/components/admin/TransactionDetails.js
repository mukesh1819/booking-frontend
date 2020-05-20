import React, {Component} from 'react';
import {Button, ButtonToolbar, Modal, Tabs, Tab} from 'react-bootstrap';
import UserDetailCard from '../users/UserDetailCard';
import BookingDetails from './BookingDetails';
import TransactionApiResponse from './TransactionApiResponse';
import {Badge} from '../shared';

const TransactionDetails = (props) => {
	const {transaction} = props.location.state || {};
	return (
		<div className='ui container'>
			<h3 className='title'>Transaction Details</h3>
			<div className='ui segment'>
				<div className='list-view'>
					<div className='list'>
						<span className='label'>Invoice Number</span>
						<span className='value'>{transaction.idx}</span>
					</div>
					<div className='list'>
						<span className='label'>Type</span>
						<span className='value'>{transaction.booking_type}</span>
					</div>
					<div className='list'>
						<span className='label'>Amount</span>
						<span className='value'>{transaction.amount}</span>
					</div>
					<div className='list'>
						<span className='label'>Created on</span>
						<span className='value'> {transaction.created_at}</span>
					</div>
					<div className='list'>
						<span className='label'>Status</span>
						<span className='value'>
							<Badge type={transaction.state}> {transaction.state}</Badge>
						</span>
					</div>
				</div>
			</div>

			<div className='ui card fluid'>
				<div className='ui card content'>
					<h3>User Details</h3>
					<UserDetailCard user={transaction.user} />

					{transaction.bookings && (
						<div className='ui card'>
							<h3 className='ui header'>Booking Details</h3>
							<div className='ui card content'>
								{transaction.bookings.map((booking) => <BookingDetails booking={booking} />)}
							</div>
						</div>
					)}

					<h3>API Response</h3>
					<TransactionApiResponse response={transaction.response} />
				</div>
			</div>
		</div>
	);
};
export default TransactionDetails;
