import React, {Component} from 'react';
import Package from './Package';

import {getCategories} from '../../api/categoryApi';
import {Formik, Form, Field} from 'formik';
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
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {createInquiry} from '../../api/inquiryApi';

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
		const {countries, package_id} = this.props;

		const InquiriesSchema = yup.object().shape({
			first_name: yup.string().required('Required'),
			last_name: yup.string().required('Required'),
			email_address: yup.string().required('Required'),
			phone: yup.number().required('Required'),
			nationality: yup.string().required('Required'),
			address: yup.string().required('Required'),
			city: yup.string().required('Required'),
			preferred_date: yup.date().required('Required').default(function() {
				return new Date();
			}),
			head_traveller_name: yup.string().required('Required')
		});

		const inquiryDetails = {
			first_name: '',
			last_name: '',
			email_address: '',
			nationality: '',
			phone: '',
			address: '',
			city: '',
			zip_code: 977,
			preferred_date: new Date(),
			traveller: false,
			query: '',
			number_of_adult: 1,
			number_of_child: 0,
			head_traveller_name: '',
			package_id: package_id
		};
		return (
			<div className='container p-4'>
				<Formik
					initialValues={inquiryDetails}
					validationSchema={InquiriesSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						console.log(values);
						createInquiry(values)
							.then((response) => {
								setSubmitting(false);
								swal({
									title: 'Inquiry Submitted!',
									text: response.data.message,
									icon: 'Success',
									button: 'Continue'
								});
								history.push();
							})
							.catch((error) => {
								console.log('Search Flight Error', error);
								setSubmitting(false);
								swal({
									title: 'Sorry!',
									text: 'Something went wrong',
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
						<div>
							<h3>
								Kindly submit the query form below to book your trip and we will contact you with the
								confirmed itinerary.
							</h3>
							<form onSubmit={handleSubmit} autoComplete='off'>
								<div className='input-section'>
									<div className='field-box'>
										<label>First Name</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='first_name'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.first_name}
											/>
										</IconInput>
										<ErrorMessage name='first_name' />
									</div>

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

									<div className='field-box'>
										<label>Email Address</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='email_address'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.email_address}
											/>
										</IconInput>
										<ErrorMessage name='email_address' />
									</div>

									<div className='field-box'>
										<label>Mobile Number</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='phone'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.phone}
											/>
										</IconInput>
										<ErrorMessage name='phone' />
									</div>

									<div className='field-box'>
										<label htmlFor=''>Country</label>
										<Dropdown
											className='form-control'
											name='nationality'
											placeholder='Select Country'
											onBlur={handleBlur}
											onChange={(e, data) => {
												setFieldValue(`nationality`, data.value);
											}}
											value={values.nationality}
											fluid
											search
											selection
											options={countries.map(function(country) {
												return {
													key: country.id,
													value: country.country_char,
													flag: country.country_char.toLowerCase(),
													text: country.name
												};
											})}
										/>
										<ErrorMessage name='nationality' />
									</div>

									<div className='field-box'>
										<label>Address</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='address'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.address}
											/>
										</IconInput>
										<ErrorMessage name='address' />
									</div>

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

									<div className='field-box'>
										<label>Zip Code</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='zip_code'
												type='number'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.zip_code}
											/>
										</IconInput>
									</div>

									<div className='field-box'>
										<div className='row mt-3'>
											<div>
												<Field
													name='traveller'
													className=''
													type='checkbox'
													checked={values.traveller}
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.traveller}
												/>
											</div>
											<div className='col-8 ml-0 pl-0 text-left d-flex align-top'>
												<label>I am one of the traveller</label>
											</div>
										</div>
									</div>

									<div className='field-box'>
										<label>Head Traveller Name</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<Field
												name='head_traveller_name'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.head_traveller_name}
											/>
										</IconInput>
										<ErrorMessage name='head_traveller_name' />
									</div>

									<div className='field-box form-group'>
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

									<div className='field-box'>
										<label>Preferred date of activity</label>
										<IconInput icon='icon-paper-plane' iconPosition='left'>
											<div className='col-12'>
												<DatePicker
													name='preferred_date'
													className='form-control'
													type='date'
													date={values.preferred_date}
													minDate={new Date()}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('preferred_date', date)}
													value={values.preferred_date}
													placeholder='Arrival Date'
												/>
											</div>
										</IconInput>
										<ErrorMessage name='preferred_date' />
									</div>

									<div className='field-box'>
										<label htmlFor=''>
											Special Request Please fill in case you have any special request / query.
										</label>
										<Field
											component='textarea'
											rows='2'
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
								</div>

								<div className='text-center'>
									<button className='btn btn-secondary m-2' type='submit' disabled={isSubmitting}>
										Submit
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

const mapStateToProps = ({extras}) => ({
	countries: extras.countries
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InquiryForm);
