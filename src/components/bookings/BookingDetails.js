import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {getBookingDetails, cancelUserTickets} from '../../api/flightApi';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import swal from 'sweetalert';
import {isRefundable} from '../../utils/helpers';
import PassengerDetails from '../flights/PassengerDetails';

class BookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			booking: {}
		};
	}

	cancelUserRequest(passengers) {
		cancelUserTickets(passengers)
			.then((repsonse) => {
				console.log(repsonse);
				swal({
					title: 'Tickets cancellation!',
					text: 'Your ticket cancellation is in process',
					icon: 'success',
					button: 'Continue!'
				});
				history.push('/bookings');
			})
			.catch((error) => {
				console.log(error);
				swal({
					title: 'Tickets cancellation!',
					text: error.message,
					icon: 'error',
					button: 'Continue!'
				});
			});
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
					console.log(error);
				});
		}
	}

	render() {
		const {booking} = this.state;
		const flight = {};
		return (
			<React.Fragment>
				<div className='container bg-white'>
					<div className='d-flex justify-content-between p-2'>
						<h3 className='text-center text-success'> Tickets Details </h3>
						<span className='text-primary text-bold'> EDIT </span>
					</div>
					{booking.booking_transaction !== undefined && (
						<div>
							<div className=''>
								<div> Outbound PNR No - {booking.pnr_no} </div>
								<div> Invoice No - {booking.booking_transaction.idx} </div>
								<div> Reporting Time - {booking.flight_date} </div>
							</div>
						</div>
					)}
					<div className='flight-details'>
						<div className='header d-flex justify-content-between align-items-center text-small text-muted'>
							<span>
								<img src={flight.AirlineLogo} className='p-2' />

								<div className='text-center'>
									{flight.FlightNo}({flight.FlightClassCode})
								</div>
							</span>
							<span className=''> {flight.FlightDate} </span>
							<span className='text-center'>
								Class: {booking.class_code}
								<div className='text-bold text-success'>{isRefundable(flight.Refundable)}</div>
								<div>FreeBaggage: {flight.FreeBaggage}</div>
							</span>
						</div>
						<hr />
						<div className='body'>
							<div class='d-flex justify-content-between align-items-center'>
								<span className='text-center'>
									{flight.DepartureTime} <div className='text-bold'>{flight.Departure}</div>
								</span>
								<span class='text-small text-muted'>{flight.duration} min</span>
								<span className='text-center'>
									{flight.ArrivalTime}
									<div className='text-bold'>{flight.Arrival}</div>
								</span>
							</div>
							<div className='text-center text-small text-muted' />
							<hr />
							<div>
								<span className='text-center p-3'>
									<div className='text-bold'>
										Total Fare: {flight.Currency} {booking.total_fare}
									</div>
									<div className='text-small text-muted'>
										({booking.adult} Adult, {booking.child} Child)
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
										Fuel Surcharge: {flight.Currency} {flight.FuelSurcharge} x ({booking.adult} +{' '}
										{booking.child})
									</li>
									<li>
										Tax: {flight.Currency} {flight.Tax} x ({booking.adult} + {booking.child})
									</li>
								</ul>
							</div>
						</div>
					</div>
					<h5 className='d-inline ' />
					<div className='d-flex justify-content-between p-2'>
						<span class='text-bold'>Passenger Details</span>
						<span className='text-primary text-bold'> Cancel Tickets </span>
					</div>
					<div class='d-flex justify-content-end'>
						<input
							type='checkbox'
							onChange={() => this.cancelUserRequest(booking.passengers)}
							label='All'
						/>
						<label>All</label>
					</div>
					<div className='passenger-details container p-0'>
						<table class='table'>
							<thead>
								<tr className='text-center'>
									<th>Ticket</th>
									<th>Name</th>
									<th>Type</th>
									<th>Nationality</th>
									<th> Cancel </th>
								</tr>
							</thead>
							<tbody>
								{booking.passengers !== undefined &&
									booking.passengers.map((passenger) => {
										return (
											<tr className='text-center'>
												<td className=''>{passenger.ticket_no}</td>
												<td className=''>
													{passenger.title} {passenger.first_name} {passenger.last_name}
												</td>
												<td className=''>{passenger.passenger_type}</td>
												<td className=''>{passenger.nationality}</td>
												<td>
													<input
														type='checkbox'
														onChange={() => this.cancelUserRequest([passenger])}
														label='All'
													/>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<div className='text-center'>
						<Link
							className='btn btn-primary'
							to={{
								pathname: `/ticket/${booking.ruid}`,
								state: {
									booking: booking
								}
							}}
						>
							View ticket
						</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default BookingDetails;
