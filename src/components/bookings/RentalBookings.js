import React, {Component, Fragment} from 'react';
import {getRentalBookings} from '../../api/bookingApi';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {passCsrfToken, ifNotZero, getDuration} from '../../helpers';
import moment from 'moment';
import {EmptyContent} from '../shared';
import {Badge} from '../shared';
import swal from 'sweetalert';
import {Timer} from '../shared';
import {PaymentForm} from '../payments';

class RentalBookings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bookings: [],
			refresh: false
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchDetails();
	}

	componentWillUnmount() {}

	fetchDetails = (params) => {
		getRentalBookings()
			.then((response) => {
				console.log('Rental Bookings List', response);
				this.setState({
					bookings: response.data.car_bookings
				});
			})
			.catch((error) => {
				// console.log(error);
				this.setState({
					error
				});

				console.log(' Package Booking List fetch error', error);
			});
	};

	render() {
		const {bookings} = this.state;
		if (bookings.length == 0) {
			return <EmptyContent>No Rental Bookings yet.</EmptyContent>;
		}

		return (
			<div className=''>
				{bookings.map((booking) => {
					console.log('RENTALS', bookings);
					return (
						<div className='transaction'>
							<div className='booking d-flex justify-content-between align-items-center p-3'>
								<div key={booking.idx} className=''>
									<div>
										<strong>{booking.package ? booking.package.name : ''}</strong>
									</div>
									<div>
										<span className='text-small text-muted px-2'>
											<i className='calendar alternate icon' />&nbsp;
											{`${moment(booking.start_date).format('Do MMMM, YYYY')}`}
										</span>
										<span className='text-small text-muted px-2'>
											<i className='calendar alternate outline icon' />&nbsp;
											{`${moment(booking.end_date).format('Do MMMM, YYYY')}`}
										</span>
									</div>
								</div>
								<div className='text-center'>
									<div className=''>
										<Badge type={booking.status}>{booking.status}</Badge>
									</div>
									{(booking.status == 'completed' || booking.status == 'verified') && (
										<Link
											to={{
												pathname: `/ticket/${booking.idx}`
											}}
											className='btn bg-none text-primary'
										>
											View Ticket
										</Link>
									)}

									{(booking.status == 'pending' || booking.status == 'processing') && (
										<Link
											to={{
												pathname: `/car_bookings/${booking.idx}`
											}}
											className='btn bg-none text-primary'
										>
											View Details
										</Link>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default RentalBookings;
