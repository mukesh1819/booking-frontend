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
import {Tab, Checkbox} from 'semantic-ui-react';

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
			partner_id: 1,
			name: '',
			details: ''
		};

		const inquiryDetails = {
			start_date: date,
			end_date: date,
			pickup_date: date,
			pickup_location: '',
			drop_off_date: date,
			drop_off_location: '',
			meals_included: false,
			remarks: '',
			partner_services_attributes: [partner_service]
		};

		return (
			<div className='container p-4'>
				<h3>Edit Inquiry Form</h3>
				<div className='card'>
					<div className='card-body'>
						<div className=''>
							<div className=''>
								<Formik
									initialValues={inquiryDetails}
									validationSchema={InquiriesSchema}
									onSubmit={(values, {setSubmitting}) => {
										// console.log('VALUES', values);
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
										<form onSubmit={handleSubmit} autoComplete='off'>
											<div className='row'>
												<div className='col-12 px-0'>
													<Tab
														menu={{secondary: true}}
														panes={[
															{
																menuItem: 'Inquiry Details',
																render: () => (
																	<Tab.Pane attached={false}>
																		<div className=''>
																			<InquiryForm
																				inquiry={inquiry}
																				aPackage={inquiry.package}
																			/>
																		</div>
																	</Tab.Pane>
																)
															},
															{
																menuItem: 'Booking Details',
																render: () => (
																	<Tab.Pane attached={false}>
																		<div className='input-section bg-body'>
																			<div className='row'>
																				<div className='col-12 col-md-6'>
																					<div className='field-box'>
																						<label className='d-block'>
																							Start Date
																						</label>

																						<DatePicker
																							name='start_date'
																							className='form-control'
																							type='date'
																							date={values.start_date}
																							minDate={new Date()}
																							onBlur={handleBlur}
																							onChange={(date) =>
																								setFieldValue(
																									'start_date',
																									date
																								)}
																							value={values.start_date}
																							placeholder='Arrival Date'
																						/>

																						<ErrorMessage name='start_date' />
																					</div>
																				</div>
																				<div className='col-12 col-md-6'>
																					<div className='field-box'>
																						<label className='d-block'>
																							End Date
																						</label>

																						<DatePicker
																							name='end_date'
																							className='form-control'
																							type='date'
																							date={values.end_date}
																							minDate={new Date()}
																							onBlur={handleBlur}
																							onChange={(date) =>
																								setFieldValue(
																									'end_date',
																									date
																								)}
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
																						<label className='d-block'>
																							Pickup Date
																						</label>

																						<DatePicker
																							name='pickup_date'
																							className='form-control'
																							type='date'
																							date={values.pickup_date}
																							minDate={new Date()}
																							onBlur={handleBlur}
																							onChange={(date) =>
																								setFieldValue(
																									'pickup_date',
																									date
																								)}
																							value={values.pickup_date}
																							placeholder='Pickup Date'
																						/>

																						<ErrorMessage name='pickup_date' />
																					</div>
																				</div>
																				<div className='col-12 col-md-6'>
																					<div className='field-box'>
																						<label className='d-block'>
																							Drop off Date
																						</label>

																						<DatePicker
																							name='drop_off_date'
																							className='form-control'
																							type='date'
																							date={values.drop_off_date}
																							minDate={new Date()}
																							onBlur={handleBlur}
																							onChange={(date) =>
																								setFieldValue(
																									'drop_off_date',
																									date
																								)}
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
																						<label className='d-block'>
																							Pickup location
																						</label>

																						<Field
																							name='pickup_location'
																							className='form-control'
																							onBlur={handleBlur}
																							onChange={handleChange}
																							value={
																								values.pickup_location
																							}
																						/>

																						<ErrorMessage name='pickup_location' />
																					</div>
																				</div>
																				<div className='col-12 col-md-6'>
																					<div className='field-box'>
																						<label className='d-block'>
																							Drop off location
																						</label>

																						<Field
																							name='drop_off_location'
																							className='form-control'
																							onBlur={handleBlur}
																							onChange={handleChange}
																							value={
																								values.drop_off_location
																							}
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
																									data.value
																								)}
																							onBlur={handleBlur}
																							className=''
																							checked={
																								values.meals_included
																							}
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
																	</Tab.Pane>
																)
															},
															{
																menuItem: 'Partner Details',
																render: () => (
																	<Tab.Pane attached={false}>
																		<div className='input-section'>
																			<div className='row'>
																				<div className='col-12'>
																					<div className='d-flex justify-content-between'>
																						<h3 className='title'>
																							Assign Partners
																						</h3>
																						<span
																							className='btn btn-primary'
																							onClick={() =>
																								setFieldValue(
																									'partner_services_attributes',
																									[
																										...values.partner_services_attributes,
																										partner_service
																									]
																								)}
																						>
																							Add
																						</span>
																					</div>
																				</div>
																				{values.partner_services_attributes.map(
																					(partner_service, index) => (
																						<div className='col-12 py-2 my-2 bg-body'>
																							<div
																								className='text-right'
																								onClick={() => {
																									values.partner_services_attributes.splice(
																										index,
																										1
																									);
																									setFieldValue(
																										'partners',
																										values.partner_services_attributes
																									);
																								}}
																							>
																								<i className='fas fa-times' />
																							</div>
																							<div className='field-box'>
																								<label>
																									Service Name
																								</label>

																								<Field
																									name={`partner_services_attributes[${index}].name`}
																									className='form-control'
																									type='text'
																									onBlur={handleBlur}
																									onChange={
																										handleChange
																									}
																									value={
																										values
																											.partner_services_attributes[
																											index
																										].name
																									}
																								/>

																								<ErrorMessage
																									name={`partner_services_attributes[${index}].name`}
																								/>
																							</div>

																							<div className='field-box'>
																								<label htmlFor=''>
																									Select Partner
																								</label>
																								<Dropdown
																									className='form-control'
																									name={`partner_services_attributes[${index}].partner_id`}
																									placeholder='Select Partner'
																									onBlur={handleBlur}
																									onChange={(
																										e,
																										data
																									) => {
																										setFieldValue(
																											`partner_services_attributes[${index}].partner_id`,
																											data.value
																										);
																									}}
																									value={
																										values
																											.partner_services_attributes[
																											index
																										].partner_id
																									}
																									fluid
																									search
																									selection
																									options={partners.map(
																										function(
																											partner
																										) {
																											name =
																												partner.first_name +
																												' ' +
																												partner.last_name;
																											return {
																												key:
																													partner.id,
																												value:
																													partner.id,
																												text: name
																											};
																										}
																									)}
																								/>
																								<ErrorMessage
																									name={`partner_services_attributes[${index}].partner_id`}
																								/>
																							</div>

																							<div className='field-box'>
																								<label>
																									Service Details
																								</label>

																								<Field
																									component='textarea'
																									rows='4'
																									name={`partner_services_attributes[${index}].details`}
																									className='form-control'
																									onBlur={handleBlur}
																									onChange={(
																										e,
																										data
																									) => {
																										setFieldValue(
																											`partner_services_attributes[${index}].details`,
																											e.target
																												.value
																										);
																									}}
																									value={
																										values
																											.partner_services_attributes[
																											index
																										].details
																									}
																								/>

																								<ErrorMessage
																									name={`partner_services_attributes[${index}].details`}
																								/>
																							</div>
																						</div>
																					)
																				)}
																			</div>
																		</div>
																	</Tab.Pane>
																)
															}
														]}
													/>
												</div>
												<div className='input-section'>
													<div className='text-center'>
														<button
															className='btn btn-secondary m-2'
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
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default EditInquiry;
