import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const BookingDetails = (props) => {
	debugger;
	const {bookings} = props;
    return (
        <div>
			<Card>
				<Card.Body>
					<Card.Title>BookingDetails</Card.Title>
					{bookings.map((booking) => {
						return(
							<React.Fragment>
							<div className='row'>
								<div className='col-3'>
									Flight Id - <p>{booking.flight_id}</p>
								</div>
								<div className='col-3'>
									Return Flight Id - <p>{booking.return_flight_id}</p>
								</div>
								<div className='col-3'>
									User Id - <p>{booking.user_id}</p>
								</div>
								<div className='col-3'>
									Contact Name - <p>{booking.contact_name}</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									Mobile No - <p>{booking.mobile_no}</p>
								</div>
								<div className='col-3'>
									email - <p>{booking.email}</p>
								</div>
								<div className='col-3'>
									Pnr No - <p>{booking.pnr_no}</p>
								</div>
								<div className='col-3'>
									Created at - <p>{booking.created_at}</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									<p>{booking.airline}</p>
								</div>
								<div className='col-3'>
									<p>{booking.flight_no}</p>
								</div>
								<div className='col-3'>
									<p>{booking.booking_date_time}</p>
								</div>
								<div className='col-3'>
									<p>{booking.departure_flight_time}</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									Arrival - <p>{booking.arrival}</p>
								</div>
								<div className='col-3'>
									Arrival time - <p>{booking.arrival_time}</p>
								</div>
								<div className='col-3'>
									Sector - <p>{booking.sector}</p>
								</div>
								<div className='col-3'>
									Departure - <p>{booking.departure}</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									Class code - <p>{booking.class_code}</p>
								</div>
								<div className='col-3'>
									Total fare - <p>{booking.total_fare}</p>
								</div>
								<div className='col-3'>
									Refundable - <p>{booking.refundable}</p>
								</div>
								<div className='col-3'>
									Status - <p>{booking.status}</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									Transaction id - <p>{booking.booking_transaction_id}</p>
								</div>
								<div className='col-3'>
									Baggage - <p>{booking.free_baggage}</p>
								</div>
								<div className='col-3'>
									Reporting time - <p>{booking.reporting_time}</p>
								</div>
							</div>
						</React.Fragment>
					);
					})}
				</Card.Body>
			</Card>

		</div>
    );
};
export default BookingDetails;