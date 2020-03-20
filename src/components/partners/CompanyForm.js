import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {updatePartner} from '../../api/partnerApi';
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
import moment from 'moment';
import ReactDOM from 'react-dom';
import LoadingScreen from '../shared/Loading';
import Stepper from '../shared/Stepper';

class CompanyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		const {partnerId, nextStep} = this.props;
		const partnerDetails = {
			company_name: '',
			company_email: '',
			company_address: ''
		};
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						Company Details{' '}
						<Formik
							initialValues={partnerDetails}
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
								console.log(values);
								updatePartner(partnerId, values)
									.then((response) => {
										setSubmitting(false);
										nextStep(response.data);
									})
									.catch((error) => {
										console.log('Update Company Details Error', error);
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
							{' '}
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
											<label> Name </label>{' '}
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='company_name'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.company_name}
												/>{' '}
											</IconInput>{' '}
											<ErrorMessage name='company_name' />
										</div>{' '}
										<div className='field-box'>
											<label> Email Address </label>{' '}
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='company_email'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.company_email}
												/>{' '}
											</IconInput>{' '}
											<ErrorMessage name='company_email' />
										</div>{' '}
										<div className='field-box'>
											<label> Company Address </label>{' '}
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='contact_address'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.contact_address}
												/>{' '}
											</IconInput>{' '}
											<ErrorMessage name='contact_address' />
										</div>{' '}
									</div>{' '}
									<div class='text-center'>
										<button className='btn btn-secondary m-2' type='submit' disabled={isSubmitting}>
											Next{' '}
										</button>{' '}
									</div>{' '}
								</form>
							)}{' '}
						</Formik>{' '}
					</div>{' '}
				</div>{' '}
			</div>
		);
	}
}

const mapStateToProps = ({extras}) => ({
	countries: extras.countries
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
