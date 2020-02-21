import React, {Component} from 'react';
import SignUpForm from '../sessions/SignUpForm';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {createUser} from '../../api/sessions';
import * as yup from 'yup';
import history from '../../history';

const CreateUser = () => {
	const UsersSignupForm = yup.object().shape({
		password: yup.string().required('Required'),
		password_confirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], "Passwords don't match!")
			.required('Required')
	});
	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				phone_number: '',
				password: '',
				password_confirmation: '',
				role_id: '1'
			}}
			validationSchema={UsersSignupForm}
			onSubmit={(values, {setSubmitting, setStatus}) => {
				const variables = {
					user: {
						name: values.name,
						email: values.email,
						phone_number: values.phone_number,
						password: values.password,
						password_confirmation: values.password_confirmation,
						role_id: values.role_id
					}
				};
				createUser(variables)
					.then((response) => {
						setSubmitting(false);
						console.log(response.data.message);
						window.location.reload();
					})
					.catch((error) => {
						setSubmitting(false);
						console.log(error);
						// this.setState({
						// 	error
						// });
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
				<form onSubmit={handleSubmit} className='form-wrap'>
					<div className='bg-accent full-height d-flex justify-content-around p-4 align-items-center'>
						<div className='card'>
							<div className='card-body'>
								<h2>Sign Up</h2>
								<div className='field'>
									<label>Full Name</label>

									<Field
										type='text'
										name='name'
										className='form-control'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.name}
									/>
								</div>

								<div className='field'>
									<label>Email</label>

									<Field
										type='text'
										name='email'
										className='form-control'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.email}
									/>
								</div>

								<div className='field'>
									<label>Mobile Number</label>

									<Field
										type='text'
										name='phone_number'
										className='form-control'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.phone_number}
									/>
								</div>

								<div className='field'>
									<label>Password</label>

									<Field
										type='password'
										name='password'
										className='form-control'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.password}
									/>
								</div>

								<div className='field'>
									<label>Password Confirmation</label>

									<Field
										type='password'
										name='password_confirmation'
										className='form-control'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.password_confirmation}
									/>
									<ErrorMessage name='password_confirmation' />
								</div>

								<div className='field'>
									<label>Role</label>
									<Field
										as='select'
										name='role_id'
										id='role_id'
										className='form-control'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.role_id}
									>
										<option value='1'> Admin </option>
										<option value='2'> Support </option>
										<option value='3'> General </option>
									</Field>
								</div>

								<button className='btn btn-primary m-2' type='submit' disabled={isSubmitting}>
									Submit
								</button>
							</div>
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
};
export default CreateUser;
