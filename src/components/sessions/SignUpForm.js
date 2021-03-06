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
import SocialLinks from './SocialLinks';
import {passCsrfToken} from '../../utils/helpers';
import axios from 'axios';
import {sortObjectBy} from '../../utils/helpers';
import {Dropdown, Input} from 'semantic-ui-react';

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		
	}

	componentDidMount(){
		passCsrfToken(document, axios);
		
	}

	render() {
		const {outboundFlights, inboundFlights, selectedInboundFlight, selectedOutboundFlight, countries} = this.props;
		const UsersSignupForm = yup.object().shape({
			password: yup.string().required('Required'),
			password_confirmation: yup
				.string()
				.oneOf([yup.ref('password'), null], "Passwords don't match!")
				.required('Required')
		});

		var sortedCountries = sortObjectBy(countries, 'country_code')

		return (
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
							console.log(response);
							this.props.loginUser(response.data.user);
							setSubmitting(false);
							history.push('/');
						})
						.catch((error) => {
							setSubmitting(false);
							console.log(error);
							swal({
								title: 'Something went wrong!',
								text: 'User was not created!',
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
					<form onSubmit={handleSubmit} className='form-wrap'>
						<div className='login-page'>
							<div className='login-form card p-2'>
								<div className='card-body'>
									<h4>Sign Up</h4>
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

										<div className='field-box'>
											<label>Mobile Number</label>
											<Input
											label={
												<Dropdown  
													className='dropdown'
													defaultValue={values.code}
													name='code'
													placeholder='Select Code'
													onBlur={handleBlur}
													onChange={(e, data) => {
														setFieldValue(
															`code`,
															data.value
														);
													}}
													value={values.code}
													fluid
													search
													selection
													options= {sortedCountries.map((country) => {
																return {
																	key: country.id,
																	value: country.country_code,
																	text:country.country_code,
																	flag: country.country_char.toLowerCase()

																	
																}
															})}
												/>}
												labelPosition='left'
												placeholder='Mobile Number'
												type='text'
												name='phone_number'
												className= "semantic-input-group"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.phone_number}
											/>

										</div>

										{/* <div className='field'>
											<label>Country Code</label>

											<Field
											type='text'
											name='code'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											as='select'
											value={values.code}
											>
											{sortedCountries.map((country) => {
												return (
													<option key={country.id} value={country.id}>
														{country.country_code}
													</option>
												);
											})}
									</Field>
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
										</div> */}

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
										<div class='text-center text-small mb-2'>Sign In with </div>
										<SocialLinks />
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
