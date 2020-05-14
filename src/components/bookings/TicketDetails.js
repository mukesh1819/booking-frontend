import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import {getTicketDetails, fetchTicket} from '../../api/flightApi';
import {isRefundable, ifNotZero, ifGreaterThanOne, downloadTicket} from '../../helpers';
import moment from 'moment';
import swal from 'sweetalert';
import {Button} from 'semantic-ui-react';

class TicketDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			departure: {},
			arrival: {},
			loading: false
		};
	}

	componentDidMount() {
		getTicketDetails(this.props.match.params.id)
			.then((response) => {
				console.log('Booking DAtA', response.data);
				this.setState({
					departure: response.data.departing_flight,
					arrival: response.data.arriving_flight ? response.data.arriving_flight : {}
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' Booking list fetch error', error);
			});
	}

	download = (idx) => {
		fetchTicket(idx).then((response) => {
			this.setState({
				loading: false
			});
			downloadTicket(response.data);
		});
	};

	render() {
		const {departure, arrival, loading} = this.state;
		var bookings = [departure];
		if (arrival.flight_id !== undefined) {
			bookings.push(arrival);
		}
		return (
			<React.Fragment>
				<div className='container bg-white'>
					<div className='text-center py-4'>
						<h3>{process.env.REACT_APP_TITLE}</h3>
						<h4 className='text-success'>E-Ticket</h4>
					</div>
					<div className='p-3'>
						<h5 className='text-center color-accent'>
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
													<div className='header row align-items-center text-small text-muted'>
														<span className='col'>
															<div>
																<img
																	src={booking.airline_logo}
																	className='p-2 airline-logo'
																/>
																<div>{'Simrik Air'}</div>
															</div>
														</span>
														<span className='col-3 p-0 text-center'>
															<i className='fas fa-plane fa-2x departure text-primary' />
															<div>
																{moment(booking.flight_date).format('D MMMM, YYYY')}
															</div>
														</span>
														<span className='col text-right'>
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
														<div className='row align-items-center'>
															<span className='col'>
																{booking.departure_flight_time}
																<div className='text-bold'>{booking.departure}</div>
															</span>
															<span className='col-3 p-0 text-small text-muted text-center'>
																<i className='fas fa-clock text-primary' />
																<div>{booking.duration} min</div>
															</span>
															<span className='col text-right'>
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
															({booking.no_of_adult} Adult
															{ifNotZero(
																booking.no_of_child,
																`, ${booking.no_of_child} Child`
															)})
														</div>
													</span>
													<ul className='text-muted text-small'>
														{booking.no_of_adult > 0 && (
															<li>
																Base Fare (1 Adult): {booking.currency}{' '}
																{booking.adult_fare}
																{ifGreaterThanOne(
																	booking.no_of_adult,
																	` * (${booking.no_of_adult})`
																)}
															</li>
														)}
														{booking.no_of_child > 0 && (
															<li>
																Base Fare (1 Child): {booking.currency}{' '}
																{booking.child_fare}
																{ifGreaterThanOne(
																	booking.no_of_child,
																	` * (${booking.no_of_child})`
																)}
															</li>
														)}
														<li>
															Fuel Surcharge: {booking.currency} {booking.fuel_surcharge}
															{ifGreaterThanOne(
																booking.no_of_adult + booking.no_of_child,
																` * (${booking.no_of_adult} + ${booking.no_of_child})`
															)}
														</li>
														<li>
															Tax: {booking.currency} {booking.tax}{' '}
															{ifGreaterThanOne(
																booking.no_of_adult + booking.no_of_child,
																` * (${booking.no_of_adult} + ${booking.no_of_child})`
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
														{departure.passengers !== undefined &&
															departure.passengers.map((passenger) => {
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
														<span className='text-bold'>PNR No:&nbsp;</span>
														<span className='text-small'>{departure.pnr_no}</span>
													</div>
													<div>
														<span className='text-bold'>Invoice:&nbsp;</span>
														<span className='text-small'>{departure.ruid}</span>
													</div>
													<div>
														<span className='text-bold'>Reporting Time:&nbsp;</span>
														<span className='text-small'>
															{moment(departure.flight_date).format('D MMMM, YYYY')}
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
						<Button
							primary
							loading={loading}
							className='btn btn-primary btn-large '
							onClick={() => this.download(departure.ruid)}
						>
							Download ticket
						</Button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default TicketDetails;
