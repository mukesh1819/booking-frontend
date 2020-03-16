import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {getCategories} from '../../api/categoriesApi';
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
import Stepper from '../shared/Stepper';

class PackageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partnerIsValid: false
		};
	}

	componentDidMount() {}

	render() {
		const {partnerIsValid} = this.state;
		const {countries} = this.props;
		const partnerDetails = {
			name: '',
			email: '',
			description: '',
			company_address: '',
			contact_number: ''
		};
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						Package Details
						<Formik
							initialValues={partnerDetails}
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
													name='email'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.email}
												/>
											</IconInput>
											<ErrorMessage name='email' />
										</div>
										<div className='field-box'>
											<label>Contact Number</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='contact_number'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.contact_number}
												/>
											</IconInput>
											<ErrorMessage name='contact_number' />
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
											<label htmlFor=''>Description</label>
											<CKEditor data='<p>Hello from CKEditor 4!</p>' />
											<ErrorMessage name='description' />
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
						{partnerIsValid && <a href='btn btn-primary'>Add Packages</a>}
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

export default connect(mapStateToProps, mapDispatchToProps)(PackageForm);
