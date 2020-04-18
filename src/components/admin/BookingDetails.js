import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import moment from 'moment';
import {ifNotZero} from '../../helpers';
import {Badge} from '../shared';
import {Accordion} from 'semantic-ui-react';

const BookingDetails = ({booking, activeIndex, index, handleClick}) => {
	return (
		<React.Fragment>
			<Accordion.Title active={activeIndex === index} index={index} onClick={handleClick}>
				<div className='d-flex justify-content-between'>
					<div>
						<h5>{booking.contact_name}</h5>
						<div className='text-muted text-small'>{booking.email}</div>
						<div className='text-muted text-small'>{booking.mobile_no}</div>
					</div>
					<div>
						<div className=''>
							<span className='px-2'>{`${booking.departure}`}</span>
							<i className='fas fa-arrow-right' />
							<span className='px-2'> {`${booking.arrival}`}</span>
						</div>
						<div>
							<span className='text-small text-muted px-2'>
								<i className='fas fa-plane-departure' />&nbsp;
								{/* {`${moment(booking.flight_date).format('Do MMMM, YYYY')}`} */}
							</span>
							{booking.strTripType === 'R' && (
								<span className='text-small text-muted px-2'>
									<i className='fas fa-plane-arrival' />&nbsp;
									{/* {`${moment(booking.strReturnDate).format('Do MMMM, YYYY')}`} */}
								</span>
							)}
							<span className='text-small text-muted px-2'>
								<i className='fas fa-male' />&nbsp;
								{booking.no_of_adult} Adult
								{ifNotZero(booking.no_of_child, `, ${booking.no_of_child} Child`)}
							</span>
						</div>
					</div>
					<div className='text-center'>
						<div className=''>
							{booking.currency}
							{booking.total_fare}
						</div>
						<Badge type={booking.status}>{booking.status}</Badge>
					</div>
				</div>
			</Accordion.Title>
			<Accordion.Content active={activeIndex === index}>
				<div className='text-small d-flex'>
					<div>
						<h5>Flight Details</h5>
						<div>Flight Id - {booking.flight_id}</div>
						<div>{booking.airline}</div>
						<div>{booking.flight_no}</div>
						<div>Class code - {booking.class_code}</div>
						<div>Check-in Baggage - {booking.free_baggage}</div>
					</div>
					<div>
						<h5>Booking Details</h5>
						<div>{booking.booking_date_time}</div>
						<div>Pnr No - {booking.pnr_no}</div>
						<div>{booking.departure_flight_time}</div>
						<div>Refundable - {booking.refundable}</div>
						<div>Reporting time - {booking.reporting_time}</div>
					</div>
				</div>
			</Accordion.Content>
		</React.Fragment>
	);
};
export default BookingDetails;
