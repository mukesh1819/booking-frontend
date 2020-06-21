import React, {Component} from 'react';

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
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import {createCarBooking, updateCarBooking, showUserRentalBooking} from '../../api/carBookingApi';

class CarBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carBooking: {}
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

	render() {
		const {carBooking} = this.state;
		return (
			<div className='container partner-profile'>
				<div className='card'>
					<div className='card-body'>
						<div className='row'>
							<div className='col-12 col-md-3 offset-md-2 '>
								<div className=''>
									<i className='fas fa-car fa-3x' />
									<h3 className='title'>
										{carBooking.first_name}&nbsp;
										{carBooking.last_name}
									</h3>
									<div className=''>
										Status:&nbsp;<Badge type={carBooking.status}>{carBooking.status}</Badge>
									</div>
								</div>
							</div>

							<div className='col-12 col-md-5'>
								<div className='list-view'>
									<h3 className='title'>Car Booking Details</h3>
									<div className='list'>
										<span className='label'>Pickup Time</span>
										<span className='value'>{carBooking.pickup_date}</span>
									</div>
									<div className='list'>
										<span className='label'>Drop off Time</span>
										<span className='value'>{carBooking.drop_off_date}</span>
									</div>

									<div className='list'>
										<span className='label'>Pickup Location</span>
										<span className='value'>{carBooking.pickup_location}</span>
									</div>

									<div className='list'>
										<span className='label'>Drop off Location</span>
										<span className='value'>{carBooking.drop_off_location}</span>
									</div>
								</div>

								<div className='list-view'>
									<h3 className='title'>Contact Details</h3>
									<div className='list'>
										<span className='label'>Name</span>
										<span className='value'>{carBooking.contact_name}</span>
									</div>
									<div className='list'>
										<span className='label'>Email</span>
										<span className='value'> {carBooking.contact_email}</span>
									</div>
									<div className='list'>
										<span className='label'>Mobile No</span>
										<span className='value'>{carBooking.mobile_no}</span>
									</div>
								</div>

								{carBooking.flight_no && (
									<div className='list-view'>
										<h3 className='title'>Flight Details</h3>
										<div className='list'>
											<span className='label'>Flight Number</span>
											<span className='value'>{carBooking.flight_no}</span>
										</div>
										<div className='list'>
											<span className='label'>Flight Time</span>
											<span className='value'> {carBooking.flight_time}</span>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
					{carBooking.status === 'processing' && <span className='btn btn-primary'>Continue to Payment</span>}
					{carBooking.status === 'verified' && <span className='btn btn-primary'>Download ticket</span>}
				</div>
			</div>
		);
	}
}

export default CarBookingDetails;
