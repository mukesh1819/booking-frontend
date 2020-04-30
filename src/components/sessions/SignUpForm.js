import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import {createUser} from '../../api/sessions';
import history from '../../history';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL} from '../../constants';
import {loginUser} from '../../redux/actions';
import * as yup from 'yup';
import {connect} from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import {Link} from 'react-router-dom';
import SocialLinks from './SocialLinks';
import {passCsrfToken} from '../../helpers';
import axios from 'axios';
import {sortObjectBy} from '../../helpers';
import {Dropdown, Input, Segment} from 'semantic-ui-react';
import swal from 'sweetalert';

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	setLoading = (value) => {
		this.setState({
			loading: value
		});
	};

	render() {
		const {outboundFlights, inboundFlights, selectedInboundFlight, selectedOutboundFlight, countries} = this.props;
		const {loading} = this.state;
		const UsersSignupForm = yup.object().shape({
			password: yup.string().required('Required'),
			password_confirmation: yup
				.string()
				.oneOf([yup.ref('password'), null], "Passwords don't match!")
				.required('Required')
		});

		var sortedCountries = sortObjectBy(countries, 'code');
		var redirectUrl = '/';
		if (this.props.location.state !== undefined) {
			redirectUrl = this.props.location.state.from;
		}
		debugger;
		return (
			<div className='container full-page'>
				<Formik
					initialValues={{
						name: '',
						email: '',
						code: '',
						phone_number: '',
						password: '',
						password_confirmation: ''
					}}
					validationSchema={UsersSignupForm}
					onSubmit={(values, {setSubmitting, setStatus}) => {
						this.setLoading(true);
						const variables = {
							user: {
								name: values.name,
								email: values.email,
								code: values.code,
								phone_number: values.phone_number,
								password: values.password,
								password_confirmation: values.password_confirmation
							}
						};
						createUser(variables)
							.then((response) => {
								localStorage.setItem('token', response.data.jwt);
								// console.log(response);
								this.props.loginUser(response.data.user);
								this.setLoading(true);

								setSubmitting(false);
								history.push(redirectUrl);
							})
							.catch((error) => {
								setSubmitting(false);
								this.setLoading(true);
								console.log(' signup failed error', error);
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
						<Segment loading={loading}>
							<form onSubmit={handleSubmit} className='form-wrap'>
								<div className=''>
									<div className='login-form card p-2'>
										<div className='card-body'>
											<h3>Sign Up</h3>
											<div className='text-small'>
												Already have an account? <Link to='/login'>Sign In</Link>
											</div>
											<div className='fields'>
												<div className='field-box'>
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

												<div className='field-box'>
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

												<div className='field-box'>
													<label>Mobile Number</label>
													<Input
														label={
															<Dropdown
																className=''
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
																		text: country.code
																	};
																})}
															/>
														}
														labelPosition='left'
														placeholder='Mobile Number'
														type='text'
														name='phone_number'
														className='semantic-input-group'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.phone_number}
													/>
												</div>

												<div className='field-box'>
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

												<div className='field-box'>
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
											</div>

											<button
												className='btn btn-secondary my-2 w-100'
												type='submit'
												disabled={isSubmitting}
											>
												Submit
											</button>

											<hr />
											<div className='text-center text-small mb-2'>Sign In with </div>
											<SocialLinks
												redirectUrl={redirectUrl}
												setLoading={(status) => this.setLoading(status)}
											/>
										</div>
									</div>
								</div>
							</form>
						</Segment>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = ({currentUser, extras}) => {
	return {
		countries: extras.countries,
		currentUser
	};
};

const mapDispatchToProps = {
	loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
