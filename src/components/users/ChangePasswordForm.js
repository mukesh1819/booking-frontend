import React, {Component} from 'react';
import {getUserDetails, updateUserDetails} from '../../api/userApi';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {passCsrfToken} from '../../helpers';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import ErrorMessage from '../ErrorMessage';
import history from '../../history';
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import {Form, Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';

class ChangePasswordForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {onChange} = this.props;
		const UpdateSignupForm = yup.object().shape({
			password_confirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match!")
		});

		return (
			<div className='container '>
				<div className='login-page'>
					<div className='card login-form'>
						<div className='card-body'>
							<Formik
								initialValues={{
									password: '',
									password_confirmation: ''
								}}
								validationSchema={UpdateSignupForm}
								onSubmit={(values, {setSubmitting, setStatus}) => {
									onChange(values);
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
									<form onSubmit={handleSubmit} className='form-wrap mt-4'>
										<div className='row'>
											<div className='col-12'>
												<Form.Field>
													<label>New Password</label>
													<Form.Input
														fluid
														icon='fas fa-user'
														iconPosition='left'
														type='password'
														name='password'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.password}
													/>
												</Form.Field>

												<Form.Field>
													<label>Confirm Password</label>
													<Form.Input
														fluid
														icon='fas fa-user'
														iconPosition='left'
														type='password'
														name='password_confirmation'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.password_confirmation}
													/>
													<ErrorMessage name='password_confirmation' />
												</Form.Field>
											</div>
										</div>
										<br />
										<button
											className='btn btn-secondary m-2 btn-block'
											type='submit'
											disabled={isSubmitting}
										>
											Change My Password
										</button>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
				<br />
			</div>
		);
	}
}

export default ChangePasswordForm;
