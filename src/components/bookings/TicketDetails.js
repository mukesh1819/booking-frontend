import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import {getBookingDetails, downloadTicket} from '../../api/flightApi';
import {isRefundable, ifNotZero} from '../../helpers';
import moment from 'moment';
import swal from 'sweetalert';

class TicketDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			booking: {}
		};
	}

	componentDidMount() {
		if (this.props.location.state !== undefined) {
			this.setState({
				booking: this.props.location.state.booking
			});
		} else {
			getBookingDetails(this.props.match.params.id)
				.then((response) => {
					this.setState({
						booking: response.data
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
	}

	render() {
		const {booking} = this.state;
		const flight = {};
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
					<div className='row'>
						<div className='col-12 col-md-3'>
							<div className='widget mb-4'>
								<div className='card'>
									<h3 className='card-header'>Booking Details</h3>
									<div className='card-body'>
										{booking.booking_transaction !== undefined && (
											<div className='p-2'>
												<div className=''>
													<div>
														<span class='text-bold'>PNR No:&nbsp;</span>
														<span className='text-small'>{booking.pnr_no}</span>
													</div>
													<div>
														<span class='text-bold'>Invoice:&nbsp;</span>
														<span className='text-small'>
															{booking.booking_transaction.idx}
														</span>
													</div>
													<div>
														<span class='text-bold'>Reporting Time:&nbsp;</span>
														<span className='text-small'>
															{moment(booking.flight_date).format('D MMMM, YYYY')}
														</span>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className='widget'>
								<div className='card'>
									<h3 className='card-header'>Fare Details</h3>
									<div className='card-body'>
										<div>
											<span className='text-center p-3'>
												<div className='text-bold'>
													Total Fare: {flight.Currency} {booking.total_fare}
												</div>
												<div className='text-small text-muted'>
													({booking.adult} Adult
													{ifNotZero(booking.child, `, ${booking.child} Child`)})
												</div>
											</span>
											<ul className='text-muted text-small'>
												{booking.adult > 0 && (
													<li>
														Base Fare (1 Adult): {flight.Currency} {flight.AdultFare} x ({booking.adult})
													</li>
												)}
												{booking.child > 0 && (
													<li>
														Base Fare (1 Child): {flight.Currency} {flight.ChildFare} x ({booking.child})
													</li>
												)}
												<li>
													Fuel Surcharge: {flight.Currency} {flight.FuelSurcharge} x ({booking.adult}
													{ifNotZero(booking.child, ` + ${booking.child}`)})
												</li>
												<li>
													Tax: {flight.Currency} {flight.Tax} x ({booking.adult}
													{ifNotZero(booking.child, ` + ${booking.child}`)})
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-9'>
							<div className='widget mb-4'>
								<div className='card'>
									<h3 className='card-header'>Flight Details</h3>

									<div className='card-body'>
										<div className='flight-details p-2'>
											<div className='header d-flex justify-content-between align-items-center text-small text-muted'>
												<span>
													<img src={booking.airline_logo} className='p-2' />

													<div className='text-center'>
														{booking.flight_no}({booking.class_code})
													</div>
												</span>
												<span className=''>
													{moment(booking.flight_date).format('D MMMM, YYYY')}
												</span>
												<span className='text-center'>
													Class: {booking.class_code}
													<div className='text-bold text-success'>
														{isRefundable(booking.refundable)}
													</div>
													<div>FreeBaggage: {booking.free_baggage}</div>
												</span>
											</div>
											<hr />
											<div className='body'>
												<div className='d-flex justify-content-between align-items-center'>
													<span className='text-center'>
														{booking.departure_time}
														<div className='text-bold'>{booking.departure}</div>
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
																		{passenger.title} {passenger.first_name}{' '}
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
