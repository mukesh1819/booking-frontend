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
import Pagination from 'react-pagination-js';
import 'react-pagination-js/dist/styles.css'; // import css
import swal from 'sweetalert';
import {Timer} from '../shared';

class Bookings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transactions: [],
			currentPage: 1
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		getBookings()
			.then((response) => {
				console.log('Bookings List', response);
				this.setState({
					transactions: response.data
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
	}

	componentWillUnmount() {}

	render() {
		const {transactions} = this.state;
		console.log('TRansactions', transactions);

		if (this.state.transactions.length == 0) {
			return <EmptyContent>No bookings yet.</EmptyContent>;
		}

		return (
			<div className='booking-list container card'>
				<div className='card-body'>
					<h3 className='title'>Bookings</h3>
					{transactions.map((transaction) => {
						return (
							<div className='transaction'>
								{transaction.bookings.map(function(booking) {
									if (booking.reservation_time == null) {
										return;
									}

									return (
										<Link
											key={booking.ruid}
											className='booking d-flex justify-content-between align-items-center p-3'
											to={{
												pathname: `/booking/${booking.ruid}`,
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
														{booking.no_of_adult} Adult
														{ifNotZero(
															booking.no_of_child,
															`, ${booking.no_of_child} Child`
														)}
													</span>
												</div>
											</div>
										</Link>
									);
								})}
								{transaction.bookings[0] !== undefined && (
									<div>
										<div className='text-danger'>
											<Timer ttlTime={getDuration(transaction.bookings[0].reservation_time)} />
										</div>
										<div>
											<Badge type={transaction.bookings[0].status}>
												{transaction.bookings[0].status}
											</Badge>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
				<div className='text-center'>
					<Pagination
						currentPage={this.state.currentPage}
						totalPages={10}
						changeCurrentPage={this.changeCurrentPage}
					/>
				</div>
			</div>
		);
	}
}

export default Bookings;
