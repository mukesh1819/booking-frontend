import React, {Component} from 'react';
import Package from './Package';

import {getCategories} from '../../api/categoryApi';
import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker} from '../shared';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Input, Form, Checkbox, TextArea} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {createInquiry, updateInquiry} from '../../api/inquiryApi';
import {sortObjectBy, phoneValidate} from '../../helpers';

class InquiryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		var date = new Date();
		date.setDate(date.getDate() + 2);
	}

	componentDidMount() {
		this.fetchDetails();
	}

	fetchDetails() {
		getCategories().then((res) => {
			console.log('TODO ', res);
		});
	}

	render() {
		const {countries} = this.props;
		const {inquiry} = this.props.inquiry != null ? this.props : {inquiry: {}};
		const aPackage = inquiry.package != null ? inquiry.package : this.props.location.state.aPackage;
		const InquiriesSchema = yup.object().shape({
			first_name: yup.string().required('Required'),
			last_name: yup.string().required('Required'),
			email_address: yup.string().email().required('Required'),
			phone: phoneValidate(yup).required('Required'),
			nationality: yup.string().required('Required'),
			address: yup.string().required('Required'),
			city: yup.string().required('Required'),
			preferred_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			head_traveller_name: yup.string().required('Required')
		});

		const inquiryDetails = {
			first_name: inquiry.first_name,
			last_name: inquiry.last_name,
			email_address: inquiry.email_address,
			nationality: inquiry.nationality,
			phone: inquiry.phone,
			address: inquiry.address,
			city: inquiry.city,
			zip_code: inquiry.zip_code,
			preferred_date: inquiry.preferred_date == null ? new Date() : new Date(inquiry.preferred_date),
			traveller: inquiry.head_traveller_name == null ? false : true,
			query: inquiry.query,
			number_of_adult: inquiry.number_of_adult == null ? 1 : inquiry.number_of_adult,
			number_of_child: inquiry.number_of_child == null ? 0 : inquiry.number_of_child,
			head_traveller_name: inquiry.head_traveller_name,
			activity_id: null,
			package_id: inquiry.package != null ? inquiry.package.id : aPackage.id
		};

		var sortedCountries = sortObjectBy(countries, 'code');
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
						if (inquiry.id != null) {
							updateInquiry(inquiry.idx, values)
								.then((response) => {
									swal({
										title: 'Inquiry updated!',
										text: response.data.message,
										icon: 'Success',
										button: 'Continue'
									});
								})
								.catch((error) => {
									console.log('Update Inquiry Error', error);
								});
						} else {
							createInquiry(values)
								.then((response) => {
									setSubmitting(false);
									swal({
										title: 'Inquiry Submitted!',
										text: response.data.message,
										icon: 'Success',
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
								<div className='input-section bg-white'>
									<div className='row'>
										<div className='col-12'>
											<span className=''>Package Name: </span>&nbsp;
											<span className='text-primary title'>{aPackage.name}</span>
										</div>
										{aPackage.activities &&
										aPackage.activities.length > 0 && (
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label>Select Activity</label>
													<Dropdown
														className=''
														name='activity_id'
														placeholder='Select activities'
														onBlur={handleBlur}
														onChange={(e, data) => {
															setFieldValue(`activity_id`, data.value);
														}}
														value={values.activity_id}
														fluid
														search
														selection
														options={aPackage.activities.map(function(activity) {
															return {
																key: activity.id,
																value: activity.id,
																text: activity.description
															};
														})}
													/>
													<ErrorMessage name='preferred_date' />
												</div>
											</div>
										)}
										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label className='d-block'>Preferred date</label>
												<DatePicker
													name='preferred_date'
													className=' w-100'
													type='date'
													date={values.preferred_date}
													minDate={new Date()}
													maxDate={addDays(new Date(), 365)}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('preferred_date', date)}
													value={values.preferred_date}
													placeholder='Arrival Date'
												/>
												<ErrorMessage name='preferred_date' />
											</div>
										</div>
									</div>
								</div>
								<div className='inquirer-details '>
									<div className='input-section  bg-primary-light'>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<Form.Field>
														<label>First Name</label>
														<Form.Input
															fluid
															icon='fas fa-user'
															iconPosition='left'
															name='first_name'
															className=''
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.first_name}
															placeholder='First Name'
														/>
													</Form.Field>
													<ErrorMessage name='first_name' />
												</div>
											</div>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<Form.Field>
														<label>Last Name</label>
														<Form.Input
															fluid
															icon='fas fa-user'
															iconPosition='left'
															name='last_name'
															className=''
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.last_name}
															placeholder='Last Name'
														/>
													</Form.Field>
													<ErrorMessage name='last_name' />
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<Form.Field>
														<label>Email Address</label>
														<Form.Input
															fluid
															icon='fas fa-envelope'
															iconPosition='left'
															name='email_address'
															className=''
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.email_address}
															placeholder='Email Address'
														/>
													</Form.Field>
													<ErrorMessage name='email_address' />
												</div>
											</div>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<Form.Field>
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
															fluid
															name='phone'
															className='semantic-input-group'
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.phone}
															placeholder='Mobile Number'
														/>
													</Form.Field>
													<ErrorMessage name='phone' />
												</div>
											</div>
										</div>

										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label htmlFor=''>Country</label>
													<Dropdown
														className=' btn-dropdown'
														name='nationality'
														icon='fas fa-globe'
														placeholder='Select Country'
														onBlur={handleBlur}
														onChange={(e, data) => {
															setFieldValue(`nationality`, data.value);
														}}
														value={values.nationality}
														fluid
														search
														selection
														options={countries}
													/>
													<ErrorMessage name='nationality' />
												</div>
											</div>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<Form.Field>
														<label>City</label>
														<Form.Input
															fluid
															icon='fas fa-city'
															iconPosition='left'
															name='city'
															className=''
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.city}
															placeholder='City'
														/>
													</Form.Field>
													<ErrorMessage name='city' />
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<Form.Field>
														<label>Address</label>
														<Form.Input
															fluid
															icon='fas fa-address'
															iconPosition='left'
															name='address'
															className=''
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.address}
															placeholder='Address'
														/>
													</Form.Field>
													<ErrorMessage name='address' />
												</div>
											</div>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<Form.Field>
														<label>Zip Code</label>
														<Form.Input
															fluid
															icon='fas fa-mail-bulk'
															iconPosition='left'
															name='zip_code'
															type='number'
															className=''
															onBlur={handleBlur}
															onChange={handleChange}
															value={values.zip_code}
															placeholder='Zip Code'
														/>
													</Form.Field>
												</div>
											</div>
										</div>
										<div className='col-12'>
											<div className='field-box'>
												<Checkbox
													label={'I am one of the traveller'}
													onChange={(event, data) => {
														setFieldValue('traveller', data.checked);
														data.checked &&
															setFieldValue('head_traveller_name', values.first_name);
													}}
													name='traveller'
													className=''
													type='checkbox'
													checked={values.traveller}
													onBlur={handleBlur}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className='traveller-details '>
									<div className='input-section bg-white'>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label htmlFor=''>Number of Travellers (Adult ,Child)</label>
													<Dropdown
														name=''
														placeholder='Select traveller'
														icon='icon-users'
														className='icon btn-dropdown travellers'
														iconPosition='left'
														fluid
														selection
														closeOnChange={false}
														placeholder={`${values.number_of_adult} Adult${ifNotZero(
															values.number_of_child,
															`, ${values.number_of_child} Child`
														)}`}
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
																		id='number_of_adult'
																		type='number'
																		className='m-1'
																		onBlur={handleBlur}
																		title={`${values.number_of_adult} Adult`}
																		onChange={(value) =>
																			setFieldValue('number_of_adult', value)}
																		value={values.number_of_adult}
																	/>
																	<Counter
																		id='number_of_child'
																		type='number'
																		className='m-1'
																		onBlur={handleBlur}
																		title={`${values.number_of_child} Child`}
																		onChange={(value) =>
																			setFieldValue('number_of_child', value)}
																		value={values.number_of_child}
																	/>
																</div>
															}
														/>
													</Dropdown>
													<ErrorMessage name='number_of_adult' />
													<ErrorMessage name='number_of_child' />
												</div>
											</div>
											<div className='col-12 col-md-6'>
												{!values.traveller && (
													<div className='field-box'>
														<Form.Field>
															<label>Head Traveller Name</label>
															<Form.Input
																fluid
																icon='fas fa-user'
																iconPosition='left'
																name='head_traveller_name'
																className=''
																onBlur={handleBlur}
																onChange={handleChange}
																value={values.head_traveller_name}
																placeholder='Name of Head Traveller'
															/>
														</Form.Field>
														<ErrorMessage name='head_traveller_name' />
													</div>
												)}
											</div>
											<div className='col-12'>
												<div className='field-box'>
													<label htmlFor=''>Special Request</label>
													<label className='small d-block'>
														Please fill in case you have any special request / query.
													</label>
													<TextArea
														className='form-control'
														name='query'
														placeholder='Any Queries?'
														onBlur={handleBlur}
														onChange={(e, data) => {
															setFieldValue(`query`, e.target.value);
														}}
														value={values.query}
													/>
												</div>

												<div className='text-center'>
													<button
														className='btn btn-primary m-2'
														type='submit'
														disabled={isSubmitting}
													>
														{inquiry.id ? 'Update' : 'Submit'}
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

const mapStateToProps = ({extras}) => ({
	countries: extras.countries
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InquiryForm);
