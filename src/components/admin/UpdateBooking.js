import React, {Component} from 'react';
import {getAdminBookings} from '../../api/flightApi';
import {passCsrfToken} from '../../helpers';
import axios from 'axios';
import {cancelAdminTicket} from '../../api/flightApi';
import {ignoreAdminTicket} from '../../api/flightApi';
import {Link, NavLink} from 'react-router-dom';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import swal from 'sweetalert';

class UpdateBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookings: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchBookings(`q[status_eq]=processing`);
	}

	fetchBookings(params) {
		getAdminBookings(params)
			.then((response) => {
				// console.log(response);
				this.setState({
					bookings: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Booking fetch error',
					text: 'could not able to fetch booking. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	adminCancelRequest(passenger_id) {
		cancelAdminTicket(passenger_id)
			.then((response) => {
				// console.log(response);
				swal({
					title: 'Tickets cancellation!',
					text: 'Your ticket is cancelled',
					icon: 'success',
					button: 'Continue!'
				});
				this.fetchBookings(`q[status_eq]=processing`);
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Tickets cancellation!',
					text: `${error.message}.. please check error message if not shown from backend`,
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	adminIgnoreRequest(passenger_id) {
		ignoreAdminTicket(passenger_id)
			.then((response) => {
				// console.log(response);
				swal({
					title: 'Tickets Ignored!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				});
				this.fetchBookings(`q[status_eq]=processing`);
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Tickets cancellation!',
					text: `${error.message}.. please check error message if not shown from backend`,
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.bookings !== null && (
					<div className='container-fluid'>
						<div className='col-md-9 ml-auto mr-auto' id='search-form1'>
							<h3 className='text-success'> Cancel Request </h3>
							<table className='table table-striped table-sm'>
								<thead>
									<tr>
										<th> Passenger Name </th> <th> Nationality </th> <th> Passenger Type </th>
										<th> Ticket No </th> <th> Cancel status </th>
									</tr>
								</thead>
								<tbody>
									{this.state.bookings.map((booking) => {
										return booking.passengers.map((passenger) => {
											if (passenger.passenger_status !== 'processing') {
												return;
											}
											return (
												<tr>
													<td>
														<Link
															to={{
																pathname: '/bookings',
																state: {
																	booking: booking
																}
															}}
														>
															{passenger.title + ' ' + passenger.first_name}
														</Link>
													</td>
													<td> {passenger.nationality} </td>
													<td> {passenger.passenger_type} </td>
													<td> {passenger.ticket_no} </td>
													<td> {passenger.passenger_status} </td>
													{passenger.passenger_status === 'processing' && (
														<td>
															<div>
																<span
																	className='btn  btn-danger'
																	onClick={() =>
																		this.adminCancelRequest(passenger.id)}
																>
																	cancel
																</span>
																<span
																	className='btn btn-secondary'
																	onClick={() =>
																		this.adminIgnoreRequest(passenger.id)}
																>
																	ignore
																</span>
															</div>
														</td>
													)}
													{passenger.passenger_status === 'cancelled' && (
														<td>
															<p className='text-danger text-center font-weight-bolder text-lg mt-2'>
																Ticket Cancelled
															</p>
														</td>
													)}
												</tr>
											);
										});
									})}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default UpdateBooking;
