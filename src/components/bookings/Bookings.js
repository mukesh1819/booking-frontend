import React, {Component} from 'react';
import {getBookings} from '../../api/userApi';
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

class Bookings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bookings: [],
			refresh: false
		};

		this.onTimeOut = this.onTimeOut.bind(this);
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchDetails();
		this.setState({
			refresh: false
		});
	}

	componentWillUnmount() {}

	onTimeOut = () => {
		this.fetchDetails();
		this.setState({
			refresh: true
		});
	};

	fetchDetails = (params) => {
		getBookings(`q[booking_type_eq]=FLIGHT`)
			.then((response) => {
				console.log('Bookings List', response);
				this.setState({
					bookings: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				this.setState({
					error
				});

				swal({
					title: 'Booking fetch error',
					text: `could not able to fetch booking.. please try again or contact us`,
					icon: 'error',
					button: 'Continue!'
				});
			});
	};

	render() {
		const {bookings} = this.state;
		console.log('Bookings', bookings);

		if (bookings.length == 0) {
			return <EmptyContent>No bookings yet.</EmptyContent>;
		}

		return (
			<div className='booking-list container card'>
				<div className='card-body'>
					<h3 className='title'>Bookings</h3>
					{bookings.map((booking) => {
						console.log('Bookings', bookings);
						return (
							<div className='transaction'>
								<div className='booking d-flex justify-content-between align-items-center p-3'>
									<div key={booking.departing_flight.ruid} className=''>
										<div className=''>
											<span className='px-2'>{`${booking.departing_flight.departure}`}</span>
											<i
												className={
													booking.trip === 'One Way' ? (
														'fas fa-arrow-right'
													) : (
														'fas fa-exchange-alt'
													)
												}
											/>
											<span className='px-2'> {`${booking.departing_flight.arrival}`}</span>
										</div>
										<div>
											<span className='text-small text-muted px-2'>
												<i className='fas fa-plane departure' />&nbsp;
												{`${moment(booking.departing_flight.flight_date).format(
													'Do MMMM, YYYY'
												)}`}
											</span>
											{booking.trip === 'Two Way' && (
												<span className='text-small text-muted px-2'>
													<i className='fas fa-plane arrival' />&nbsp;
													{`${moment(booking.arriving_flight.strReturnDate).format(
														'Do MMMM, YYYY'
													)}`}
												</span>
											)}
											<span className='text-small text-muted px-2'>
												<i className='fas fa-male' />&nbsp;
												{booking.departing_flight.no_of_adult} Adult
												{ifNotZero(
													booking.departing_flight.no_of_child,
													`, ${booking.departing_flight.no_of_child} Child`
												)}
											</span>
										</div>
									</div>
									<div>
										{booking.departing_flight.status == 'pending' && (
											<Link
												to={{
													pathname: `/ticket/${booking.departing_flight.ruid}`,
													state: {
														booking: booking
													}
												}}
												className='btn bg-none text-primary'
											>
												Continue to Payment
											</Link>
										)}

										{booking.departing_flight.status == 'completed' && (
											<Link
												to={{
													pathname: `/ticket/${booking.departing_flight.ruid}`,
													state: {
														booking: booking
													}
												}}
												className='btn bg-none text-primary'
											>
												View Ticket
											</Link>
										)}

										<div className='text-danger text-center'>
											<Timer
												ttlTime={getDuration(booking.departing_flight.reservation_time)}
												onTimeOut={this.onTimeOut}
											/>
										</div>
										{/* <div>
														<Badge type={booking.departing_flight.status}>
															{booking.departing_flight..status}
														</Badge>
													</div> */}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Bookings;
