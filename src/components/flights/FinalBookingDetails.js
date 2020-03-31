import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FlightDetails from './FlightDetails';
import {connect} from 'react-redux';
import PassengerDetails from './PassengerDetails';
import {Timer} from '../shared';
import {PaymentForm} from '../payments';
import {Link} from 'react-router-dom';

class FinalBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.state = {
			redirectToPayment: false
		};
	}

	submit() {
		this.setState({
			redirectToPayment: true
		});
	}

	componentDidMount() {}

	render() {
		const {passengers, toggle, booking, transaction, selectedOutboundFlight} = this.props;
		const {redirectToPayment} = this.state;

		if (redirectToPayment) {
			return <PaymentForm idx={transaction.idx} value='flightbooking' />;
		}

		return (
			<div className='passenger-details container p-3 bg-white'>
				{this.props.ttlTime > 0 && <Timer />}
				<div className='p-2'>
					<Link to={`/booking/${booking.ruid}/edit`} className='btn bg-none text-secondary float-right'>
						MODIFY
					</Link>
				</div>
				<span className='text-bold'>Flight Details</span>
				<div className='container'>
					<FlightDetails flight={selectedOutboundFlight} />
				</div>
				<span className='text-bold'>Passenger Details</span>
				<PassengerDetails passengers={passengers} />

				<div className='text-center m-1'>
					<button
						type='button'
						className='btn btn-primary'
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
		booking: bookingStore.booking[0],
		transaction: bookingStore.booking[0].booking_transaction,
		ttlTime: flightStore.ttlTime,
		selectedOutboundFlight: flightStore.selectedOutboundFlight
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinalBookingDetails);
