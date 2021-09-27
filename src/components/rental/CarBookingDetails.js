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
import {checkOutWithKhalti, checkOutWithEsewa, downloadTicket, pick} from '../../helpers';
import {showUserRentalBooking} from '../../api/carBookingApi';
import {fetchTicket} from '../../api/flightApi';
import KhaltiCheckout from 'khalti-checkout-web';
import KhaltiLogo from '../../images/khalti-logo.png';
import EsewaLogo from '../../images/esewa-logo.png';
import CardLogo from '../../images/card-logo.png';
import styles from '../../styles/payment.module.css';
import '../../styles/pages.css';

class CarBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carBooking: {},
			showPaymentPage: false,
			loading: false,
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

	checkout = (booking, gateway) => {
		const method = {
			"KHALTI": checkOutWithKhalti,
			"ESEWA": checkOutWithEsewa
		}

		method[gateway]({
			productIdentity: booking.booking_transaction.idx,
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

		const inquiryInfo = pick(carBooking.car_inquiry, [
			'source',
			'destination',
			'no_of_pax',
			'no_of_days',
			'car_type',
			'trip_type',
			'start_date'
		]);

		const booleans = pick(carBooking.car_inquiry, ['within_city']);

		const driverInfo = pick(carBooking, ['driver_name', 'driver_contact', 'car_number', 'car_color']);

		return (
			<React.Fragment>
			<div className='ui segment container'>
				    {/* <div>
						<div class={`${styles.heading} text-center`}>
							<h3 class="ui sub header mt-2">E-ticket</h3>
							<div className={styles.vanLogo}>
							</div>
						</div>
					</div> */}

				<div className={`watermark ui internally celled stackable grid`}>
					<div className='row z-top'>
						<div className='eight wide column section'>
							<h3 className='ui header'> Inquiry Details </h3>
							<div className='ui grid'>
								{Object.entries(inquiryInfo).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
								{Object.entries(booleans).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value ? 'Yes' : 'No'}</div>
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

							<div className={`${styles.paymentActions} text-center mt-4`}>
								{carBooking.status === 'processing' && (
									<Fragment>
										<h5 className="font-weight-bold">CONTINUE TO PAYMENT</h5>
										<div className={`${styles.paymentBody}`}>
											{/* <div className={`${styles.action}`} onClick={() => this.paymentPage()}>
												<img src={CardLogo} className='logo' style={{width: '65px'}}/>
												<div className={`${styles.label} text-primary`}>Pay with Card</div>
											</div> */}

											<div className={`${styles.action}`} onClick={() => this.checkout(carBooking, "KHALTI")}>
												<img src={KhaltiLogo} className='logo' />
												<div className={`${styles.label} text-primary`}>Pay with Khalti</div>
											</div>

											{/* <div className={`${styles.action}`} onClick={() => this.checkout(carBooking, "ESEWA")}>
												<img src={EsewaLogo} className='logo' />
												<div className={`${styles.label} text-primary`}>Pay with Esewa</div>
											</div> */}

										</div>
									</Fragment>
								)}
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

							<h3 className='ui header'> Driver Info </h3>
							{carBooking.is_visible && <div className='ui grid'>
								{Object.entries(driverInfo).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
							</div>}

							{!carBooking.is_visible && (
								<div className='ui message info'>
									Driver info will be visible before 24 hrs of service.
								</div>
							)}
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
				</div>
				
			</div>

			{(carBooking.status == 'completed'  || carBooking.status == 'verified' || carBooking.status == "approved") && (
						<div className='text-center py-4 w-100'>
							<Button
								primary
								loading={loading}
								className='btn btn-primary btn-large '
								onClick={() => this.download(carBooking.booking_transaction.idx)}
							>
								Download ticket
							</Button>
						</div>
					)}
			</React.Fragment>
		);
	}
}

export default CarBookingDetails;
