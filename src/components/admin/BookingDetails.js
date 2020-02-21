import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const BookingDetails = ({ bookings = [] }) => {
    return (
        <div>
			<Card>
				<Card.Body>
					<Card.Title>BookingDetails</Card.Title>
					{bookings.map((booking) => {
						<React.Fragment>
							<div className='row'>
								<div className='col-3'>
									<p>Booking Flight Id</p>
								</div>
								<div className='col-3'>
									<p>Booking return_flight_id</p>
								</div>
								<div className='col-3'>
									<p>Booking user_id</p>
								</div>
								<div className='col-3'>
									<p>Booking contact_name</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									<p>Booking mobile_no</p>
								</div>
								<div className='col-3'>
									<p>Booking email</p>
								</div>
								<div className='col-3'>
									<p>Booking pnr_no</p>
								</div>
								<div className='col-3'>
									<p>Booking created_at</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									<p>Booking airline</p>
								</div>
								<div className='col-3'>
									<p>Booking flight_no</p>
								</div>
								<div className='col-3'>
									<p>Booking booking_date_time</p>
								</div>
								<div className='col-3'>
									<p>Booking departure_flight_time</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									<p>Booking arrival</p>
								</div>
								<div className='col-3'>
									<p>Booking arrival_time</p>
								</div>
								<div className='col-3'>
									<p>Booking sector</p>
								</div>
								<div className='col-3'>
									<p>Booking departure</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									<p>Booking class_code</p>
								</div>
								<div className='col-3'>
									<p>Booking NPR total_fare</p>
								</div>
								<div className='col-3'>
									<p>Booking refundable</p>
								</div>
								<div className='col-3'>
									<p>Booking status</p>
								</div>
							</div>

							<div className='row'>
								<div className='col-3'>
									<p>Booking booking_transaction_id</p>
								</div>
								<div className='col-3'>
									<p>Booking free_baggage</p>
								</div>
								<div className='col-3'>
									<p>Booking reporting_time</p>
								</div>
							</div>
						</React.Fragment>;
					})}
				</Card.Body>
			</Card>

			<div className='col-md-9 ml-auto mr-auto' id='search-form1'>
				<h3 className='text-success'>Passenger Info</h3>
				<table className='table table-striped table-sm'>
					<thead>
						<tr>
							<th>Passenger Name</th>
							<th>Nationality</th>
							<th>Passenger Type</th>
							<th>Ticket No</th>
							<th>Gender</th>
							<th> status</th>
							<th>booking id</th>
						</tr>
					</thead>
					<tbody>
						{/* for each passengers */}
						<tr>
							<td> Mr passengertitle + " " + passengerfirst_name</td>
							<td> passengernationality </td>
							<td>passengerpassenger_type </td>
							<td> passengerticket_no</td>
							<td>passenger gender</td>
							<td> passengerstatus</td>
							<td>passenger booking id </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
    );
};
export default BookingDetails;