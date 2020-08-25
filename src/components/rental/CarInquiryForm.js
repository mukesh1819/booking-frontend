import React, {Component} from 'react';

import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import history from '../../history';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, DateTimePicker} from '../shared';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Container, Segment, Input, Dropdown, Form, Radio, Checkbox, TextArea} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {setCarInquiryDetails} from '../../redux/actions';
import {connect} from 'react-redux';

import {getVehicles} from '../../api/vehicleTypeApi';
import {createCarInquiry, updateCarInquiry} from '../../api/carInquiryApi';
import {getLocations} from '../../api/locationApi';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import '../../i18n';
import {useTranslation, initReactI18next} from 'react-i18next';

class CarInquiryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicles: [],
			locations: []
		};
		var date = new Date();
		date.setDate(date.getDate() + 2);
	}

	componentDidMount() {
		var params = {
			per_page: 100
		};
		this.fetchDetails(params);
	}

	fetchDetails(params) {
		getVehicles(params)
			.then((response) => {
				this.setState({
					vehicles: response.data.vehicle_types
				});
				console.log('car list ', response.data.vehicle_types);
			})
			.catch((error) => {
				console.log('fetch vehicle error', error);
			});

		getLocations()
			.then((response) => {
				this.setState({
					locations: response.data.locations
				});
				console.log('locations list ', response.data.locations);
			})
			.catch((error) => {
				console.log('fetch location error', error);
			});
	}

	render() {
		const {carInquiry} = this.props.location.state != null ? this.props.location.state : {carInquiry: {}};
		const {vehicles, locations} = this.state;
		const {t, i18n} = this.props;
		const InquiriesSchema = yup.object().shape({
			source: textValidate(yup).required('Required'),
			destination: textValidate(yup).required('Required'),
			car_type: yup.string().required('Required'),
			start_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			no_of_pax: numberValidate(yup),
			no_of_days: numberValidate(yup)
		});

		const inquiryDetails = {
			no_of_pax: carInquiry.no_of_pax || 1,
			source: carInquiry.source,
			destination: carInquiry.destination,
			start_time: carInquiry.start_time,
			start_date: carInquiry.start_date == null ? new Date() : new Date(carInquiry.start_date),
			car_type: carInquiry.car_type,
			car_id: carInquiry.car_id,
			no_of_days: carInquiry.no_of_days || 1,
			max_pax: 20,
			within_city: carInquiry.within_city,
			multi_city: !carInquiry.multi_city,
			airport_transfer: false
		};
		var max_seat = 0;
		var vehicle_max_pax = {};
		if (inquiryDetails.car_type) {
			vehicle_max_pax = vehicles.find((v) => v.name == inquiryDetails.car_type);
			if (vehicle_max_pax != null) {
				max_seat = vehicle_max_pax.no_of_seats;
			}
		}
		return (
			<div className='container bg-white'>
				<Formik
					initialValues={inquiryDetails}
					validationSchema={InquiriesSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						setSubmitting(false);
						this.props.setCarInquiryDetails(values);
						// console.log(values);
						if (carInquiry.id != null) {
							updateCarInquiry(carInquiry.idx, values)
								.then((response) => {
									swal({
										title: 'Car Inquiry updated!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue'
									}).then((value) => {
										history.push('/admin/car_inquiries');
									});
								})
								.catch((error) => {
									console.log('Update Inquiry Error', error);
								});
						} else {
							createCarInquiry(values)
								.then((response) => {
									console.log('res mess', response.data);
									setSubmitting(false);
									history.push(`/cars/${response.data.idx}`);
									this.props.onSearch && this.props.onSearch();
								})
								.catch((error) => {
									console.log('inquiry create error', error);
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
						<form onSubmit={handleSubmit} className='form-wrap'>
							<div className=''>
								<div className='input-section padded'>
									<div className='row'>
										<div className='col'>
											<div className='form-menu'>
												<span
													className={values.multi_city ? 'active' : ''}
													onClick={() => {
														setFieldValue('multi_city', true);
														setFieldValue('within_city', false);
														setFieldValue('airport_transfer', false);
														setFieldValue('destination', '');
													}}
												>
													Multi City
												</span>
												<span
													className={values.within_city ? 'active' : ''}
													onClick={() => {
														setFieldValue('within_city', true);
														setFieldValue('multi_city', false);
														setFieldValue('airport_transfer', false);
														setFieldValue('destination', values.source);
													}}
												>
													Within City
												</span>
												<span
													className={values.airport_transfer ? 'active' : ''}
													onClick={() => {
														setFieldValue('within_city', false);
														setFieldValue('multi_city', false);
														setFieldValue('airport_transfer', true);
													}}
												>
													Airport Transfer
												</span>
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col'>
											{values.airport_transfer && (
												<Form>
													<Form.Group inline>
														<Radio
															label='Airport Pickup'
															className='pr-4'
															checked={values.airport_pickup}
															onChange={(e, data) => {
																setFieldValue('airport_pickup', data.checked);
																setFieldValue('airport_dropoff', !data.checked);
															}}
														/>
														<Radio
															label='Airport Dropoff'
															className='pr-4'
															checked={values.airport_dropoff}
															onChange={(e, data) => {
																setFieldValue('airport_pickup', !data.checked);
																setFieldValue('airport_dropoff', data.checked);
															}}
														/>
													</Form.Group>
												</Form>
											)}
										</div>
									</div>

									<div className='inputs row'>
										<div className='field-box col'>
											<label>Source</label>
											<Dropdown
												className=''
												name='source'
												placeholder='Select location'
												onBlur={handleBlur}
												onChange={(e, data) => {
													setFieldValue(`source`, data.value);
													if (values.within_city) {
														setFieldValue('destination', data.value);
													}
												}}
												value={values.source}
												fluid
												search
												selection
												options={locations
													.filter((v) => {
														var predicate = values.airport_pickup ? 'airport' : 'city';
														return v.location_type == predicate;
													})
													.map(function(location) {
														return {
															key: location.id,
															value: location.name,
															text: location.name
														};
													})}
											/>
											<ErrorMessage name='source' />
										</div>

										{!values.within_city && (
											<div className='field-box col'>
												<label>Destination</label>
												<Dropdown
													className=''
													name='destination'
													placeholder='Select location'
													onBlur={handleBlur}
													onChange={(e, data) => {
														setFieldValue(`destination`, data.value);
													}}
													value={values.destination}
													fluid
													search
													selection
													options={locations
														.filter((v) => {
															var predicate = values.airport_dropoff ? 'airport' : 'city';
															return (
																v.location_type == predicate && v.name !== values.source
															);
														})
														.map(function(location) {
															return {
																key: location.id,
																value: location.name,
																text: location.name
															};
														})}
												/>
												<ErrorMessage name='destination' />
											</div>
										)}
									</div>

									<div className='inputs row'>
										<div className='field-box col'>
											<label>Car Type</label>
											<Dropdown
												className=''
												name='car_type'
												placeholder='Select car'
												onBlur={handleBlur}
												onChange={(e, data) => {
													setFieldValue(`car_type`, data.value);
													if (vehicles.length > 0) {
														var vehicle_pax = vehicles.find((v) => v.name == data.value);
														if (vehicle_pax !== null) {
															setFieldValue(`max_pax`, vehicle_pax.no_of_seats);
														}
													}
												}}
												value={values.car_type}
												fluid
												search
												selection
												options={vehicles.map(function(vehicle) {
													return {
														key: vehicle.id,
														value: vehicle.name,
														text: vehicle.name
													};
												})}
											/>
											<ErrorMessage name='car_type' />
										</div>

										<div className='field-box col'>
											<label>Start date</label>
											<DatePicker
												name='start_date'
												className=' w-100'
												type='date'
												date={values.start_date}
												minDate={new Date()}
												maxDate={addDays(new Date(), 365)}
												onBlur={handleBlur}
												onChange={(date) => {
													setFieldValue('start_date', date);
												}}
												value={values.start_date}
												placeholder='start Date'
											/>
											<ErrorMessage name='start_date' />
										</div>

										{!values.airport_transfer && (
											<div className='field-box col'>
												<label htmlFor=''>Number of Days</label>
												<Dropdown
													name=''
													icon='users'
													className='icon btn-dropdown travellers'
													iconPosition='left'
													fluid
													selection
													closeOnChange={false}
													placeholder={`${values.no_of_days} Days`}
													onClick={(event, data) => {
														event.preventDefault();
													}}
												>
													<Dropdown.Menu
														onClick={(e, data) => {
															e.stopPropagation();
															e.preventDefault();
														}}
														content={
															<div className='p-2'>
																<Counter
																	id='no_of_days'
																	type='number'
																	className='m-1'
																	onBlur={handleBlur}
																	title={`${values.no_of_days} Days`}
																	onChange={(value) => {
																		setFieldValue('no_of_days', value);
																	}}
																	value={values.no_of_days}
																/>
															</div>
														}
													/>
												</Dropdown>
												<ErrorMessage name='no_of_days' />
											</div>
										)}

										<div className='field-box col'>
											<label htmlFor=''>Number of Passenger</label>
											<Dropdown
												name=''
												icon='users'
												className='icon btn-dropdown travellers'
												iconPosition='left'
												fluid
												selection
												closeOnChange={false}
												placeholder={'Traveller'.pluralize(values.no_of_pax)}
												onClick={(event, data) => {
													event.preventDefault();
												}}
											>
												<Dropdown.Menu
													onClick={(e, data) => {
														e.stopPropagation();
														e.preventDefault();
													}}
													content={
														<div className='p-2'>
															<Counter
																id='no_of_pax'
																type='number'
																className='m-1'
																max={values.car_type ? values.max_pax : max_seat}
																min={1}
																onBlur={handleBlur}
																title={'Traveller'.pluralize(values.no_of_pax)}
																onChange={(value) => {
																	setFieldValue('no_of_pax', value);
																}}
																value={values.no_of_pax}
															/>
														</div>
													}
												/>
											</Dropdown>
											<ErrorMessage name='no_of_pax' />
										</div>
									</div>

									<div className='row'>
										<div className='col-12 text-center'>
											<button
												className='btn btn-primary btn-large mb-2'
												type='submit'
												disabled={isSubmitting}
											>
												{carInquiry.id ? 'Update' : 'Submit'}
											</button>
										</div>
									</div>
								</div>
							</div>
						</form>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = ({rentalStore}) => ({});

const mapDispatchToProps = {
	setCarInquiryDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(CarInquiryForm);
