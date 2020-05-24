import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {getBookingDetails, cancelUserTickets} from '../../api/flightApi';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import swal from 'sweetalert';
import moment from 'moment';
import {isRefundable, ifNotZero} from '../../helpers';
import {PaymentForm} from '../payments';
import {Timer} from '../shared';
import {getDuration} from '../../helpers';

const FlightDetails = ({flight}) => (
	<React.Fragment>
		<div className='row'>
			<div className='col-12 col-md-9'>
				<div className='widget mb-4'>
					<div className='card'>
						<h3 className='card-header'>Flight Details</h3>

						<div className='card-body'>
							<div className='flight-details'>
								<div className='row text-small text-muted align-items-center'>
									<div className='col p-0'>
										<div>
											<img src={flight.airline_logo} className='airline-logo' />
										</div>
										<div className=''>{'Simrik Air'}</div>
									</div>
									<div className='col-3 p-0 text-center'>
										<i className='fas fa-plane fa-2x departure text-primary' />
										<div>{`${moment(flight.flight_date).format('Do MMMM, YYYY')}`}</div>
									</div>
									<div className='col p-0 text-right'>
										Class: {flight.class_code} |{' '}
										<span className=''> {isRefundable(flight.refundable)}</span>
										<div>Check-in Baggage: {flight.free_baggage}</div>
										<div>Flight: {flight.flight_no}</div>
									</div>
								</div>
								<hr />
								<div className='body'>
									<div className='row align-items-center'>
										<span className='col p-0'>
											{flight.departure_flight_time}
											<div className='text-bold'>{flight.departure}</div>
										</span>
										<span className='text-small text-muted text-center col-3 p-0'>
											<i className='fas fa-clock text-primary' />
											<div>{flight.duration} min</div>
										</span>
										<span className='text-right col p-0'>
											{flight.arrival_time}
											<div className='text-bold'>{flight.arrival}</div>
										</span>
									</div>
									<div className='text-center text-small text-muted' />
									<hr />
								</div>
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
										<span className='text-small'>{flight.pnr_no}</span>
									</div>
									<div>
										<span className='text-bold'>Invoice:&nbsp;</span>
										<span className='text-small'>{flight.booking_transaction.idx}</span>
									</div>
									<div>
										<span className='text-bold'>Reporting Time:&nbsp;</span>
										<span className='text-small'>
											{moment(flight.flight_date).format('D MMMM, YYYY')}
										</span>
									</div>
									<div>
										<span className='text-center p-3'>
											<div className='text-bold'>
												Total Fare: {flight.Currency} {flight.total_fare}
											</div>
											<div className='text-small text-muted'>
												({flight.no_of_adult} Adult
												{ifNotZero(flight.no_of_child, `, ${flight.no_of_child} Child`)})
											</div>
										</span>
										{/* <ul className='text-muted text-small'>
											{flight.no_of_adult > 0 && (
												<li>
													Base Fare (1 Adult): {flight.Currency} {flight.adult_fare} x ({flight.no_of_adult})
												</li>
											)}
											{flight.no_of_child > 0 && (
												<li>
													Base Fare (1 Child): {flight.Currency} {flight.child_fare} x ({flight.no_of_child})
												</li>
											)}
											<li>
												Fuel Surcharge: {flight.Currency} {flight.fuel_surcharge} x ({flight.no_of_adult}
												{ifNotZero(flight.no_of_child, ` + ${flight.no_of_child}`)})
											</li>
											<li>
												Tax: {flight.Currency} {flight.tax} x ({flight.no_of_adult}
												{ifNotZero(flight.no_of_child, ` + ${flight.no_of_child}`)})
											</li>
										</ul> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div className='widget'>
					<div className='card'>
						<h3 className='card-header'>Fare Details</h3>
						<div className='card-body'>
							<div>
								<span className='text-center p-3'>
									<div className='text-bold'>
										Total Fare: {flight.Currency} {flight.total_fare}
									</div>
									<div className='text-small text-muted'>
										({flight.no_of_adult} Adult
										{ifNotZero(flight.no_of_child, `, ${flight.no_of_child} Child`)})
									</div>
								</span>
								<ul className='text-muted text-small'>
									{flight.no_of_adult > 0 && (
										<li>
											Base Fare (1 Adult): {flight.Currency} {flight.adult_fare} x ({flight.no_of_adult})
										</li>
									)}
									{flight.no_of_child > 0 && (
										<li>
											Base Fare (1 Child): {flight.Currency} {flight.child_fare} x ({flight.no_of_child})
										</li>
									)}
									<li>
										Fuel Surcharge: {flight.Currency} {flight.fuel_surcharge} x ({flight.no_of_adult}
										{ifNotZero(flight.no_of_child, ` + ${flight.no_of_child}`)})
									</li>
									<li>
										Tax: {flight.Currency} {flight.tax} x ({flight.no_of_adult}
										{ifNotZero(flight.no_of_child, ` + ${flight.no_of_child}`)})
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	</React.Fragment>
);

const PassengerDetails = ({flight, canEdit, allSelected, selectPassenger, selectedPassengers}) => (
	<div className='widget'>
		<div className='card'>
			<div className='card-header'>
				<div className='d-flex justify-content-between'>
					<h3 className='title'>Passenger Details</h3>
					<Link
						to={{
							pathname: `/passengers/${flight.ruid}/edit`,
							state: {
								passengers: flight.passengers,
								booking: flight
							}
						}}
						className='btn btn-outline-primary'
					>
						MODIFY
					</Link>
				</div>
			</div>

			<div className='card-body'>
				<div className='d-flex p-2'>
					{canEdit &&
					!allSelected && (
						<span
							className='text-primary btn btn-primary bg-none ml-auto'
							onClick={() =>
								selectPassenger(
									...flight.passengers.map((passenger) => {
										return passenger.id;
									})
								)}
						>
							Select All
						</span>
					)}
					{canEdit &&
					allSelected && (
						<span
							className='text-primary btn btn-primary bg-none ml-auto'
							onClick={this.deselctAllPassenger}
						>
							Deselect
						</span>
					)}
				</div>
				<div className='passenger-details container p-0'>
					<table className='table table-striped'>
						<thead>
							<tr className=''>
								<th>Name</th>
								<th>Type</th>
								<th>Nationality</th>
								{canEdit && <th> Cancel </th>}
							</tr>
						</thead>
						<tbody>
							{flight.passengers !== undefined &&
								flight.passengers.map((passenger) => {
									return (
										<tr className=''>
											<td className=''>
												{passenger.title} {passenger.first_name} {passenger.last_name}
											</td>
											<td className=''>{passenger.passenger_type}</td>
											<td className=''>{passenger.nationality}</td>
											{canEdit && (
												<td>
													<input
														type='checkbox'
														onChange={() => selectPassenger(passenger.id)}
														label='All'
														checked={selectedPassengers.indexOf(passenger.id) !== -1}
													/>
												</td>
											)}
										</tr>
									);
								})}
						</tbody>
					</table>
					<div className='d-flex p-2'>
						{selectedPassengers.length > 0 && (
							<span
								className='btn btn-outline-danger ml-auto'
								onClick={() => this.cancelUserRequest(selectedPassengers)}
							>
								Cancel ({selectedPassengers.length}) Ticket
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
);

class BookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			departing_flight: {
				passengers: []
			},
			arriving_flight: {
				passengers: []
			},
			canEdit: false,
			selectedPassengers: [],
			redirectToPayment: false
		};
	}

	toggleEdit = () => {
		this.setState((prevState) => ({
			canEdit: !prevState.canEdit
		}));
	};

	selectPassenger = (passenger) => {
		this.setState((prevState) => ({
			selectedPassengers: [...new Set([...prevState.selectedPassengers, passenger])]
		}));
	};

	deselectAllPassenger = () => {
		this.setState({
			selectedPassengers: []
		});
	};

	allSelected = () => {};

	cancelUserRequest(passengers) {
		cancelUserTickets(passengers)
			.then((repsonse) => {
				// console.log(repsonse);
				swal({
					title: 'Tickets cancellation!',
					text: 'Your ticket cancellation is in process',
					icon: 'success',
					button: 'Continue!'
				});
				history.push('/bookings');
			})
			.catch((error) => {
				// console.log(error);
				console.log(' User cancel ticket error', error);
			});
	}

	componentDidMount() {
		getBookingDetails(this.props.match.params.id)
			.then((response) => {
				console.log('Booking DAtA', response.data);
				this.setState({
					departing_flight: {...response.data.departing_flight},
					arriving_flight: response.data.arriving_flight ? response.data.arriving_flight : {}
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' Booking list fetch error', error);
			});
	}

	onContinueToPayment = () => {
		this.setState({
			redirectToPayment: true
		});
	};

	render() {
		const {departing_flight, arriving_flight, canEdit, selectedPassengers, redirectToPayment} = this.state;
		const flight = {};

		if (redirectToPayment) {
			return (
				<PaymentForm
					transaction={departing_flight.booking_transaction}
					idx={departing_flight.booking_transaction.idx}
				/>
			);
		}

		return (
			<div className='container bg-white'>
				<div className='d-flex justify-content-between p-2'>
					<h3 className='text-primary'> Booking Details </h3>
				</div>
				{departing_flight.flight_no && <FlightDetails flight={departing_flight} />}
				{arriving_flight.flight_no && <FlightDetails flight={arriving_flight} />}

				<div className='row'>
					<div className='col-12 col-md-9'>
						<PassengerDetails
							flight={departing_flight}
							canEdit={canEdit}
							allSelected={departing_flight.passengers.length == selectedPassengers.length}
							selectPassenger={(p) => this.selectPassenger(p)}
							selectedPassengers={selectedPassengers}
						/>
					</div>
				</div>
				<div className='text-center p-4'>
					<span onClick={this.onContinueToPayment} className='btn btn-primary'>
						Continue to Payment
					</span>
					<Timer
						ttlTime={getDuration(departing_flight.remaining_time)}
						onTimeOut={() => console.log('Abcd')}
					/>
				</div>
			</div>
		);
	}
}
export default BookingDetails;
