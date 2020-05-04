import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FlightDetails from './FlightDetails';
import {connect} from 'react-redux';
import PassengerDetails from './PassengerDetails';
import {Timer} from '../shared';
import {PaymentForm} from '../payments';
import {Link} from 'react-router-dom';
import {getDuration} from '../../helpers';
import history from '../../history';
import {makePayment} from '../../api/paymentApi';

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

	onTimeOut = () => {
		swal({
			title: 'Time Ended!',
			text: 'Your flight Reservation time has ended. Please try Again',
			icon: 'warning',
			button: 'Try Again!'
		}).then((value) => {
			history.push('/');
		});
	};

	componentDidMount() {}

	render() {
		const {passengers, toggle, booking, transaction, selectedOutboundFlight, selectedInboundFlight} = this.props;
		const {redirectToPayment} = this.state;
		console.log('RESERVATION TIMEs', booking.reservation_time, getDuration(booking.reservation_time));
		if (redirectToPayment) {
			// return <PaymentForm idx={transaction.idx} />;
			makePayment(transaction)
				.then((response) => {
					history.push(`/payment_success/${booking.ruid}`);
				})
				.catch((error) => console.log('Payment Error', error));
		}

		return (
			<div className='container py-3 px-md-3'>
				<div className='d-flex justify-content-between'>
					<span className='text-bold'>Flight Details</span>
					<span className='text-danger'>
						{this.props.ttlTime > 0 && <Timer ttlTime={getDuration(booking.reservation_time)} />}
					</span>
				</div>
				<div className='card mt-3'>
					<div className='card-body'>
						<h3 className='title'>Departure</h3>
						<FlightDetails flight={selectedOutboundFlight} />
					</div>
				</div>

				{selectedInboundFlight !== null && (
					<div className='card mt-3'>
						<div className='card-body'>
							<h3 className='title'>Arrival</h3>
							<FlightDetails flight={selectedInboundFlight} />
						</div>
					</div>
				)}
				<div className='card mt-3'>
					<div className='card-body'>
						<div className='d-flex justify-content-between'>
							<h3 className='title'>Passenger Details</h3>
							<Link
								to={{
									pathname: `/passengers/${booking.ruid}/edit`,
									state: {
										passengers: passengers,
										booking: booking
									}
								}}
								className='btn btn-outline-primary'
							>
								MODIFY
							</Link>
						</div>
						<PassengerDetails passengers={passengers} />
					</div>
				</div>

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
		selectedOutboundFlight: flightStore.selectedOutboundFlight,
		selectedInboundFlight: flightStore.selectedInboundFlight
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinalBookingDetails);
