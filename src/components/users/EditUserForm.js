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

class EditUserForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userDetails: {},
			updated: false
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchDetails();
	}

	fetchDetails = () => {
		getUserDetails()
			.then((response) => {
				this.setState({
					userDetails: response.data.user
				});
				// console.log(response.data.user);
			})
			.catch((error) => {
				// console.log(error);
				this.setState({
					error
				});
				console.log(' user fetch error', error);
			});
	};

	render() {
		// const { user } = this.props;
		const {countries} = this.props;
		const {user} = this.props.location.state ? this.props.location.state : '';
		const UpdateSignupForm = yup.object().shape({
			email: yup.string().email().required('Required'),
			password_confirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match!")
		});

		if (!user) {
			return <Redirect to='/profile'> </Redirect>;
		}

		return (
			<div className='container '>
				<div className='login-page'>
					<div className='card login-form'>
						<div className='card-body'>
							<h3 className='title'> Edit </h3>
							<Formik
								initialValues={{
									id: user.id,
									name: user.name,
									email: user.email,
									password: '',
									password_confirmation: '',
									country: user.country
								}}
								validationSchema={UpdateSignupForm}
								onSubmit={(values, {setSubmitting, setStatus}) => {
									const variables = {
										id: values.id,
										name: values.name,
										email: values.email,
										country: values.country,
										password: values.password,
										password_confirmation: values.password_confirmation
									};
									updateUserDetails(variables.id, variables)
										.then((response) => {
											setSubmitting(false);
											this.setState({
												userDetails: response.data.user
											});
											// console.log(response.data.user);
											// history.push(`/profile/${this.state.userDetails.idx}`);
											history.goBack();
										})
										.catch((error) => {
											// console.log(error);
											setSubmitting(false);
											this.setState({
												error
											});
											console.log(' user update error', error);
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
									<form onSubmit={handleSubmit} className='form-wrap mt-4'>
										<div className='row'>
											<div className='col-12'>
												<Form.Field>
													<label> Name </label>
													<Form.Input
														fluid
														icon='fas fa-user'
														iconPosition='left'
														name='name'
														className=''
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.name}
													/>
												</Form.Field>

												<Form.Field>
													<label> Email </label>
													<Form.Input
														fluid
														icon='fas fa-user'
														iconPosition='left'
														type='text'
														name='email'
														className=''
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.email}
													/>
													<ErrorMessage name='email' />
												</Form.Field>

												<Form.Field>
													<label> Country </label>
													<Dropdown
														className='form-control'
														name='country'
														placeholder='Select Country'
														onBlur={handleBlur}
														onChange={(e, data) => {
															setFieldValue(`country`, data.value);
														}}
														value={values.country}
														search
														options={countries.map((country) => {
															return {
																key: country.key,
																value: country.value,
																text: country.text,
																flag: country.flag
															};
														})}
													/>
												</Form.Field>

												<Form.Field>
													<label>
														Password
														<span className='text-small'>
															(leave blank if you don 't want to change it)
														</span>{' '}
													</label>
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
											Update
										</button>
									</form>
								)}
							</Formik>
							<br />
							<hr />
							<h3 className='text-center'> Deactivate the account </h3>
							<div className='text-center'>
								<button className='btn btn-danger m-2' type='submit'>
									Deactivate
								</button>
							</div>
						</div>
					</div>
				</div>
				<br />
			</div>
		);
	}
}

const mapStateToProps = ({extras}) => ({
	countries: extras.countries
});
export default connect(mapStateToProps)(EditUserForm);
