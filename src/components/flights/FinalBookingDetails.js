import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getFlights} from '../../api/flightApi';
import FlightList from './FlightList';
import FlightDetails from './FlightDetails';
import FlightCombinedDetails from './FlightCombinedDetails';
import {createBooking, submitPassengers} from '../../api/flightApi';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setBooking} from '../../redux/actions/bookingActions';
import PassengerDetails from './PassengerDetails';
import ErrorMessage from '../ErrorMessage';
import swal from 'sweetalert';
import store from '../../redux/store';
import {newPayment} from '../../api/paymentApi';

class FinalBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
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
			});
	}

	componentDidMount() {}

	render() {
		const {passengers, toggle} = this.props;
		console.log(passengers);
		return (
			<div className='passenger-details container p-0'>
				<div className='p-2'>
					<i
						className='icon-circle-cross text-normal float-right'
						onClick={() => {
							toggle();
						}}
					/>
				</div>
				<span class='text-bold'>Flight Details</span>
				<FlightDetails flight={this.props.selectedOutboundFlight} />
				<span class='text-bold'>Passenger Details</span>
				<PassengerDetails passengers={passengers} />

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
		child: flightStore.searchDetails.intChild,
		ttlTime: flightStore.ttlTime
	};
};

const mapDispatchToProps = {
	setBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalBookingDetails);
