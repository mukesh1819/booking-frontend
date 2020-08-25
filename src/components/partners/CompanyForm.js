import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {updatePartner} from '../../api/partnerApi';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper} from '../shared';
import swal from 'sweetalert';
import {Input, Checkbox} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import {phoneValidate, textValidate, alphaNumericValidate} from '../../helpers';

class CompanyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	onCaptchaChange(value) {
		console.log('Captcha value:', value);
	}

	render() {
		const {prevStep, nextStep, onSubmit} = this.props;

		const PartnersSchema = yup.object().shape({
			company_name: textValidate(yup).required('Required'),
			company_email: yup.string().email(),
			company_type: yup.string('String').required('Required'),
			company_address: alphaNumericValidate(yup).required('Required'),
			accept_terms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
			company_contact_number: phoneValidate(yup),
			website: alphaNumericValidate(yup),
			captcha: yup.string().typeError('Required').required('Required')
		});

		const partnerDetails = {
			company_name: '',
			company_email: '',
			company_address: '',
			company_type: [],
			website: '',
			company_contact_number: '',
			subscription: false,
			accept_terms: false,
			captcha: ''
		};
		return (
			<Formik
				initialValues={partnerDetails}
				validationSchema={PartnersSchema}
				onSubmit={(values, {setSubmitting}) => {
					setSubmitting(true);
					nextStep(values);
					onSubmit(values);
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
						<div className=''>
							<div className='row'>
								<div className='col-12'>
									<div className='field-box'>
										<label> Company Name </label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='company_name'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.company_name}
											/>
										</IconInput>
										<ErrorMessage name='company_name' />
									</div>
								</div>
							</div>

							<div className='row'>
								<div className='col-12'>
									<div className='field-box'>
										<label htmlFor=''>Service Type</label>
										<Dropdown
											className='form-control'
											name='company_type'
											placeholder='Select Service'
											onBlur={handleBlur}
											onChange={(e, data) => {
												setFieldValue(`company_type`, data.value);
												console.log(values);
											}}
											value={values.company_type}
											fluid
											search
											selection
											multiple
											options={[
												{
													key: 1,
													value: 'vehicle rental',
													text: 'vehicle rental'
												},

												{
													key: 2,
													value: 'bus transport',
													text: 'bus transport'
												},

												{
													key: 3,
													value: 'paragliding',
													text: 'paragliding'
												},

												{
													key: 4,
													value: 'bungee',
													text: 'bungee'
												},

												{
													key: 5,
													value: 'sight seeing',
													text: 'vehicle rental'
												},

												{
													key: 6,
													value: 'others',
													text: 'others'
												}
											]}
										/>
										<ErrorMessage name='company_type' />
									</div>
								</div>
							</div>

							<div className='row'>
								<div className='col-12 col-md-6'>
									<div className='field-box'>
										<label> Phone Number </label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='company_contact_number'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.company_contact_number}
											/>
										</IconInput>
										<ErrorMessage name='company_contact_number' />
									</div>
								</div>
								<div className='col-12 col-md-6'>
									<div className='field-box'>
										<label> Address </label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='company_address'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.company_address}
											/>
										</IconInput>
										<ErrorMessage name='company_address' />
									</div>
								</div>
							</div>

							<div className='row'>
								<div className='col-12 col-md-6'>
									<div className='field-box'>
										<label> Email Address </label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='company_email'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.company_email}
											/>
										</IconInput>
										<ErrorMessage name='company_email' />
									</div>
								</div>
								<div className='col-12 col-md-6'>
									<div className='field-box'>
										<label> Website </label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='website'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.website}
											/>
										</IconInput>
										<ErrorMessage name='website' />
									</div>
								</div>
							</div>

							<div className='row mt-3'>
								<div className='col-12'>
									<div className='field-box'>
										<Checkbox
											name='subscription'
											className=''
											onBlur={handleBlur}
											onChange={(event, data) => {
												setFieldValue('subscription', data.checked);
											}}
											checked={values.subscription}
											label={{children: 'I would like to subscribe to emails'}}
										/>
										<ErrorMessage name='subscription' />
									</div>
								</div>
								<div className='col-12'>
									<div className='field-box'>
										<Checkbox
											name='accept_terms'
											className=''
											onBlur={handleBlur}
											onChange={(event, data) => {
												setFieldValue('accept_terms', data.checked);
											}}
											checked={values.accept_terms}
											label={{
												children: 'I agree to the Terms and Conditions as a vendor'
											}}
										/>
										<ErrorMessage name='accept_terms' />
									</div>
								</div>
								<div className='col-12'>
									<div className='field-box'>
										<div>
											<ReCAPTCHA
												sitekey={process.env.REACT_APP_CAPTCHA_KEY}
												onChange={(value) => setFieldValue('captcha', value)}
											/>
											<ErrorMessage name='captcha' />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='d-flex justify-content-center'>
							<button className='btn btn-outline-primary m-2' type='button' onClick={prevStep}>
								Back
							</button>
							<button className='btn btn-primary m-2' type='submit' disabled={isSubmitting}>
								Submit
							</button>
						</div>
					</form>
				)}
			</Formik>
		);
	}
}

const mapStateToProps = ({extras}) => ({
	countries: extras.countries
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
