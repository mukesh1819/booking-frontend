import React, {Component, Fragment} from 'react';

import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, DateTimePicker, RemarksForm} from '../shared';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Input, Form, Checkbox, TextArea} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import {createCarBooking, updateCarBooking} from '../../api/carBookingApi';
import {connect} from 'react-redux';

class CarBookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		var date = new Date();
		date.setDate(date.getDate() + 2);
	}

	render() {
		const {car_inquiry_idx} = this.props.match.params != null ? this.props.match.params : {car_inquiry_idx: null};
		const {car_idx} = this.props.match.params != null ? this.props.match.params : {car_idx: null};
		const {carBooking} = this.props.location.state != null ? this.props.location.state : {carBooking: {}};
		const {inquiry, currentUser, car} = this.props;
		const BookingSchema = yup.object().shape({
			contact_name: textValidate(yup).required('Required'),
			contact_email: yup.string().email().required('Required'),
			mobile_no: numberValidate(yup).required('Required'),
			pickup_time: yup.date().required('Required').default(function() {
				return new Date();
			}),
			pickup_location: yup.string().required('Required'),
			drop_off_time: yup.date().required('Required').default(function() {
				return new Date();
			}),
			drop_off_location: yup.string().required('Required'),
			user_remarks: yup.string()
			// flight_no: yup.string()
		});

		const bookingDetails = {
			contact_name: carBooking.idx ? carBooking.contact_name : currentUser.name,
			contact_email: carBooking.idx ? carBooking.contact_email : currentUser.email,
			mobile_no: carBooking.idx ? carBooking.mobile_no : currentUser.phone_number,
			car_inquiry_idx: carBooking.car_inquiry != null ? carBooking.car_inquiry.idx : car_inquiry_idx,
			pickup_time:
				carBooking.pickup_date == null ? new Date(inquiry.start_date) : new Date(carBooking.pickup_date),
			amount: carBooking.amount * (carBooking.car_inquiry != null ? carBooking.car_inquiry.no_of_days : 1),
			pickup_location: inquiry.airport_pickup ? inquiry.source : carBooking.pickup_location,
			drop_off_time:
				carBooking.drop_off_date == null
					? addDays(inquiry.start_date, inquiry.no_of_days)
					: new Date(carBooking.drop_off_date),
			drop_off_location: inquiry.airport_dropoff ? inquiry.destination : carBooking.drop_off_location,
			user_remarks: carBooking.user_remarks,
			flight_date: carBooking.flight_date == null ? new Date() : new Date(carBooking.flight_date),
			flight_no: carBooking.flight_no,
			car_idx: car_idx
		};

		return (
			<div className='container bg-white'>
				{carBooking.idx == null && (
					<div className='ui info message fluid'>Estimated Price: {car.price * inquiry.no_of_days} / day</div>
				)}
				<Formik
					initialValues={bookingDetails}
					validationSchema={BookingSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						// setSubmitting(false);
						// console.log(values);
						if (carBooking.idx != null) {
							updateCarBooking(carBooking.idx, values)
								.then((response) => {
									setSubmitting(false);
									swal({
										title: 'Car Booking updated!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue'
									}).then((value) => {
										history.push(`/admin/car_bookings/${carBooking.idx}`);
									});
								})
								.catch((error) => {
									console.log('Update Booking Error', error);
								});
						} else {
							createCarBooking(values)
								.then((response) => {
									setSubmitting(false);
									swal({
										title: 'Yayy!! Your booking has been processed. We will get back to you asap with the confirmation!!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue'
									}).then((value) => {
										history.push('/');
									});
								})
								.catch((error) => {
									console.log('Booking create error', error);
								});
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						setFieldValue
						/* and other goodies */
					}) => (
						<div className='inquiry-form'>
							<div className='row'>
								<div className='col-12'>
									{/* <h3>
										Kindly submit the query form below to book your trip and we will contact you
										with the confirmed itinerary.
									</h3> */}
								</div>
							</div>
							<form onSubmit={handleSubmit}>
								<div className='input-section padded bg-white'>
									<div className='row'>
										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<Form.Field>
													<label>Contact name</label>
													<Form.Input
														fluid
														icon='fas fa-user'
														iconPosition='left'
														name='contact_name'
														className=''
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.contact_name}
														placeholder='Name'
													/>
												</Form.Field>
												<ErrorMessage name='contact name' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<Form.Field>
													<label>Email Address</label>
													<Form.Input
														fluid
														icon='fas fa-envelope'
														iconPosition='left'
														name='contact_email'
														className=''
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.contact_email}
														placeholder='Email Address'
													/>
												</Form.Field>
												<ErrorMessage name='contact_email' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<Form.Field>
													<label>Mobile Number</label>
													<Input
														fluid
														name='mobile_no'
														className='semantic-input-group'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.mobile_no}
														placeholder='Mobile Number'
													/>
												</Form.Field>
												<ErrorMessage name='mobile_no' />
											</div>
										</div>

										{(inquiry.trip_type == 'Airport Pickup' ||
											inquiry.trip_type == 'Airport Dropoff') && (
											<Fragment>
												<div className='col-12 col-md-6'>
													<div className='field-box col'>
														<label className='d-block'>Flight Date</label>
														<DateTimePicker
															name='flight_date'
															className=' w-100'
															type='date'
															date={values.flight_date}
															minDate={new Date()}
															maxDate={addDays(new Date(), 365)}
															onBlur={handleBlur}
															onChange={(date) => {
																setFieldValue('flight_date', date);
															}}
															value={values.flight_date}
															placeholder='Flight Date'
															showTimeSelectOnly
														/>
														<ErrorMessage name='flight_date' />
													</div>
												</div>

												<div className='col-12 col-md-6'>
													<div className='field-box'>
														<Form.Field>
															<label>Flight Number</label>
															<Form.Input
																fluid
																icon='fas fa-user'
																iconPosition='left'
																name='flight_no'
																className=''
																onBlur={handleBlur}
																onChange={handleChange}
																value={values.flight_no}
																placeholder='Flight no'
															/>
														</Form.Field>
														<ErrorMessage name='flight_no' />
													</div>
												</div>
											</Fragment>
										)}

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label className='d-block'>Pick-up time</label>
												<DateTimePicker
													name='pickup_time'
													className=' w-100'
													type='date'
													date={values.pickup_time}
													minDate={new Date()}
													maxDate={addDays(new Date(), 365)}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('pickup_time', date)}
													value={values.pickup_time}
													placeholder='Pickup time'
												/>
												<ErrorMessage name='pickup_time' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<Form.Field>
													<label>Pick-up location</label>
													<Form.Input
														fluid
														icon='fas fa-user'
														iconPosition='left'
														name='pickup_location'
														className=''
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.pickup_location}
														placeholder='Pick-up location'
													/>
												</Form.Field>
												<ErrorMessage name='pickup_location' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label className='d-block'>Drop-off time</label>
												<DateTimePicker
													name='drop_off_time'
													className=' w-100'
													type='date'
													date={values.drop_off_time}
													minDate={new Date()}
													maxDate={addDays(new Date(), 365)}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('drop_off_time', date)}
													value={values.drop_off_time}
													placeholder='Drop-off time'
												/>
												<ErrorMessage name='drop_off_time' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<Form.Field>
													<label>Drop-off location</label>
													<Form.Input
														fluid
														icon='fas fa-user'
														iconPosition='left'
														name='drop_off_location'
														className=''
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.drop_off_location}
														placeholder='Drop-off location'
													/>
												</Form.Field>
												<ErrorMessage name='drop_off_location' />
											</div>
										</div>

										{currentUser.role === 'Admin' && (
											<React.Fragment>
												<div className='col-12 col-md-6'>
													<div className='field-box'>
														<label>Amount</label>

														<Field
															name='amount'
															className='form-control'
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.amount}
														/>

														<ErrorMessage name='amount' />
													</div>
												</div>

												<div className='col-12 col-md-6'>
													<div className='field-box'>
														<label htmlFor='' />
														{/* <TextArea
															className='form-control'
															name='user_remarks'
															placeholder='Queries if any....'
															onBlur={handleBlur}
															onChange={(e, data) => {
																setFieldValue(`user_remarks`, e.target.value);
															}}
															value={values.user_remarks}
														/> */}
														<ErrorMessage name='user_remarks' />

														<RemarksForm
															remarks={values.user_remarks}
															onSubmit={(value) => setFieldValue(`user_remarks`, value)}
														/>
													</div>
												</div>
											</React.Fragment>
										)}
									</div>
								</div>

								<div className='traveller-details '>
									<div className='input-section padded bg-white'>
										<div className='row'>
											<div className='col-12'>
												<div className='text-center'>
													<button
														className='btn btn-primary m-2'
														type='submit'
														disabled={isSubmitting}
													>
														{carBooking.idx ? 'Update' : 'Submit'}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = ({rentalStore, userStore}) => {
	return {
		inquiry: rentalStore.carInquiryDetails,
		car: rentalStore.selectedCar,
		currentUser: userStore.currentUser
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarBookingForm);
