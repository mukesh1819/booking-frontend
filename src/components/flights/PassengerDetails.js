import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getFlights} from '../../api/flightApi';
import FlightList from './FlightList';
import {createBooking, submitPassengers} from '../../api/flightApi';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setBooking} from '../../redux/actions/bookingActions';
import ErrorMessage from '../ErrorMessage';
import swal from 'sweetalert';
import store from '../../redux/store';
import {newPayment} from '../../api/paymentApi';

class PassengerDetails extends Component {
	constructor(props) {
		super(props);
	}

	submit() {
		createBooking({
			booking: {
				outbound_flight: this.props.selectedOutboundFlight,
				inbound_flight: this.props.selectedInboundFlight,
				passengers_attributes: this.props.passengers
			}
		})
			.then((response) => {
				swal({
					title: 'Booking Created!',
					text: 'Continue to payment!',
					icon: 'success',
					button: 'Continue!'
				});
				this.props.setBooking(response.data);
				newPayment(response.data[0].booking_transaction.idx);
			})
			.catch((error) => {
				console.log(error);
			})
			.bind(this);
	}

	render() {
		const {passengers, toggle} = this.props;
		console.log(passengers);
		return (
			<div className='passenger-details'>
				<div className='p-2'>
					<i
						className='icon-circle-cross float-right'
						onClick={() => {
							toggle();
						}}
					/>
					<span class='text-bold'>Passenger Details</span>
				</div>
				<table class='table'>
					<thead>
						<tr className='text-center'>
							<th>Name</th>
							<th>Type</th>
							<th>Nationality</th>
						</tr>
					</thead>
					<tbody>
						{passengers.map((passenger) => {
							return (
								<tr className='text-center'>
									<td className=''>
										{passenger.title} {passenger.first_name} {passenger.last_name}
									</td>
									<td className=''>{passenger.passenger_type}</td>
									<td className=''>{passenger.nationality}</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className='text-center m-1'>
					<button
						type='button'
						class='btn btn-primary'
						onClick={() => {
							this.submit();
						}}
					>
						Continue to Payment
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({flightStore, bookingStore}) => {
	return {
		selectedInboundFlight: flightStore.selectedInboundFlight,
		selectedOutboundFlight: flightStore.selectedOutboundFlight,
		booking: bookingStore.booking,
		adult: flightStore.searchDetails.intAdult,
		child: flightStore.searchDetails.intChild
	};
};

const mapDispatchToProps = {
	setBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerDetails);
