import React, {Component} from 'react';
import {InquiryForm} from '../packages';
import {IconInput, DatePicker} from '../shared';
import {passCsrfToken} from '../../helpers';
import * as yup from 'yup';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import {Dropdown} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {getPartners} from '../../api/partnerApi';
import {confirmInquiry} from '../../api/inquiryApi';

class EditInquiry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partners: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPartners();
	}

	fetchPartners() {
		getPartners()
			.then((response) => {
				this.setState({
					partners: response.data
				});
			})
			.catch((error) => {
				swal({
					title: 'Partner fetch error',
					text: 'Something went wrong. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	render() {
		const {inquiry} = this.props.location != null ? this.props.location.state : {inquiry: {}};
		const {partners} = this.state;
		var date = new Date();

		const InquiriesSchema = yup.object().shape({
			start_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			end_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			pickup_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			drop_off_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			pickup_location: yup.string().required('Required'),
			drop_off_location: yup.string().required('Required'),
			remarks: yup.string().required('Required'),
			partner_id: yup.string().required('Required'),
			name: yup.string().required('Required'),
			details: yup.string().required('Required'),
			meals_included: yup.bool().oneOf([true], 'You must provide the meals value')
		});

		const inquiryDetails = {
			start_date: date,
			end_date: date,
			pickup_date: date,
			pickup_location: '',
			drop_off_date: date,
			drop_off_location: '',
			meals_included: false,
			remarks: '',
			partner_id: '',
			name: '',
			details: ''
		};

		return (
			<div className='container p-4'>
				<h3>Edit Inquiry Form</h3>
				<InquiryForm inquiry={inquiry} />
				<Formik
					initialValues={inquiryDetails}
					validationSchema={InquiriesSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						setSubmitting(false);
						confirmInquiry(inquiry.id, values)
							.then((response) => {
								// console.log('inquiry response',response.data);
								swal({
									title: 'User Package Response!',
									text: `Your package is confirmed!!! ${response.data.message}`,
									icon: 'success',
									button: 'Continue!'
								});
							})
							.catch((error) => {
								// setSubmitting(false);
								// console.log(error);
								swal({
									title: 'User Package Response!',
									text:
										error.response != null
											? error.response.data.errors
											: 'sorry something went wrong',
									icon: 'error',
									button: 'Continue!'
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
						<div>
							<h3>Package Booking form and Partner Form</h3>
							<form onSubmit={handleSubmit} autoComplete='off'>
								<div className='input-section'>
									<div className='field-box'>
										<label>Start Date</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<div className='col-12'>
												<DatePicker
													name='start_date'
													className='form-control'
													type='date'
													date={values.start_date}
													minDate={new Date()}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('start_date', date)}
													value={values.start_date}
													placeholder='Arrival Date'
												/>
											</div>
										</IconInput>
										<ErrorMessage name='start_date' />
									</div>

									<div className='field-box'>
										<label>End Date</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<div className='col-12'>
												<DatePicker
													name='end_date'
													className='form-control'
													type='date'
													date={values.end_date}
													minDate={new Date()}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('end_date', date)}
													value={values.end_date}
													placeholder='Return Date'
												/>
											</div>
										</IconInput>
										<ErrorMessage name='end_date' />
									</div>

									<div className='field-box'>
										<label>Pickup Date</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<div className='col-12'>
												<DatePicker
													name='pickup_date'
													className='form-control'
													type='date'
													date={values.pickup_date}
													minDate={new Date()}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('pickup_date', date)}
													value={values.pickup_date}
													placeholder='Pickup Date'
												/>
											</div>
										</IconInput>
										<ErrorMessage name='pickup_date' />
									</div>

									<div className='field-box'>
										<label>Pickup location</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='pickup_location'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.pickup_location}
											/>
										</IconInput>
										<ErrorMessage name='pickup_location' />
									</div>

									<div className='field-box'>
										<label>Drop off Date</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<div className='col-12'>
												<DatePicker
													name='drop_off_date'
													className='form-control'
													type='date'
													date={values.drop_off_date}
													minDate={new Date()}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('drop_off_date', date)}
													value={values.drop_off_date}
													placeholder='Drop off Date'
												/>
											</div>
										</IconInput>
										<ErrorMessage name='drop_off_date' />
									</div>

									<div className='field-box'>
										<label>Drop off location</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='drop_off_location'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.drop_off_location}
											/>
										</IconInput>
										<ErrorMessage name='drop_off_location' />
									</div>

									<div className='field-box'>
										<div className='row mt-3'>
											<div>
												<Field
													name='meals_included'
													className=''
													type='checkbox'
													checked={values.meals_included}
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.meals_included}
												/>
											</div>
											<div className='col-8 ml-0 pl-0 text-left d-flex align-top'>
												<label>Meals Included</label>
											</div>
										</div>
										<ErrorMessage name='meals_included' />
									</div>

									<div className='field-box'>
										<label>Remarks</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='remarks'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.remarks}
											/>
										</IconInput>
										<ErrorMessage name='remarks' />
									</div>

									<div className='field-box'>
										<label>Service Name</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='name'
												className='form-control'
												type='text'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.name}
											/>
										</IconInput>
										<ErrorMessage name='name' />
									</div>

									<div className='field-box'>
										<label htmlFor=''>Select Partner</label>
										<Dropdown
											className='form-control'
											name='partner_id'
											placeholder='Select Partner'
											onBlur={handleBlur}
											onChange={(e, data) => {
												setFieldValue(`partner_id`, data.value);
											}}
											value={values.partner_id}
											fluid
											search
											selection
											options={partners.map(function(partner) {
												name = partner.first_name + ' ' + partner.last_name;
												return {
													key: partner.id,
													value: partner.id,
													text: name
												};
											})}
										/>
										<ErrorMessage name='partner_id' />
									</div>

									<div className='field-box'>
										<label>Service Details</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												component='textarea'
												rows='4'
												name='details'
												className='form-control'
												onBlur={handleBlur}
												onChange={(e, data) => {
													setFieldValue(`details`, e.target.value);
												}}
												value={values.details}
											/>
										</IconInput>
										<ErrorMessage name='details' />
									</div>
								</div>

								<div className='text-center'>
									<button className='btn btn-secondary m-2' type='submit' disabled={isSubmitting}>
										confirm
									</button>
								</div>
							</form>
						</div>
					)}
				</Formik>
			</div>
		);
	}
}
export default EditInquiry;
