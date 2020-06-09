import React, {Component, Fragment} from 'react';
import {getPackageBookings} from '../../api/bookingApi';
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

class PackageBookings extends Component {
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
		getPackageBookings(`q[booking_type_eq]=PACKAGE`)
			.then((response) => {
				console.log('Package Bookings List', response);
				this.setState({
					bookings: response.data.package_bookings
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
		console.log('Bookings', bookings);

		if (bookings.length == 0) {
			return <EmptyContent>No Package Bookings yet.</EmptyContent>;
		}

		return (
			<div className=''>
				{bookings.map((booking) => {
					console.log('Bookings', bookings);
					return (
						<div className='transaction'>
							<div className='booking d-flex justify-content-between align-items-center p-3'>
								<div key={booking.ruid} className=''>
									<div>
										<strong>{booking.package ? booking.package.name : ''}</strong>
									</div>
									<div>
										<span className='text-small text-muted px-2'>
											<i className='fas fa-plane departure' />&nbsp;
											{`${moment(booking.start_date).format('Do MMMM, YYYY')}`}
										</span>
										<span className='text-small text-muted px-2'>
											<i className='fas fa-plane arrival' />&nbsp;
											{`${moment(booking.end_date).format('Do MMMM, YYYY')}`}
										</span>
									</div>
								</div>
								<div>
									<div className=''>
										<Badge type={booking.status}>{booking.status}</Badge>
									</div>
									{(booking.status == 'completed' || booking.status == 'verified') && (
										<Link
											to={{
												pathname: `/ticket/${booking.ruid}`,
												state: {
													booking: booking
												}
											}}
											className='btn bg-none text-primary'
										>
											View Ticket
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

export default PackageBookings;
