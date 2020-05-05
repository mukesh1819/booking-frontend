import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper, Thumb} from '../shared';
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import {sortObjectBy, phoneValidate, textValidate} from '../../helpers';

class PartnerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partnerIsValid: false
		};
	}

	componentDidMount() {}

	render() {
		const {partnerIsValid} = this.state;
		const {countries, currentUser, nextStep} = this.props;
		var userName = '';

		if (Object.keys(currentUser).length !== 0) {
			userName = currentUser.name.split(' ');
		}
		var sortedCountries = sortObjectBy(countries, 'code');
		const PartnersSchema = yup.object().shape({
			first_name: textValidate(yup).required('Required'),
			last_name: textValidate(yup).required('Required'),
			email: yup.string().email().required('Required'),
			code: yup.string().typeError('Select a code').required('Required'),
			contact_number: phoneValidate(yup).required('Required'),
			country: yup.string().required('Required'),
			city: textValidate(yup).required('Required')
			
		});

		const partnerDetails = {
			first_name: userName === null ? '' : userName[0],
			last_name: userName[1] === null ? '' : userName[1],
			email: currentUser === null ? '' : currentUser.email,
			code: currentUser === null ? '' : currentUser.code,
			contact_number: currentUser === null ? '' : currentUser.phone_number,
			country: currentUser === null ? '' : currentUser.country,
			city: ''
		};

		return (
			<div className=''>
				<h3 className='m-3' />
				<Formik
					initialValues={partnerDetails}
					validationSchema={PartnersSchema}
					onSubmit={(values, {setSubmitting}) => {
						nextStep(values);
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
						<React.Fragment>
							<form onSubmit={handleSubmit}>
								<div className=''>
									<div className='row'>
										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label>First Name</label>
												<Field
													name='first_name'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.first_name}
												/>
												<ErrorMessage name='first_name' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label>Last Name</label>
												<IconInput icon='icon-paper-plane' iconPosition='left'>
													<Field
														name='last_name'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.last_name}
													/>
												</IconInput>
												<ErrorMessage name='last_name' />
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label>Email Address</label>
												<IconInput icon='icon-paper-plane' iconPosition='left'>
													<Field
														name='email'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.email}
													/>
												</IconInput>
												<ErrorMessage name='email' />
											</div>
										</div>
										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label>Mobile Number</label>
												<Input
													label={
														<Dropdown
															className='dropdown'
															defaultValue={values.code}
															name='code'
															placeholder='Code'
															onBlur={handleBlur}
															onChange={(e, data) => {
																setFieldValue(`code`, data.value);
															}}
															value={values.code}
															search
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
													placeholder='Mobile Number'
													type='text'
													name='contact_number'
													className='semantic-input-group'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.contact_number}
												/>
												<ErrorMessage name='code' />
												<ErrorMessage name='contact_number' />
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label htmlFor=''>Country</label>
												<Dropdown
													className='form-control'
													name='country'
													placeholder='Select Country'
													onBlur={handleBlur}
													onChange={(e, data) => {
														setFieldValue(`country`, data.value);
													}}
													value={values.country}
													fluid
													search
													selection
													options={countries}
												/>
												<ErrorMessage name='country' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label>City</label>
												<IconInput icon='icon-paper-plane' iconPosition='left'>
													<Field
														name='city'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.city}
													/>
												</IconInput>
												<ErrorMessage name='city' />
											</div>
										</div>
									</div>
								</div>
								<div class='text-center'>
									<button className='btn btn-primary mt-4' type='submit' disabled={isSubmitting}>
										Continue
									</button>
								</div>
							</form>
						</React.Fragment>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = ({extras, userStore}) => ({
	countries: extras.countries,
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerForm);
