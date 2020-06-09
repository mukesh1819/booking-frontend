import React, {Component} from 'react';

import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker} from '../shared';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Input, Form, Checkbox, TextArea} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {getCars} from '../../api/carApi'
import {createCarInquiry, updateCarInquiry} from '../../api/carInquiryApi'
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';

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
            })
			console.log('car list ', response.data.cars);
		})
		.catch((error) => {
				console.log('fetch package error', error);
        });
	}

	render() {
		const {carInquiry} = this.props.carInquiry != null ? this.props : {carInquiry: {}};
		const {cars} = this.state;
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
            no_of_pax: carInquiry.no_of_pax,
			source: carInquiry.source,
            destination: carInquiry.destination,
			start_time: carInquiry.start_time,
			start_date: carInquiry.start_date == null ? new Date() : new Date(carInquiry.start_date),
            car_type: carInquiry.car_type,
            within_city: carInquiry.within_city,
            car_id: carInquiry.car_id,
            no_of_days: carInquiry.no_of_days
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
                                                <label>Select Car Type</label>
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
                                        </div>

                                        <div className='col-12'>
											<div className='field-box'>
												<Checkbox
													label={'with in the city'}
													onChange={(event, data) => {
														setFieldValue('within_city', data.checked);
														data.checked &&
															setFieldValue('destination', values.within_city);
													}}
													name='within_city'
													className=''
													type='checkbox'
													checked={values.within_city}
													onBlur={handleBlur}
												/>
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label className='d-block'>start date</label>
												<DatePicker
													name='start_date'
													className=' w-100'
													type='date'
													date={values.start_date}
													minDate={new Date()}
													maxDate={addDays(new Date(), 365)}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('start_date', date)}
													value={values.start}
													placeholder='start Date'
												/>
												<ErrorMessage name='start_date' />
											</div>
										</div>
									</div>
								</div>
								<div className='inquirer-details '>
									<div className='input-section padded bg-primary-light'>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
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
												</div>
											</div>
											<div className='col-12 col-md-6'>
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

                                            <div className='col-12 col-md-6'>
												<div className='field-box'>
													<Form.Field>
														<label>No of days</label>
														<Form.Input
															fluid
															icon='fas fa-mail-bulk'
															iconPosition='left'
															name='no_of_days'
															type='number'
															className=''
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.no_of_days}
															placeholder='No of days'
														/>
													</Form.Field>
                                                    <ErrorMessage name='no_of_days' />
												</div>
											</div>
										</div>
										
										
									</div>
								</div>

								<div className='traveller-details '>
									<div className='input-section padded bg-white'>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label htmlFor=''>Number of Passenger</label>
													<Dropdown
														name=''
														placeholder='Select traveller'
														icon='icon-users'
														className='icon btn-dropdown travellers'
														iconPosition='left'
														fluid
														selection
														closeOnChange={false}
														placeholder="Number of Traveller"
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
																		onChange={(value) =>
																			setFieldValue('no_of_pax', value)}
																		value={values.no_of_pax}
																	/>
																</div>
															}
														/>
													</Dropdown>
													<ErrorMessage name='no_of_pax' />
												</div>
											</div>
											
											<div className='col-12'>
												<div className='text-center'>
													<button
														className='btn btn-primary m-2'
														type='submit'
														disabled={isSubmitting}
													>
														{carInquiry.id ? 'Update' : 'Submit'}
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

export default CarInquiryForm;