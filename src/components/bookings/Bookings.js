import React, {Component} from 'react';
import {getBookings} from '../../api/userApi';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {passCsrfToken, ifNotZero} from '../../helpers';
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
		var currentTime = moment().format('YYYY MM DD HH:mm:ss');
		if (this.state.transactions.length == 0) {
			return <EmptyContent>No bookings yet.</EmptyContent>;
		}

		return (
			<div className='booking-list container card'>
				<div className='card-body'>
					<h3 className='title'>Bookings</h3>
					{transactions.map((transaction) => {
						return transaction.bookings.map(function(booking) {
							if (
								booking.reservation_time == null ||
								moment(booking.reservation_time).utc().format('YYYY MM DD HH:mm:ss') < currentTime
							) {
								return;
							}

							var bookingTime = moment.utc(booking.reservation_time).format('YYYY MM DD HH:mm:ss');
							var start = moment.utc(currentTime, 'HH:mm:ss');
							var end = moment.utc(bookingTime, 'HH:mm:ss');
							var d = moment.duration(end.diff(start));
							var remainingTime = moment.utc(+d).format('mm:ss');

							return (
								<Link
									key={booking.ruid}
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
												{booking.adult} Adult
												{ifNotZero(booking.child, `, ${booking.child} Child`)} Child
											</span>
										</div>
									</div>
									<div className='text-danger'>
										{console.log(
											'reservation_date =',
											moment(booking.reservation_time).utc().format('YYYY MM DD HH:mm:ss')
										)}
										{console.log('new_date =', moment().format('YYYY MM DD HH:mm:ss'))}
										{console.log('remainingTIme =', remainingTime)}
										{d !== 0 && <Timer ttlTime={remainingTime} />}
									</div>
									<div>
										<Badge type={booking.status}>{booking.status}</Badge>
									</div>
								</Link>
							);
						});
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
