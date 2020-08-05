import React, {Component, Fragment} from 'react';

import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, DateTimePicker, Badge} from '../shared';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Input, Form, Checkbox, TextArea} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import PaymentForm from '../payments/PaymentForm';
import {checkOutWithKhalti, downloadTicket, pick} from '../../helpers';
import {showUserRentalBooking} from '../../api/carBookingApi';
import {fetchTicket} from '../../api/flightApi';
import KhaltiCheckout from 'khalti-checkout-web';

class CarBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carBooking: {},
			showPaymentPage: false,
			loading: false,
			showKhaltiPaymentPage: false
		};
	}

	componentDidMount() {
		this.fetchUserBookingDetails();
	}

	fetchUserBookingDetails() {
		showUserRentalBooking(this.props.match.params.booking_idx).then((response) => {
			console.log('Car Booking Details', response.data);
			this.setState({
				carBooking: response.data
			});
		});
	}

	paymentPage() {
		this.setState({
			showPaymentPage: true
		});
	}

	checkout = (booking) => {
		checkOutWithKhalti({
			productIdentity: booking.idx,
			productName: 'RENTAL',
			productUrl: `https://visitallnepal.com/admin/car_bookings/${booking.idx}`,
			amount: booking.amount
		});
	};

	download = (idx) => {
		fetchTicket(idx).then((response) => {
			this.setState({
				loading: false
			});
			downloadTicket(response.data);
		});
	};

	render() {
		const {carBooking, loading} = this.state;
		if (this.state.showPaymentPage) {
			return <PaymentForm transaction={carBooking.booking_transaction} idx={carBooking.idx} />;
		}

		if (this.state.showKhaltiPaymentPage) {
			return <KhaltiForm transaction={carBooking.booking_transaction} idx={carBooking.idx} />;
		}

		return (
			<div className='ui segment container'>
				<div className='ui internally celled stackable grid'>
					<div className='row'>
						<div className='eight wide column section'>
							<h3 className='ui header'> Inquiry Details </h3>
							<div className='ui grid'>
								{Object.entries(
									pick(carBooking, ['source', 'destination', 'no_of_pax', 'trip_type', 'no_of_days'])
								).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
							</div>
						</div>

						<div className='eight wide column'>
							<h3 className='ui header'>Car Booking Info</h3>
							<div className='ui grid'>
								{Object.entries(
									pick(carBooking, ['pickup_date', 'drop_off_date'])
								).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>
											{moment(value).format('D MMMM, YYYY HH:mm')}
										</div>
									</div>
								))}
								{Object.entries(
									pick(carBooking, ['pickup_location', 'drop_off_location'])
								).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
								{Object.entries(pick(carBooking, ['first_name', 'last_name'])).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
								{carBooking.flight_no && (
									<Fragment>
										<div className='row'>
											<div className='eight wide column'>Flight Number</div>
											<div className='eight wide column'> {carBooking.flight_no}</div>
										</div>
										<div className='row'>
											<div className='eight wide column'>Flight Time</div>
											<div className='eight wide column'>
												{moment(carBooking.flight_time).format('D MMMM, YYYY')}
											</div>
										</div>
									</Fragment>
								)}
								<div className='row text-bold text-danger'>
									<div className='eight wide column'>Amount:</div>
									<div className='eight wide column'> {carBooking.amount}</div>
								</div>
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='eight wide column'>
							<h3 className='ui header'>Contact Details</h3>
							<div className='ui grid'>
								{Object.entries(
									pick(carBooking, ['contact_name', 'contact_email, mobile_no'])
								).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
							</div>
						</div>
						<div className='eight wide column'>
							<h3 className='ui header'>Other Details</h3>
							<div className='ui grid'>
								{Object.entries(pick(carBooking, ['car_type'])).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
								<div className='row'>
									<div className='eight wide column'>Booking Status:</div>
									<div className='eight wide column'>
										<Badge type={carBooking.status}>{carBooking.status}</Badge>
									</div>
								</div>
								<div className='row'>
									<div className='eight wide column'>IDx:</div>
									<div className='eight wide column'>{carBooking.idx}</div>
								</div>
							</div>
						</div>
					</div>
					<div className='text-center'>
						{carBooking.status === 'processing' && (
							<Fragment>
								<div className='btn btn-primary' onClick={() => this.paymentPage()}>
									Continue to Payment
								</div>

								<div
									className='btn btn-primary text-primary bg-none'
									id='payment-button'
									onClick={() => this.checkout(carBooking)}
								>
									Pay with khalti
								</div>
							</Fragment>
						)}
					</div>

					{carBooking.status === 'verified' && (
						<span className='text-center py-4'>
							<Button
								primary
								loading={loading}
								className='btn btn-primary btn-large '
								onClick={() => this.download(carBooking.booking_transaction.idx)}
							>
								Download ticket
							</Button>
						</span>
					)}
				</div>
			</div>
		);
	}
}

export default CarBookingDetails;
