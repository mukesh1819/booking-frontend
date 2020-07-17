import React, {Component, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {signIn} from '../../api/sessions';
import history from '../../history';
import {loginUser} from '../../redux/actions';
import {connect} from 'react-redux';
import {NavBar} from '../shared';
import {Link, Redirect} from 'react-router-dom';
import SocialLinks from './SocialLinks';
import {roleBasedUrl} from '../../helpers';
import * as yup from 'yup';
import {Segment} from 'semantic-ui-react';

export const EmailPrompt = (props) => {
	const [loading, setLoading] = useState(false);
	const emailPromptSchema = yup.object().shape({
		email: yup.string().email().required('Required')
	});
	return (
		<Segment loading={loading}>
			<Formik
				initialValues={{
					email: ''
				}}
				validationSchema={emailPromptSchema}
				onSubmit={async (values, {setSubmitting, setStatus}) => {
					setLoading(true);
					props.onSubmit(values);
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
					<div className='card p-2'>
						<div className='card-body'>
							<div className='text-small'>Please Provide your email address</div>
							<form onSubmit={handleSubmit} className='form-wrap'>
								<div className='fields'>
									<div className='field'>
										<label>Email</label>

										<Field
											type='text'
											name='email'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.email}
											placeholder='Email'
										/>
										<ErrorMessage name='email' />
									</div>
								</div>
								<button className='btn btn-secondary my-2 w-100' type='submit' disabled={isSubmitting}>
									Submit
								</button>
							</form>
						</div>
					</div>
				)}
			</Formik>
		</Segment>
	);
};

export const ChangePassword = () => {
	const [loading, setLoading] = useState(false);
	const changePasswordSchema = yup.object().shape({
		password: yup.string().required('Required'),
		confirm_password: yup.string().required('Required')
	});
	return (
		<Segment loading={loading}>
			<Formik
				initialValues={{
					password: '',
					confirm_password: ''
				}}
				validationSchema={changePasswordSchema}
				onSubmit={async (values, {setSubmitting, setStatus}) => {
					setLoading(true);
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
					<div className='login-form card p-2'>
						<div className='card-body'>
							<div className='text-small'>Please enter new password</div>
							<form onSubmit={handleSubmit} className='form-wrap'>
								<div className='fields'>
									<div className='field'>
										<label>New Password</label>

										<Field
											type='password'
											name='password'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.password}
											placeholder='New Password'
										/>
										<ErrorMessage name='password' />
									</div>
									<div className='field'>
										<label>Confirm Password</label>

										<Field
											type='password'
											name='confirm_password'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.confirm_password}
											placeholder='Confirm Password'
										/>
										<ErrorMessage name='confirm_password' />
									</div>
								</div>
								<button className='btn btn-secondary my-2 w-100' type='submit' disabled={isSubmitting}>
									Submit
								</button>
							</form>
						</div>
					</div>
				)}
			</Formik>
		</Segment>
	);
};