import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getFlights} from '../../api/flightApi';
import FlightList from './FlightList';
import {createBooking} from '../../api/flightApi';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setBooking} from '../../redux/actions';
import ErrorMessage from '../ErrorMessage';
import FinalBookingDetails from './FinalBookingDetails';
import swal from 'sweetalert';
import {Timer, Accordion} from '../shared';
import {setTTLtime} from '../../redux/actions/flightActions';
import {Dropdown, Input} from 'semantic-ui-react';

import './flights.scss';

import {Formik, Form, Field} from 'formik';

import * as yup from 'yup';
import {passCsrfToken, nationGroup} from '../../helpers';

import {Container, Button, Segment} from 'semantic-ui-react';
import {newPayment} from '../../api/paymentApi';
import {sortObjectBy} from '../../helpers';

class PassengerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			viewDetails: false,
			passengers: []
		};
		this.toggleView = this.toggleView.bind(this);
	}

	toggleView() {
		this.setState(function(prevState) {
			return {viewDetails: !prevState.viewDetails};
		});
	}

	componentDidMount() {
		this.props.setTTLtime(15);
	}

	render() {
		const selectedOutboundFlight = this.props.selectedOutboundFlight;
		const {adult, child, nationality, currentUser, countries} = this.props;
		currentUser.code = currentUser.country;
		const PassengerSchema = yup.object().shape({
			passengers: yup.array().of(
				yup.object().shape({
					title: yup.string().required('Required'),
					first_name: yup.string().required('Required'),
					last_name: yup.string().required('Required'),
					gender: yup.string().required('Required'),
					nationality: yup.string().required('Required')
				})
			),
			user: yup.object().shape({
				name: yup.string().required('Required'),
				code: yup.string().required('Required'),
				phone_number: yup.string().required('Required'),
				email: yup.string().required('Required')
			})
		});
		const passenger = {
			title: 'Mr',
			first_name: '',
			last_name: '',
			passenger_type: '',
			gender: 'M',
			nationality: nationality
		};
		const initialValues = {
			passengers: [],
			user: currentUser
		};

		var i;
		for (i = 0; i < adult; i++) {
			var a = Object.assign({}, passenger);
			a.passenger_type = 'ADULT';
			initialValues.passengers.push(a);
		}

		for (i = 0; i < child; i++) {
			var a = Object.assign({}, passenger);
			a.passenger_type = 'CHILD';
			initialValues.passengers.push(a);
		}

		if (initialValues.passengers.length == 0 || !selectedOutboundFlight) {
			return <Redirect to='/' />;
		}

		var sortedCountries = sortObjectBy(this.props.countries, 'code');

		var content = (
			<Container className='p-0'>
				<Formik
					initialValues={initialValues}
					validationSchema={PassengerSchema}
					onSubmit={(values, {setSubmitting, props}) => {
						createBooking({
							booking: {
								outbound_flight: this.props.selectedOutboundFlight,
								inbound_flight: this.props.selectedInboundFlight,
								passengers_attributes: values.passengers,
								contact_name: values.user.name,
								mobile_no: values.user.phone_number,
								email: values.user.email
							}
						})
							.then((response) => {
								this.setState({
									passengers: values.passengers,
									viewDetails: true,
									user: values.user
								});
								this.props.setBooking(response.data);
							})
							.catch((error) => {
								// console.log(error);
								swal({
									title: 'Booking Error',
									text: 'Could not save your booking. please try again or contact us',
									icon: 'error',
									button: 'Continue!'
								});
							});
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
					}) => (
						<Form className='form-wrap'>
							<h3 className='p-2 title'>Contact Information</h3>
							<div className='input-section'>
								<div className='row'>
									<div className='col'>
										<label>Name</label>
										<Field
											type='text'
											name='user.name'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.user.name}
										/>
										<ErrorMessage name='user.name' />
									</div>

									<div className='col'>
										<label>Phone</label>
										<Input
											label={
												<Dropdown
													className='dropdown'
													defaultValue={values.user.code}
													name='user.code'
													placeholder='Code'
													onBlur={handleBlur}
													onChange={(e, data) => {
														setFieldValue(`user.code`, data.value);
													}}
													value={values.user.code}
													fluid
													search
													selection
													options={sortedCountries.map((country) => {
														return {
															...country,
															value: country.code,
															text: country.code
														};
													})}
												/>
											}
											labelPosition='left'
											placeholder='Contact Phone'
											type='text'
											name='user.phone_number'
											className='semantic-input-group'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.user.phone_number}
										/>
										<ErrorMessage name='user.code' />
										<ErrorMessage name='user.phone_number' />
									</div>

									{/* 
								<div className='col'>
									<label>Code</label>
									<Field
										type='text'
										name='user.code'
										className='form-control'
										onBlur={handleBlur}
										onChange={handleChange}
										as='select'
										value={values.user.code}
									>
										{sortedCountries.map((country) => {
											return (
												<option key={country.id} value={country.country_char}>
													{country.country_code}
												</option>
											);
										})}
									</Field>
								</div> */}

									{/* <div className='col'>
									<label>Contact Phone</label>
									<Field
										type='text'
										name='user.phone_number'
										className='form-control'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.user.phone_number}
									/>
								</div> */}

									<div className='col'>
										<label>Email</label>
										<Field
											type='text'
											name='user.email'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.user.email}
										/>
										<ErrorMessage name='user.email' />
									</div>
								</div>
							</div>
							<h3 className='p-2 title'>Passenger details</h3>

							{values.passengers.map((passenger, index) => {
								return (
									<div className='' key={`${passenger.passenger_type} ${index + 1}`}>
										{/* <Accordion title={`${passenger.passenger_type} ${index + 1}`} /> */}
										<h3 className='p-2'>{`${passenger.passenger_type} ${index + 1}`}</h3>
										<div className='input-section bg-white'>
											<div className='row'>
												<div className='col'>
													<label htmlFor=''>Title</label>
													{/* <Field
														as='select'
														name={`passengers[${index}].title`}
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.passengers[index].title}
													>
														<option value='Mr'> Mr </option>
														<option value='Mrs'> Mrs </option>
													</Field> */}
													<Dropdown
														className='form-control'
														name={`passengers[${index}].title`}
														placeholder=''
														onBlur={handleBlur}
														onChange={(e, data) => {
															setFieldValue(`passengers[${index}].title`, data.value);
														}}
														value={values.passengers[index].title}
														fluid
														search
														selection
														options={[
															{
																key: 'Mr',
																value: 'Mr',
																text: 'Mr'
															},
															{
																key: 'Mrs',
																value: 'Mrs',
																text: 'Mrs'
															},
															{
																key: 'Miss',
																value: 'Miss',
																text: 'Miss'
															}
														]}
													/>
													<span className=''>
														<ErrorMessage name={`passengers[${index}].title`} />
													</span>
												</div>

												<div className='col'>
													<label htmlFor=''>First Name</label>
													<Field
														name={`passengers[${index}].first_name`}
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.passengers[index].first_name}
														placeholder='First Name'
													/>
													<ErrorMessage name={`passengers[${index}].first_name`} />
												</div>
												<div className='col'>
													<label htmlFor=''>Last Name</label>
													<Field
														name={`passengers[${index}].last_name`}
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.passengers[index].last_name}
														placeholder='Last Name'
													/>
													<ErrorMessage name={`passengers[${index}].last_name`} />
												</div>

												<div className='col'>
													<label htmlFor=''>Gender</label>
													{/* <Field
														as='select'
														name={`passengers[${index}].gender`}
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.passengers[index].gender}
													>
														<option value='M'> Male </option>
														<option value='F'> Female </option>
													</Field> */}
													<Dropdown
														className='form-control'
														name={`passengers[${index}].gender`}
														placeholder=''
														onBlur={handleBlur}
														onChange={(e, data) => {
															setFieldValue(`passengers[${index}].gender`, data.value);
														}}
														value={values.passengers[index].gender}
														fluid
														search
														selection
														options={[
															{
																key: 'M',
																value: 'M',
																text: 'Male'
															},
															{
																key: 'F',
																value: 'F',
																text: 'Female'
															}
														]}
													/>
													<ErrorMessage name={`passengers[${index}].gender`} />
												</div>

												{/* <div className='col'>
													<label htmlFor=''>Nationality</label>
													<Field
														as='select'
														name={`passengers[${index}].nationality`}
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.passengers[index].nationality}
													>
														{this.state.countries.map((country) => {
															return (
																<option key={country.id} value={country.country_char}>
																	{country.name}
																</option>
															);
														})}
													</Field>
													<ErrorMessage name={`passengers[${index}].nationality`} />
												</div> */}
												<div className='col'>
													<label htmlFor=''>Nationality</label>
													<Dropdown
														className='form-control'
														name={`passengers[${index}].nationality`}
														placeholder='Select Country'
														onBlur={handleBlur}
														onChange={(e, data) => {
															setFieldValue(
																`passengers[${index}].nationality`,
																data.value
															);
														}}
														value={values.passengers[index].nationality}
														fluid
														search
														selection
														options={nationGroup(countries, nationality)}
													/>
												</div>
											</div>
										</div>
									</div>
								);
							})}
							<div className='text-center p-2'>
								<button type='submit' class='btn btn-primary'>
									Continue
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</Container>
		);

		if (this.state.viewDetails) {
			content = <FinalBookingDetails passengers={this.state.passengers} />;
		}

		return <div id='passenger-form'>{content}</div>;
	}
}

const mapStateToProps = ({flightStore, bookingStore, userStore, extras}) => {
	return {
		selectedInboundFlight: flightStore.selectedInboundFlight,
		selectedOutboundFlight: flightStore.selectedOutboundFlight,
		booking: bookingStore.booking,
		adult: flightStore.searchDetails.intAdult,
		child: flightStore.searchDetails.intChild,
		nationality: flightStore.searchDetails.strNationality,
		currentUser: userStore.currentUser,
		ttlTime: flightStore.ttlTime,
		countries: extras.countries
	};
};

const mapDispatchToProps = {
	setTTLtime,
	setBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerForm);
