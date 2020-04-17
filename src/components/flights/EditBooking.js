import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FlightList from './FlightList';
import {getFlights, createBooking, getBookingDetails} from '../../api/flightApi';
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
import {passCsrfToken} from '../../helpers';

import {Container, Button, Segment} from 'semantic-ui-react';
import {newPayment} from '../../api/paymentApi';
import {sortObjectBy} from '../../helpers';

class EditBooking extends Component {
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
		this.fetchDetails();
	}

	fetchDetails = () => {
		getBookingDetails(this.props.match.params.idx)
			.then((response) => {
				this.setState({
					booking: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Booking fetch error',
					text: `could not able to fetch booking.. please try again or contact us`,
					icon: 'error',
					button: 'Continue!'
				});
			});
	};

	render() {
		const user = this.props.currentUser;
		const selectedOutboundFlight = this.props.selectedOutboundFlight;
		user.code = user.country;
		const {adult, child, currentUser} = this.props;
		const PassengerSchema = yup.object().shape({
			passengers: yup.array().of(
				yup.object().shape({
					title: yup.string().required('Required'),
					first_name: yup.string().required('Required'),
					last_name: yup.string().required('Required'),
					gender: yup.string().required('Required'),
					nationality: yup.string().required('Required')
				})
			)
		});
		const passenger = {
			title: 'Mr',
			first_name: '',
			last_name: '',
			passenger_type: '',
			gender: 'M',
			nationality: 'NP'
		};
		const initialValues = {
			passengers: [],
			user: user
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

		var sortedCountries = this.props.countries.map((country) => {
			return {
				country_char: country.country_char,
				country_code: country.country_code
			};
		});
		sortedCountries = sortObjectBy(sortedCountries, 'country_code');

		return (
			<div id='passenger-form'>
				<Container className='p-0'>
					<Formik
						initialValues={initialValues}
						validationSchema={PassengerSchema}
						onSubmit={(values, {setSubmitting, props}) => {
							createBooking({
								booking: {
									outbound_flight: this.props.selectedOutboundFlight,
									inbound_flight: this.props.selectedInboundFlight,
									passengers_attributes: this.props.passengers,
									contact_name: user.name,
									mobile_no: user.phone_number,
									email: user.email
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
							<Form>
								<h3 className='p-2'>Contact Information</h3>
								<div className='input-section'>
									<div className='field-box'>
										<label>Contact Name</label>
										<Field
											type='text'
											name='user.name'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.user.name}
										/>
									</div>

									<div className='field-box'>
										<label>Contact Phone</label>
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
															key: country.id,
															value: country.country_code,
															text: country.country_code,
															flag: country.country_char.toLowerCase()
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
									</div>

									<div className='field-box'>
										<label>Contact Email</label>
										<Field
											type='text'
											name='user.email'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.user.email}
										/>
									</div>
								</div>
								<h3 className='p-2'>Passenger details</h3>

								{values.passengers.map((passenger, index) => {
									return (
										<div className='' key={`${passenger.passenger_type} ${index + 1}`}>
											<Accordion title={`${passenger.passenger_type} ${index + 1}`}>
												<div className='input-section'>
													<div className='field-box'>
														<label htmlFor=''>Title</label>
														<Field
															as='select'
															name={`passengers[${index}].title`}
															className='form-control'
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.passengers[index].title}
														>
															<option value='Mr'> Mr </option>
															<option value='Mrs'> Mrs </option>
														</Field>
														<span className=''>
															<ErrorMessage name={`passengers[${index}].title`} />
														</span>
													</div>

													<div className='field-box'>
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
													<div className='field-box'>
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

													<div className='field-box'>
														<label htmlFor=''>Gender</label>
														<Field
															as='select'
															name={`passengers[${index}].gender`}
															className='form-control'
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.passengers[index].gender}
														>
															<option value='M'> Male </option>
															<option value='F'> Female </option>
														</Field>
														<ErrorMessage name={`passengers[${index}].gender`} />
													</div>

													<div className='field-box'>
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
															options={this.props.countries}
														/>
													</div>
												</div>
											</Accordion>
										</div>
									);
								})}
								<div className='text-center p-2'>
									<button type='submit' class='btn btn-secondary'>
										Submit
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = ({flightStore, bookingStore, userStore, extras}) => {
	return {
		selectedInboundFlight: flightStore.selectedInboundFlight,
		selectedOutboundFlight: flightStore.selectedOutboundFlight,
		booking: bookingStore.booking,
		adult: flightStore.searchDetails.intAdult,
		child: flightStore.searchDetails.intChild,
		currentUser: userStore.currentUser,
		ttlTime: flightStore.ttlTime,
		countries: extras.countries
	};
};

const mapDispatchToProps = {
	setTTLtime,
	setBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBooking);
