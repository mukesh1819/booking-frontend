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
import {getCars} from '../../api/carApi';
import {createCarInquiry, updateCarInquiry} from '../../api/carInquiryApi';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import '../../i18n';

class CarInquiryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cars: []
		};
		var date = new Date();
		date.setDate(date.getDate() + 2);
	}

	componentDidMount() {
		this.fetchDetails();
	}

	fetchDetails() {
		getCars()
			.then((response) => {
				this.setState({
					cars: response.data.cars
				});
				console.log('car list ', response.data.cars);
			})
			.catch((error) => {
				console.log('fetch package error', error);
			});
	}

	render() {
		const {carInquiry} = this.props.carInquiry != null ? this.props : {carInquiry: {}};
		const {cars} = this.state;
		const {t} = this.props;
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
			no_of_pax: carInquiry.no_of_pax || 0,
			source: carInquiry.source,
			destination: carInquiry.destination,
			start_time: carInquiry.start_time,
			start_date: carInquiry.start_date == null ? new Date() : new Date(carInquiry.start_date),
			car_type: carInquiry.car_type,
			within_city: carInquiry.within_city,
			car_id: carInquiry.car_id,
			no_of_days: carInquiry.no_of_days || 0
		};
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
						// console.log(values);
						if (carInquiry.id != null) {
							updateCarInquiry(carInquiry.idx, values)
								.then((response) => {
									swal({
										title: 'Car Inquiry updated!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue'
									});
								})
								.catch((error) => {
									console.log('Update Inquiry Error', error);
								});
						} else {
							createCarInquiry(values)
								.then((response) => {
									setSubmitting(false);
									swal({
										title: 'Inquiry Submitted!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue'
									}).then((value) => {
										history.push('/');
									});
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
							<div className='bg-white input-section padded'>
								<div className='d-none d-md-block form-menu'>
									<span
										className={!values.within_city ? 'active' : ''}
										onClick={() => {
											setFieldValue('within_city', false);
											setFieldValue('destination', '');
										}}
									>
										{t('Multi City')}
									</span>
									<span
										className={values.within_city ? 'active' : ''}
										onClick={() => {
											setFieldValue('within_city', true);
											setFieldValue('destination', values.source);
										}}
									>
										{t('Within City')}
									</span>
									<span
										className={values.airport_transfer ? 'active' : ''}
										onClick={() => {
											setFieldValue('airport_transfer', true);
										}}
									>
										{t('Airport Transfer')}
									</span>
								</div>
								<div className='inputs row'>
									<div className='field-box col'>
										<Form.Field>
											<label>Source</label>
											<Form.Input
												fluid
												icon='fas fa-user'
												iconPosition='left'
												name='source'
												className=''
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.source}
												placeholder='Source'
											/>
										</Form.Field>
										<ErrorMessage name='source' />
										{/* <div className='toggle-sector-mobile'>
												<i
													className='fas fa-exchange-alt'
													onClick={() => {
														setFieldValue('strSectorTo', values.strSectorFrom);
														setFieldValue('strSectorFrom', values.strSectorTo);
													}}
												/>
											</div> */}
									</div>
									{/* <div className='col-md-1 toggle-sector-desktop text-center'>
											<label htmlFor=''>&nbsp;</label>
											<i
												className='menu fas fa-exchange-alt'
												onClick={() => {
													setFieldValue('strSectorTo', values.strSectorFrom);
													setFieldValue('strSectorFrom', values.strSectorTo);
												}}
											/>
										</div> */}
									<div className='field-box col'>
										{!values.within_city && (
											<div className='field-box'>
												<Form.Field>
													<label>Destination</label>
													<Form.Input
														fluid
														icon='fas fa-user'
														iconPosition='left'
														name='destination'
														className=''
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.destination}
														placeholder='Destination'
													/>
												</Form.Field>
												<ErrorMessage name='destination' />
											</div>
										)}
									</div>
								</div>

								<div className='inputs row'>
									<div className='field-box col'>
										<label>Car Type</label>
										<Dropdown
											className=''
											name='car_type'
											placeholder='Select cars'
											onBlur={handleBlur}
											onChange={(e, data) => {
												setFieldValue(`car_type`, data.value);
											}}
											value={values.car_type}
											fluid
											search
											selection
											options={cars.map(function(car) {
												return {
													key: car.id,
													value: car.car_type,
													text: car.car_type
												};
											})}
										/>
										<ErrorMessage name='car_type' />
									</div>

									<div className='field-box col'>
										<label className='d-block'>start date</label>
										<DateTimePicker
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
											value={values.start}
											placeholder='start Date'
										/>
										<ErrorMessage name='start_date' />
									</div>

									<div className='field-box col'>
										<label htmlFor=''>Number of Days</label>
										<Dropdown
											name=''
											icon='icon-users'
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

									<div className='field-box col'>
										<label htmlFor=''>Number of Passenger</label>
										<Dropdown
											name=''
											icon='icon-users'
											className='icon btn-dropdown travellers'
											iconPosition='left'
											fluid
											selection
											closeOnChange={false}
											placeholder={`${values.no_of_pax}Travellers`}
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
															onBlur={handleBlur}
															title={`${values.no_of_pax} Traveller`}
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
							</div>

							<div className='bg-white'>
								<div className='row'>
									<div className='col-12 col-md-6' />

									<div className='col-12'>
										<div className='text-center'>
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

export default CarInquiryForm;
