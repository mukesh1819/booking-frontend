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
import {Segment, Card} from 'semantic-ui-react';

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
					bookings: response.data.bookings
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' Booking fetch error', error);
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
				console.log(' Cancel ticket error', error);
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
				console.log(' Ignore Ticket error', error);
			});
	}

	render() {
		return (
			<Card fluid>
				<Card.Content>
					{this.state.bookings !== null && (
						<div className='container-fluid'>
							<div className='col-md-9 ml-auto mr-auto' id='search-form1'>
								<h3 className='text-success'> Cancel Request </h3>
								<table className='table table-striped table-sm'>
									<thead>
										<tr>
											<th> Passenger Name </th>
											<th> Nationality </th>
											<th> Passenger Type </th>
											<th> Ticket No </th>
											<th> Status </th>
											<th> </th>
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
																		className='btn  bg-none text-danger'
																		onClick={() =>
																			this.adminCancelRequest(passenger.idx)}
																	>
																		cancel
																	</span>
																	<span
																		className='btn bg-none color-accent'
																		onClick={() =>
																			this.adminIgnoreRequest(passenger.idx)}
																	>
																		ignore
																	</span>
																</div>
															</td>
														)}
														{passenger.passenger_status === 'cancelled' && (
															<td>
																<span className='text-danger text-center font-weight-bolder text-lg mt-2'>
																	Ticket Cancelled
																</span>
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
				</Card.Content>
			</Card>
		);
	}
}

export default UpdateBooking;
