import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import {getBookingDetails, downloadTicket} from '../../api/flightApi';
import {isRefundable, ifNotZero, ifGreaterThanOne} from '../../helpers';
import moment from 'moment';
import swal from 'sweetalert';

class TicketDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			departure: {},
			arrival: {}
		};
	}

	componentDidMount() {
		getBookingDetails(this.props.match.params.id)
			.then((response) => {
				console.log('Booking DAtA', response.data);
				debugger;
				this.setState({
					departure: response.data.departure,
					arrival: {}
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Booking fetch error',
					text: `could not able to fetch booking.. please try again or contact us`,
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	render() {
		const {departure, arrival} = this.state;
		const booking = departure;
		var bookings = [departure];
		if (arrival.flight_id !== undefined) {
			bookings.push(arrival);
		}
		return (
			<React.Fragment>
				<div className='container bg-white'>
					<div className='text-center py-4'>
						<h3>Visit All Nepal</h3>
						<h4 className='text-success'>E-Ticket</h4>
					</div>
					<div className='p-3'>
						<h5 className='text-center text-secondary'>
							Tickets operated and managed by Booking Nepal Travels and Tours Pvt. Ltd
						</h5>
					</div>
					<div className=''>
						{bookings.map((booking) => (
							<div className='row'>
								<div className='col-12 col-md-9'>
									<div className='widget mb-4'>
										<div className='card'>
											<h3 className='card-header'>Flight Details</h3>

											<div className='card-body'>
												<div className='flight-details p-2'>
													<div className='header d-flex justify-content-between align-items-center text-small text-muted'>
														<span>
															<img src={booking.airline_logo} className='p-2' />
															<div className='text-center'>{'Simrik Air'}</div>
														</span>
														<span className='text-center'>
															<i className='fas fa-plane fa-2x departure text-primary' />
															<div>
																{moment(booking.flight_date).format('D MMMM, YYYY')}
															</div>
														</span>
														<span className='text-right'>
															Class: {booking.class_code} | &nbsp;
															<span className='text-info'>
																{isRefundable(booking.refundable)}
															</span>
															<div>Check-in Baggage: {booking.free_baggage}</div>
															<div>Flight: {booking.flight_no}</div>
														</span>
													</div>
													<hr />
													<div className='body'>
														<div className='d-flex justify-content-between align-items-center'>
															<span className='text-center'>
																{booking.departure_flight_time}
																<div className='text-bold'>{booking.departure}</div>
															</span>
															<span className='text-small text-muted text-center'>
																<i className='fas fa-clock text-primary' />
																<div>{booking.duration} min</div>
															</span>
															<span className='text-center'>
																{booking.arrival_time}
																<div className='text-bold'>{booking.arrival}</div>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='col-12 col-md-3'>
									<div className='widget'>
										<div className='card'>
											<h3 className='card-header'>Fare Details</h3>
											<div className='card-body'>
												<div>
													<span className='text-center p-3'>
														<div className='text-bold'>
															Total Fare: {booking.currency} {booking.total_fare}
														</div>
														<div className='text-small text-muted'>
															({booking.adult} Adult
															{ifNotZero(booking.child, `, ${booking.child} Child`)})
														</div>
													</span>
													<ul className='text-muted text-small'>
														{booking.adult > 0 && (
															<li>
																Base Fare (1 Adult): {booking.currency}
																{booking.adult_fare}
																{ifGreaterThanOne(
																	booking.adult,
																	` * (${booking.adult})`
																)}
															</li>
														)}
														{booking.child > 0 && (
															<li>
																Base Fare (1 Child): {booking.currency}{' '}
																{booking.child_fare}
																{ifGreaterThanOne(
																	booking.child,
																	` * (${booking.child})`
																)}
															</li>
														)}
														<li>
															Fuel Surcharge: {booking.currency} {booking.fuel_surcharge}
															{ifGreaterThanOne(
																booking.adult + booking.child,
																` * (${booking.adult} + ${booking.child})`
															)}
														</li>
														<li>
															Tax: {booking.currency} {booking.tax}{' '}
															{ifGreaterThanOne(
																booking.adult + booking.child,
																` * (${booking.adult} + ${booking.child})`
															)}
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}

						<div className='row'>
							<div className='col-12 col-md-9'>
								<div className='widget'>
									<div className='card'>
										<h3 className='card-header'>Passenger Details</h3>
										<div className='card-body'>
											<div className='passenger-details container p-0'>
												<table className='table'>
													<thead>
														<tr className='text-center'>
															<th>Ticket</th>
															<th>Name</th>
															<th>Type</th>
															<th>Nationality</th>
														</tr>
													</thead>
													<tbody>
														{booking.passengers !== undefined &&
															booking.passengers.map((passenger) => {
																return (
																	<tr className='text-center'>
																		<td className=''>{passenger.ticket_no}</td>
																		<td className=''>
																			{passenger.title} {passenger.first_name}
																			{passenger.last_name}
																		</td>
																		<td className=''>{passenger.passenger_type}</td>
																		<td className=''>{passenger.nationality}</td>
																	</tr>
																);
															})}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='col-12 col-md-3'>
								<div className='widget mb-4'>
									<div className='card'>
										<h3 className='card-header'>Booking Details</h3>
										<div className='card-body'>
											<div className='p-2'>
												<div className=''>
													<div>
														<span class='text-bold'>PNR No:&nbsp;</span>
														<span className='text-small'>{booking.pnr_no}</span>
													</div>
													<div>
														<span class='text-bold'>Invoice:&nbsp;</span>
														<span className='text-small'>{booking.ruid}</span>
													</div>
													<div>
														<span class='text-bold'>Reporting Time:&nbsp;</span>
														<span className='text-small'>
															{moment(booking.flight_date).format('D MMMM, YYYY')}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='text-center py-4'>
						<span onClick={() => downloadTicket(booking.ruid)} className='btn btn-primary btn-large'>
							Print ticket
						</span>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default TicketDetails;
