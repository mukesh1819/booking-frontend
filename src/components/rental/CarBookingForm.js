import React, {Component} from 'react';

import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, DateTimePicker} from '../shared';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Input, Form, Checkbox, TextArea} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import {createCarBooking, updateCarBooking} from '../../api/carBookingApi';

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
		const BookingSchema = yup.object().shape({
			contact_name: textValidate(yup).required('Required'),
			contact_email: yup.string().email().required('Required'),
			mobile_no: numberValidate(yup).required('Required'),
			pickup_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			pickup_location: yup.string().required('Required'),
			drop_off_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			drop_off_location: yup.string().required('Required'),
			remarks: yup.string().required('Required'),
			flight_no: yup.string()
		});

		const bookingDetails = {
			contact_name: carBooking.contact_name,
			contact_email: carBooking.contact_email,
			mobile_no: carBooking.mobile_no,
			car_inquiry_idx: carBooking.car_inquiry != null ? carBooking.car_inquiry.idx : car_inquiry_idx,
			pickup_date: carBooking.pickup_date == null ? new Date() : new Date(carBooking.pickup_date),
			amount: carBooking.amount,
			pickup_location: carBooking.pickup_location,
			drop_off_date: carBooking.pickup_date == null ? new Date() : new Date(carBooking.pickup_date),
			drop_off_location: carBooking.pickup_location,
			remarks: carBooking.remarks,
			flight_date: carBooking.flight_date == null ? new Date() : new Date(carBooking.flight_date),
			flight_no: carBooking.flight_no,
			car_idx: car_idx
		};

		return (
			<div className='container bg-white'>
				<Formik
					initialValues={bookingDetails}
					validationSchema={BookingSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						setSubmitting(false);
						// console.log(values);
						if (carBooking.idx != null) {
							updateCarBooking(carBooking.idx, values)
								.then((response) => {
									swal({
										title: 'Car Booking updated!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue'
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
										title: 'Car Booking created!',
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

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label className='d-block'>Pick-up date</label>
												<DateTimePicker
													name='pickup_date'
													className=' w-100'
													type='date'
													date={values.pickup_date}
													minDate={new Date()}
													maxDate={addDays(new Date(), 365)}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('pickup_date', date)}
													value={values.pickup_date}
													placeholder='Pickup date'
													showTimeSelectOnly
												/>
												<ErrorMessage name='pickup_date' />
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
												<label className='d-block'>Drop-off date</label>
												<DateTimePicker
													name='drop_off_date'
													className=' w-100'
													type='date'
													date={values.drop_off_date}
													minDate={new Date()}
													maxDate={addDays(new Date(), 365)}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('drop_off_date', date)}
													value={values.drop_off_date}
													placeholder='Drop-off date'
												/>
												<ErrorMessage name='drop_off_date' />
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

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label htmlFor=''>Remarks</label>
												<TextArea
													className='form-control'
													name='remarks'
													placeholder='remarks'
													onBlur={handleBlur}
													onChange={(e, data) => {
														setFieldValue(`remarks`, e.target.value);
													}}
													value={values.remarks}
												/>
												<ErrorMessage name='remarks' />
											</div>
										</div>
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
														{carBooking.id ? 'Update' : 'Submit'}
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

export default CarBookingForm;
