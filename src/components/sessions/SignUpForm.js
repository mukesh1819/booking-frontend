import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import {createUser} from '../../api/sessions';
import history from '../../history';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL} from '../../constants';
import {loginUser} from '../../redux/actions/sessions';
import * as yup from 'yup';
import {connect} from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import {Link} from 'react-router-dom';

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}

	render() {
		const {outboundFlights, inboundFlights, selectedInboundFlight, selectedOutboundFlight} = this.props;
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
					password_confirmation: ''
				}}
				validationSchema={UsersSignupForm}
				onSubmit={(values, {setSubmitting, setStatus}) => {
					const variables = {
						user: {
							name: values.name,
							email: values.email,
							phone_number: values.phone_number,
							password: values.password,
							password_confirmation: values.password_confirmation
						}
					};

					createUser(variables)
						.then((response) => {
							localStorage.setItem('token', response.data.jwt);
							this.props.loginUser(response.data.user);
							setSubmitting(false);
							history.push('/');
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
						<div className='login-page'>
							<div className='login-form card p-2'>
								<div className='card-body'>
									<h4>Sign Up</h4>
									{this.state.error}
									<div class='text-small'>
										Already have an account? <Link to='/login'>Sign In</Link>
									</div>
									<div className='input-section'>
										<div className='field'>
											<label>Full Name</label>

											<Field
												type='text'
												name='name'
												className='form-control'
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.name}
												placeholder='Full Name'
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
												placeholder='Email'
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
												placeholder='Mobile Number'
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
												placeholder='Passsword'
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
												placeholder='Passsword Confirmation'
											/>
											<ErrorMessage name='password_confirmation' />
										</div>

										<button
											className='btn btn-secondary my-2 w-100'
											type='submit'
											disabled={isSubmitting}
										>
											Submit
										</button>

										<hr />

										<div class='text-center text-small'>Sign In with </div>
										<div className='row'>
											<div className='btn-group col-6'>
												<a className='btn btn-danger disabled'>
													<i className='icon-google' />
												</a>
												<a className='btn btn-danger' href={GOOGLE_AUTH_URL}>
													Google
												</a>
											</div>
											<div className='btn-group col-6'>
												<a className='btn bg-fb disabled'>
													<i className='icon-facebook' />
												</a>
												<a className='btn bg-fb' href={FACEBOOK_AUTH_URL}>
													Facebook
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				)}
			</Formik>
		);
	}
}

const mapStateToProps = ({currentUser}) => {
	return {
		currentUser
	};
};

const mapDispatchToProps = {
	loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
