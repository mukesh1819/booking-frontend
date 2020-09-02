import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {Badge} from '../shared';
import Inquiry from './Inquiry';
import history from '../../history';
import {deleteInquiry, showInquiry} from '../../api/inquiryApi';
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
import {confirmInquiry, assignPartner, rejectInquiry} from '../../api/inquiryApi';
import {getPackageBookingDetails} from '../../api/packageBookingApi';
import {Tab, Checkbox} from 'semantic-ui-react';
import PartnerServiceForm from './PartnerServiceForm';

class InquiryDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inquiry: {},
			showDetails: true,
			showOtherForm: false,
			showPartnerForm: false,
			packageBooking: {}
		};
	}

	componentDidMount() {
		this.fetchDetails();
	}

	rejectUserPackage(id) {
		rejectInquiry(id)
			.then((response) => {
				swal({
					title: 'User Package Rejection Response!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				}).then((response) => {
					history.push('/admin/inquiries');
				});
			})
			.catch((error) => {
				console.log('package Rejection', error);
			});
	}

	fetchDetails() {
		showInquiry(this.props.match.params.idx).then((response) => {
			this.setState({
				inquiry: response.data || {}
			});
			getPackageBookingDetails(response.data.package_booking.idx)
				.then((response) => {
					this.setState({
						packageBooking: response.data
					});
				})
				.catch((error) => {
					swal({
						title: 'Package Booking fetch error',
						text: 'Something went wrong. please try again or contact us',
						icon: 'error',
						button: 'Continue!'
					});
				});
		});
		getPartners()
			.then((response) => {
				this.setState({
					partners: response.data.partners
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

	setActions = (actions) => {
		this.setState(actions);
	};

	destroyInquiry(id) {
		swal({
			title: 'Are you sure?',
			text: 'Once delete, your inquiry will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteInquiry(id)
					.then((response) => {
						swal('Inquiry Deleted', {
							icon: 'success'
						});
						history.push('/admin/inquiries');
					})
					.catch((error) => {
						swal({
							title: 'Inquiry Delete error',
							text: 'Something went wrong. please try again or contact us',
							icon: 'error',
							button: 'Continue!'
						});
					});
			} else {
				swal('Your inquiry is not deleted yet');
			}
		});
	}

	render() {
		const {inquiry, partners, packageBooking, showDetails, showOtherForm, showPartnerForm} = this.state;
		var date = new Date();
		const InquiriesSchema = yup.object().shape({
			start_date: yup.date().default(function() {
				return new Date();
			}),
			end_date: yup.date().default(function() {
				return new Date();
			}),
			pickup_date: yup.date().default(function() {
				return new Date();
			}),
			drop_off_date: yup.date().default(function() {
				return new Date();
			}),
			pickup_location: yup.string(),
			drop_off_location: yup.string(),
			remarks: yup.string(),
			partner_id: yup.string(),
			name: yup.string(),
			details: yup.string()
		});

		const partner_service = {
			partner_id: '',
			name: '',
			details: '',

			extras: {
				'Package Name': inquiry.package_name,
				'Head Person': inquiry.head_traveller_name,
				'Email Address': inquiry.email_address,
				Address: `${inquiry.city}, ${inquiry.address}`,
				Nationality: inquiry.nationality,
				'Number of Person': `Adult - ${inquiry.number_of_adult}, Child - ${inquiry.number_of_child}`,
				'Phone Number': inquiry.phone,
				'Invoice Number': inquiry.idx,
				pickup_location: inquiry.pickup_location,
				drop_off_location: inquiry.drop_off_location,
				meals_included: packageBooking.meals_included ? 'Included' : 'Not Included',
				remarks: ''
			}
		};

		const inquiryDetails = {
			start_date: date,
			end_date: date,
			pickup_date: date,
			pickup_location: '',
			drop_off_date: date,
			drop_off_location: '',
			meals_included: false,
			remarks: ''
		};
		const partnerServiceDetails = {
			partner_services_attributes:
				packageBooking.idx != undefined && packageBooking.partner_services.length > 0
					? packageBooking.partner_services
					: [partner_service]
		};

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						{showDetails && (
							<Inquiry
								inquiry={inquiry}
								aPackage={inquiry.package}
								reject={this.rejectUserPackage}
								destroy={this.destroyInquiry}
								setActions={this.setActions}
							/>
						)}
						{showOtherForm && (
							<Formik
								initialValues={inquiryDetails}
								validationSchema={InquiriesSchema}
								onSubmit={(values, {setSubmitting}) => {
									// console.log('VALUES', values);
									setSubmitting(false);
									confirmInquiry(inquiry.idx, values)
										.then((response) => {
											// console.log('inquiry response',response.data);
											swal({
												title: 'User Package Response!',
												text: `Your package is confirmed!!! ${response.data.message}`,
												icon: 'success',
												button: 'Continue!'
											}).then((response) => {
												history.push('/admin/inquiries');
											});
										})
										.catch((error) => {
											// setSubmitting(false);
											// console.log(error);
											console.log('Package confirmation error', error);
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
									<form onSubmit={handleSubmit}>
										<div className=''>
											<div className='row'>
												<div className='col-12'>
													<div className='input-section'>
														<div className='row'>
															<div className='col-12 col-md-6'>
																<div className='field-box'>
																	<label className='d-block'>Start Date</label>

																	<DatePicker
																		name='start_date'
																		className='form-control'
																		type='date'
																		date={values.start_date}
																		minDate={new Date()}
																		onBlur={handleBlur}
																		onChange={(date) =>
																			setFieldValue('start_date', date)}
																		value={values.start_date}
																		placeholder='Arrival Date'
																	/>

																	<ErrorMessage name='start_date' />
																</div>
															</div>
															<div className='col-12 col-md-6'>
																<div className='field-box'>
																	<label className='d-block'>End Date</label>

																	<DatePicker
																		name='end_date'
																		className='form-control'
																		type='date'
																		date={values.end_date}
																		minDate={new Date()}
																		onBlur={handleBlur}
																		onChange={(date) =>
																			setFieldValue('end_date', date)}
																		value={values.end_date}
																		placeholder='Return Date'
																	/>

																	<ErrorMessage name='end_date' />
																</div>
															</div>
														</div>
														<div className='row'>
															<div className='col-12 col-md-6'>
																<div className='field-box'>
																	<label className='d-block'>Pickup Date</label>

																	<DatePicker
																		name='pickup_date'
																		className='form-control'
																		type='date'
																		date={values.pickup_date}
																		minDate={new Date()}
																		onBlur={handleBlur}
																		onChange={(date) =>
																			setFieldValue('pickup_date', date)}
																		value={values.pickup_date}
																		placeholder='Pickup Date'
																	/>

																	<ErrorMessage name='pickup_date' />
																</div>
															</div>
															<div className='col-12 col-md-6'>
																<div className='field-box'>
																	<label className='d-block'>Drop off Date</label>

																	<DatePicker
																		name='drop_off_date'
																		className='form-control'
																		type='date'
																		date={values.drop_off_date}
																		minDate={new Date()}
																		onBlur={handleBlur}
																		onChange={(date) =>
																			setFieldValue('drop_off_date', date)}
																		value={values.drop_off_date}
																		placeholder='Drop off Date'
																	/>

																	<ErrorMessage name='drop_off_date' />
																</div>
															</div>
														</div>
														<div className='row'>
															<div className='col-12 col-md-6'>
																<div className='field-box'>
																	<label className='d-block'>Pickup location</label>

																	<Field
																		name='pickup_location'
																		className='form-control'
																		onBlur={handleBlur}
																		onChange={handleChange}
																		value={values.pickup_location}
																	/>

																	<ErrorMessage name='pickup_location' />
																</div>
															</div>
															<div className='col-12 col-md-6'>
																<div className='field-box'>
																	<label className='d-block'>Drop off location</label>

																	<Field
																		name='drop_off_location'
																		className='form-control'
																		onBlur={handleBlur}
																		onChange={handleChange}
																		value={values.drop_off_location}
																	/>

																	<ErrorMessage name='drop_off_location' />
																</div>
															</div>
														</div>

														<div className='row'>
															<div className='col-12'>
																<div className='field-box'>
																	<Checkbox
																		name='meals_included'
																		className=''
																		label={'Meals Included?'}
																		onChange={(event, data) =>
																			setFieldValue(
																				'meals_included',
																				data.checked
																			)}
																		onBlur={handleBlur}
																		className=''
																		checked={values.meals_included}
																	/>
																	<ErrorMessage name='meals_included' />
																</div>
															</div>
														</div>

														<div className='row'>
															<div className='col-12'>
																<div className='field-box'>
																	<label>Remarks</label>

																	<Field
																		name='remarks'
																		className='form-control'
																		onBlur={handleBlur}
																		onChange={handleChange}
																		value={values.remarks}
																	/>

																	<ErrorMessage name='remarks' />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className='input-section'>
												<div className='text-center'>
													<button
														className='btn btn-secondary m-2 text-center'
														type='submit'
														disabled={isSubmitting}
													>
														Confirm
													</button>
												</div>
											</div>
										</div>
									</form>
								)}
							</Formik>
						)}

						{showPartnerForm && (
							<React.Fragment>
								<Formik
									initialValues={partnerServiceDetails}
									validationSchema={InquiriesSchema}
									onSubmit={(values, {setSubmitting}) => {
										// console.log('VALUES', values);
										setSubmitting(false);
										// if(values.partner_services_attributes[0].idx){
										// 	updateAssignPartner(inquiry.idx, values)
										// 	.then((response) => {
										// 		// console.log('inquiry response',response.data);
										// 		swal({
										// 			title: 'User Package Update!',
										// 			text: `Your package is updated!!! ${response.data.message}`,
										// 			icon: 'success',
										// 			button: 'Continue!'
										// 		});
										// 	})
										// 	.catch((error) => {
										// 		// setSubmitting(false);
										// 		// console.log(error);
										// 		console.log('Package update error', error);
										// 	});
										// }
										// else{
										assignPartner(inquiry.idx, values)
											.then((response) => {
												// console.log('inquiry response',response.data);
												swal({
													title: 'User Package Response!',
													text: `Your package is confirmed!!! ${response.data.message}`,
													icon: 'success',
													button: 'Continue!'
												}).then((response) => {
													history.push('/admin/inquiries');
												});
											})
											.catch((error) => {
												// setSubmitting(false);
												// console.log(error);
												console.log('Package confirmation error', error);
											});
										// }
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
												<div className='row'>
													<div className='col-12'>
														<div className='d-flex justify-content-between'>
															<h3 className='title'>Assign Partners</h3>
															<span
																className='btn btn-primary'
																onClick={() =>
																	setFieldValue('partner_services_attributes', [
																		...values.partner_services_attributes,
																		partner_service
																	])}
															>
																Add
															</span>
														</div>
													</div>
												</div>
											</div>
											{values.partner_services_attributes.map((partner_service, index) => (
												<React.Fragment>
													<div
														className='d-flex justify-content-end'
														onClick={() => {
															values.partner_services_attributes.splice(index, 1);
															setFieldValue(
																'partners',
																values.partner_services_attributes
															);
														}}
													>
														<i className='fas fa-times' />
													</div>
													<PartnerServiceForm
														inquiry={inquiry}
														partners={partners}
														index={index}
														partner={values.partner_services_attributes[index]}
														onChange={(field, value) => {
															setFieldValue(
																`partner_services_attributes[${index}].${field}`,
																value
															);
														}}
														onBlur={handleBlur}
													/>
												</React.Fragment>
											))}
											<div className='text-center'>
												<button type='submit' className='btn btn-primary text-center'>
													Submit
												</button>
											</div>
										</form>
									)}
								</Formik>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default InquiryDetails;
