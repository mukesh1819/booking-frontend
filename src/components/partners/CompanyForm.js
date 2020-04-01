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
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';

class CompanyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		const {partnerId, nextStep} = this.props;

		const PartnersSchema = yup.object().shape({
			company_name: yup.string().required('Required'),
			company_type: yup.string('String').required('Required'),
			company_address: yup.string('String').required('Required'),
			accept_terms: yup.bool().oneOf([true], 'You must accept the terms and conditions')
		});

		const partnerDetails = {
			company_name: '',
			company_email: '',
			company_address: '',
			company_type: [],
			website: '',
			company_contact_number: '',
			subscription: false,
			accept_terms: false
		};
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						Company Details
						<Formik
							initialValues={partnerDetails}
							validationSchema={PartnersSchema}
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
								// console.log(values);
								updatePartner(partnerId, values)
									.then((response) => {
										setSubmitting(false);
										nextStep(response.data);
									})
									.catch((error) => {
										// console.log('Update Company Details Error', error);
										setSubmitting(false);
										swal({
											title: 'Sorry!',
											text: 'could not able to update partner. please try again or contact us',
											icon: 'error',
											button: 'Try Again!'
										});
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
								/* and other goodies */
							}) => (
								<form onSubmit={handleSubmit} autoComplete='off'>
									<div className='input-section'>
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
										<div className='f1remield-box'>
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
										<div className='field-box'>
											<label> Company Website </label>
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
										<div className='field-box'>
											<label> Company Phone Number </label>
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
										<div className='field-box'>
											<label> Company Email Address </label>
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
										<div className='field-box'>
											<label> Company Address </label>
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

										<div className='field-box'>
											<div className='row mt-3'>
												<div>
													<Field
														name='subscription'
														className=''
														type='checkbox'
														checked={values.subscription}
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.subscription}
													/>
												</div>
												<div className='col-8 ml-0 pl-0 text-left d-flex align-top'>
													<label>I, would like to subscribe to emails</label>
												</div>
											</div>
										</div>

										<div className='field-box'>
											<div className='row mt-3'>
												<div>
													<Field
														name='accept_terms'
														className=''
														type='checkbox'
														checked={values.accept_terms}
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.accept_terms}
													/>
												</div>
												<div className='col-8 ml-0 pl-0 text-left d-flex align-top'>
													<label>I agree to the Terms and Conditions as a vendor</label>
												</div>
											</div>
											<ErrorMessage name='accept_terms' />
										</div>
									</div>
									<div class='text-center'>
										<button className='btn btn-secondary m-2' type='submit' disabled={isSubmitting}>
											Next
										</button>
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

const mapStateToProps = ({extras}) => ({
	countries: extras.countries
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
