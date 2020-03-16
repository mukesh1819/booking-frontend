import React, {Component} from 'react';
import Package from './Package';

import {getCategories} from '../../api/categoryApi';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../utils/helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import Counter from '../shared/Counter';
import DatePicker from '../shared/Datepicker';

import IconInput from '../shared/IconInput';
import {Input} from 'semantic-ui-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import ReactDOM from 'react-dom';
import LoadingScreen from '../shared/Loading';

class InquiryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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
		const inquiryDetails = {
			name: '',
			email_address: '',
			nationality: '',
			phone: '',
			preferred_date: new Date(),
			preferred_time: '',
			comments: '',
			no_of_pax: 0,
			package_id: null
		};
		return (
			<div className='container p-4'>
				<Formik
					initialValues={inquiryDetails}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						console.log(values);
						this.props.setSearchDetails(values);
						getFlights(values)
							.then((response) => {
								setSubmitting(false);
								history.push('/');
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
						<form onSubmit={handleSubmit} autoComplete='off'>
							<div className='input-section'>
								<div className='field-box'>
									<label>Name</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
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
									<label>Contact Number</label>
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
									<label>Preffered Date</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
										<DatePicker
											name='preffered_date'
											className='form-control'
											type='date'
											format='dd-mm-YYYY'
											date={values.preferred_date}
											minDate={new Date()}
											onBlur={handleBlur}
											onChange={(date) => setFieldValue('preferred_date', date)}
											value={moment(values.preferred_date).format('D MMM, YYYY')}
											placeholder='Arrival Date'
										/>
									</IconInput>
									<ErrorMessage name='preferred_date' />
								</div>

								<div className='field-box'>
									<label htmlFor=''>Number of Person</label>
									<Counter
										id='no_of_pax'
										type='number'
										className='m-1'
										title={`1 Person`}
										onChange={(value) => setFieldValue('no_of_pax', value)}
										value={values.no_of_pax}
									/>
								</div>

								<div className='field-box'>
									<label htmlFor=''>Nationality</label>
									<Dropdown
										className='form-control'
										name='nationality'
										placeholder='Select Country'
										onBlur={handleBlur}
										onChange={(e, data) => {
											setFieldValue(`nationality`, data.value);
										}}
										value={values.strNationality}
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
									<label htmlFor=''>Queries</label>
									<Field
										component='textarea'
										rows='2'
										className='form-control'
										name='comments'
										placeholder='Any Queries?'
										onBlur={handleBlur}
										onChange={(e, data) => {
											setFieldValue(`comments`, data.value);
										}}
										value={values.comments}
									/>
									<ErrorMessage name='comments' />
								</div>
							</div>
							<div class='text-center'>
								<button
									className='search-btn btn btn-secondary m-2'
									type='submit'
									disabled={isSubmitting}
								>
									Submit
								</button>
							</div>
						</form>
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
