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
import {createAddon, showAddon, updateAddon} from '../../api/addonApi';
import {sortObjectBy, phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';

class AddonForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {addon} = this.props.location.state != null ? this.props.location.state : {addon: {}};

		const AddonSchema = yup.object().shape({
			name: yup.string().required('Required'),
			price: alphaNumericValidate(yup).required('Required')
		});

		const initialParams = {
			name: addon.name,
            price: addon.price,
            description: addon.description
		};

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						Addon Form
						<Formik
							initialValues={initialParams}
							validationSchema={AddonSchema}
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
								console.log(values);
								if (addon.id != null) {
									updateAddon(addon.idx, values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
											swal({
												title: 'Addon updated Successful!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											}).then((value) => {
                                                history.push('/admin/addons')
                                            });
										})
										.catch((error) => {
											console.log('Addon update Error', error);
											setSubmitting(false);
											
										});
								} else {
									createAddon(values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
											swal({
												title: 'Addon created Success!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											}).then((value) => {
                                                history.push('/admin/addons')
                                            });
										})
										.catch((error) => {
											console.log('Addon create Error', error);
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
											<label>Name</label>
											<IconInput icon='fas fa-location' iconPosition='left'>
												<Field
													name='name'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.name}
												/>
											</IconInput>
											<ErrorMessage name='name' />
										</div>

										<div className='field-box'>
											<label>Price</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													// hidden
													name='price'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.price}
												/>
											</IconInput>
											<ErrorMessage name='price' />
										</div>

                                        <div className='field-box'>
											<label>Description</label>
                                            <TextArea
                                                className='form-control'
                                                name='description'
                                                placeholder='description'
                                                onBlur={handleBlur}
                                                onChange={(e, data) => {
                                                    setFieldValue(`description`, e.target.value);
                                                }}
                                                value={values.description}
                                            />
											<ErrorMessage name='description' />
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

export default AddonForm;
