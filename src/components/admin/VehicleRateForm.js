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
import {createVehicleRate, showVehicleRate, updateVehicleRate} from '../../api/vehicleApi';
import {sortObjectBy, phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';

class VehicleRateForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {vehicleRate} = this.props.location.state != null ? this.props.location.state : {vehicleRate: {vehicle_type: {}}};

		const VehicleRateSchema = yup.object().shape({
			vehicle: yup.string().required('Required'),
			description: yup.string().required('Required'),
			price: yup.number().required('Required'),
		});

		const initialParams = {
			vehicle: vehicleRate.vehicle_type.name,
            description: vehicleRate.description,
            price: vehicleRate.price,
		};

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						Vehicle Rate Form
						<Formik
							initialValues={initialParams}
							validationSchema={VehicleRateSchema}
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
								console.log(values);
								if (vehicleRate.idx != null) {
									updateVehicleRate(vehicleRate.idx, values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
											swal({
												title: 'vehicleRate updated Successful!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											}).then((value) => {
                                                history.push('/admin/vehicleRates')
                                            });
										})
										.catch((error) => {
											console.log('vehicleRate update Error', error);
											setSubmitting(false);
											
										});
								} else {
									createVehicleRate(values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
											swal({
												title: 'Success!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											}).then((value) => {
                                                history.push('/admin/vehicleRates')
                                            });
										})
										.catch((error) => {
											console.log('vehicleRate create Error', error);
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
											<label>Description</label>
                                            <IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='description'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.description}
												/>
											</IconInput>
											<ErrorMessage name='description' />
										</div>

                                        <div className='field-box'>
											<label>Price</label>
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

export default VehicleRateForm;
