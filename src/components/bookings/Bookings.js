import React, {Component} from 'react';
import {getBookings} from '../../api/userApi';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {passCsrfToken} from '../../utils/helpers';
import moment from 'moment';
import EmptyContent from '../EmptyContent';
import Badge from '../shared/Badge';
import Pagination from 'react-pagination-js';
import 'react-pagination-js/dist/styles.css'; // import css

class Bookings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bookings: [],
			currentPage: 1
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		getBookings()
			.then((response) => {
				console.log(response, 'booking response');
				console.log('Bookings List', response);
				this.setState({
					bookings: response.data
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					error
				});
			});
	}

	componentWillUnmount() {}

	render() {
		const {bookings} = this.state;
		if (this.state.bookings.length == 0) {
			return <EmptyContent>No bookings yet.</EmptyContent>;
		}
		return (
			<div className='booking-list container card'>
				<div className='card-body'>
					<h5>Bookings</h5>
					<Pagination
						currentPage={this.state.currentPage}
						totalPages={10}
						changeCurrentPage={this.changeCurrentPage}
					/>
					<h2>current Page:{this.state.currentPage}</h2>
					{bookings.map(function(booking) {
						console.log('Booking', booking);
						return (
							<Link
								className='booking d-flex justify-content-between align-items-center p-3 '
								to={{
									pathname: `/booking_details/${booking.ruid}`,
									state: {
										booking: booking
									}
								}}
							>
								<div>
									<div className=''>
										<span className='px-2'>{`${booking.departure}`}</span>
										<i className='fas fa-arrow-right' />
										<span className='px-2'> {`${booking.arrival}`}</span>
									</div>
									<div>
										<span className='text-small text-muted px-2'>
											<i className='fas fa-plane-departure' />&nbsp;
											{`${moment(booking.flight_date).format('Do MMMM, YYYY')}`}
										</span>
										{booking.strTripType === 'R' && (
											<span className='text-small text-muted px-2'>
												<i className='fas fa-plane-arrival' />&nbsp;
												{`${moment(booking.strReturnDate).format('Do MMMM, YYYY')}`}
											</span>
										)}
										<span className='text-small text-muted px-2'>
											<i className='fas fa-male' />&nbsp;
											{booking.adult} Adult,
											{booking.child} Child
										</span>
									</div>
								</div>
								<div>
									<Badge type={booking.status}>{booking.status}</Badge>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Bookings;
