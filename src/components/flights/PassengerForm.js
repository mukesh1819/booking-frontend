import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getFlights} from '../../api/flightApi';
import FlightList from './FlightList';
import {createBooking, submitPassengers} from '../../api/flightApi';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setBooking} from '../../redux/actions/bookingActions';
import ErrorMessage from '../ErrorMessage';
import FinalBookingDetails from './FinalBookingDetails';
import swal from 'sweetalert';
import {getCountries} from '../../api/flightApi';
import Timer from '../shared/Timer';
import {setTTLtime} from '../../redux/actions/flightActions';

import './flights.scss';

import {Formik, Form, Field} from 'formik';

import * as yup from 'yup';
import {passCsrfToken} from '../../utils/helpers';

import {Container, Button, Segment} from 'semantic-ui-react';
import {newPayment} from '../../api/paymentApi';
import Accordion from '../shared/Accordion';

class PassengerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			viewDetails: false,
			passengers: [],
			user: this.props.currentUser,
			countries: []
		};
		this.toggleView = this.toggleView.bind(this);
	}

	toggleView() {
		this.setState(function(prevState) {
			return {viewDetails: !prevState.viewDetails};
		});
	}

	componentDidMount() {
		this.fetchCountries();
	}

	fetchCountries() {
		getCountries()
			.then((response) => {
				console.log(response);
				this.setState({
					countries: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
		this.props.setTTLtime(15);
	}

	render() {
		const {user} = this.state;
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

		if (initialValues.passengers.length == 0) {
			return <Redirect to='/' />;
		}

		var content = (
			<Container className='p-0'>
				<Formik
					initialValues={initialValues}
					validationSchema={PassengerSchema}
					onSubmit={(values, {setSubmitting, props}) => {
						this.setState({
							passengers: values.passengers,
							viewDetails: true,
							user: values.user
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
									<Field
										type='text'
										name='user.phone_number'
										className='form-control'
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
													<span class=''>
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
												</div>
											</div>
										</Accordion>
									</div>
								);
							})}
							<div className='text-center p-2'>
								<button type='submit' class='btn btn-primary'>
									Submit
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</Container>
		);

		if (this.state.viewDetails) {
			content = (
				<FinalBookingDetails
					passengers={this.state.passengers}
					toggle={this.toggleView}
					user={this.state.user}
				/>
			);
		}

		return (
			<div id='passenger-form'>
				{this.props.ttlTime > 0 && <Timer />}
				{content}
			</div>
		);
	}
}

const mapStateToProps = ({flightStore, bookingStore, userStore}) => {
	return {
		selectedInboundFlight: flightStore.selectedInboundFlight,
		selectedOutboundFlight: flightStore.selectedOutboundFlight,
		booking: bookingStore.booking,
		adult: flightStore.searchDetails.intAdult,
		child: flightStore.searchDetails.intChild,
		currentUser: userStore.currentUser,
		ttlTime: flightStore.ttlTime
	};
};

const mapDispatchToProps = {
	setTTLtime,
	setBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerForm);
