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
import PassengerDetails from './PassengerDetails';
import swal from 'sweetalert';

import './flights.scss';

import {Formik, Form, Field} from 'formik';

import * as yup from 'yup';
import {passCsrfToken} from '../../utils/helpers';

import {Container, Button, Segment} from 'semantic-ui-react';
import {newPayment} from '../../api/paymentApi';

class PassengerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			viewDetails: false,
			passengers: []
		};
	}

	toggleView() {
		this.setState({
			viewDetails: function(state) {
				return !state.viewDetails;
			}
		});
	}

	componentDidMount() {}

	render() {
		const {adult, child} = this.props;
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
			passengers: []
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

		if (this.props.currentUser.email == undefined) {
			return <Redirect to='/login' />;
		}

		if (this.state.viewDetails) {
			return <PassengerDetails passengers={this.state.passengers} toggle={this.toggleView} />;
		}

		return (
			<div id='passenger-form'>
				<Container>
					<div className='text-bold mb-2'>Add Passenger details</div>
					<Formik
						initialValues={initialValues}
						validationSchema={PassengerSchema}
						onSubmit={(values, {setSubmitting, props}) => {
							this.setState({
								passengers: values.passengers,
								viewDetails: true
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
								{values.passengers.map((passenger, index) => {
									return (
										<div className='card' key={`${passenger.passenger_type} ${index + 1}`}>
											<div className='card-body'>
												<div>
													{passenger.passenger_type} {index + 1}
												</div>
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
															<option value='NEP'> Nepali </option>
															<option value='IND'> Indian </option>
														</Field>
														<ErrorMessage name={`passengers[${index}].nationality`} />
													</div>
												</div>
											</div>
										</div>
									);
								})}
								<div className='text-center'>
									<button type='submit' class='btn btn-primary'>
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

const mapStateToProps = ({flightStore, bookingStore, userStore}) => {
	return {
		selectedInboundFlight: flightStore.selectedInboundFlight,
		selectedOutboundFlight: flightStore.selectedOutboundFlight,
		booking: bookingStore.booking,
		adult: flightStore.searchDetails.intAdult,
		child: flightStore.searchDetails.intChild,
		currentUser: userStore.currentUser
	};
};

const mapDispatchToProps = {
	setBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerForm);
