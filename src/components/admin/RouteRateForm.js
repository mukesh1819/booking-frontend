import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown, TextArea} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';

import {Counter, DatePicker, IconInput, Loading as LoadingScreen, Stepper, Thumb} from '../shared';
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {createRouteRate, showRouteRate, updateRouteRate} from '../../api/vehicleApi';
import {sortObjectBy, phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';

class RouteRateForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {routeRate} = this.props.location.state != null ? this.props.location.state : {routeRate: {vehicle_type: {}}};

		const RouteRateSchema = yup.object().shape({
			vehicle: yup.string().required('Required'),
			source: yup.string().required('Required'),
			destination: yup.string().required('Required'),
			price: yup.number().required('Required'),
		});

		const initialParams = {
			vehicle: routeRate.vehicle_type.name,
            source: routeRate.source,
            destination: routeRate.destination,
            description: routeRate.description,
            price: routeRate.price,
		};

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						Route Rate Form
						<Formik
							initialValues={initialParams}
							validationSchema={RouteRateSchema}
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
								console.log(values);
								if (routeRate.idx != null) {
									updateRouteRate(routeRate.idx, values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
											swal({
												title: 'routeRate updated Successful!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											}).then((value) => {
                                                history.push('/admin/routeRates')
                                            });
										})
										.catch((error) => {
											console.log('routeRate update Error', error);
											setSubmitting(false);
											
										});
								} else {
									createRouteRate(values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
											swal({
												title: 'Success!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											}).then((value) => {
                                                history.push('/admin/routeRates')
                                            });
										})
										.catch((error) => {
											console.log('routeRate create Error', error);
											setSubmitting(false);
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
								<form onSubmit={handleSubmit}>
									<div className='input-section'>
										<div className='field-box'>
											<label>Vehicle</label>
											<IconInput icon='fas fa-location' iconPosition='left'>
												<Field
													name='vehicle'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.vehicle}
												/>
											</IconInput>
											<ErrorMessage name='vehicle' />
										</div>

										<div className='field-box'>
											<label>Source</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													// hidden
													name='source'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.source}
												/>
											</IconInput>
											<ErrorMessage name='source' />
										</div>

                                        <div className='field-box'>
											<label>Destination</label>
                                            <IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='destination'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.destination}
												/>
											</IconInput>
											<ErrorMessage name='destination' />
										</div>

                                        <div className='field-box'>
											<label>Rate</label>
                                            <IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													type='number'
													name='price'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.price}
												/>
											</IconInput>
											<ErrorMessage name='price' />
										</div>

										<div className='text-center'>
											<button
												className='btn btn-secondary m-2'
												type='submit'
												disabled={isSubmitting}
											>
												Submit
											</button>
										</div>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
}

export default RouteRateForm;
