import React, {Component} from 'react';
import Package from './Package';

import {getFlights} from '../../api/flightApi';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../utils/helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import Counter from '../shared/Counter';

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

	componentDidMount() {}

	render() {
		const {countries} = this.props;
		const inquiryDetails = {
			name: 'Anup',
			email_address: 'anup.singh2071@gmail.com',
			nationality: 'nepal',
			phone: '2309',
			preferred_date: 'dfjl',
			preferred_time: 'dfjl',
			comments: 'djfla',
			no_of_pax: 10,
			user_id: 1,
			package_id: 1
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
									<label>Going from</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
										<Field
											name='name'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.name}
											defaultValue=''
										/>
									</IconInput>
									<ErrorMessage name='name' />
								</div>
								<div className='field-box'>
									<label>Going from</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
										<Field
											name='name'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.name}
											defaultValue=''
										/>
									</IconInput>
									<ErrorMessage name='name' />
								</div>
								<div className='field-box'>
									<label>Going from</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
										<Field
											name='name'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.name}
											defaultValue=''
										/>
									</IconInput>
									<ErrorMessage name='name' />
								</div>
								<div className='field-box'>
									<label>Going from</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
										<Field
											name='name'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.name}
											defaultValue=''
										/>
									</IconInput>
									<ErrorMessage name='name' />
								</div>
								<div className='field-box'>
									<label>Going from</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
										<Field
											name='name'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.name}
											defaultValue=''
										/>
									</IconInput>
									<ErrorMessage name='name' />
								</div>
								<Counter
									id='intChild'
									type='number'
									className='m-1'
									title={`1 Person`}
									onChange={(value) => setFieldValue('intChild', value)}
									value={1}
								/>

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
