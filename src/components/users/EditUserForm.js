import React, {Component} from 'react';
import {getUserDetails, updateUserDetails} from '../../api/userApi';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {passCsrfToken} from '../../helpers';
import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import ErrorMessage from '../ErrorMessage';
import history from '../../history';
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import {Dropdown} from 'semantic-ui-react';
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
				swal({
					title: 'User fetch error',
					text: 'could not able to find user. please try again or contact us',
					icon: 'error',
					button: 'Try Again!'
				});
			});
	};

	render() {
		// const { user } = this.props;
		const {countries} = this.props;
		const {user} = this.props.location.state ? this.props.location.state : '';
		const UpdateSignupForm = yup.object().shape({
			password_confirmation: yup
				.string()
				.oneOf([yup.ref('password'), null], "Passwords don't match!")
				
		});

		if (!user) {
			return <Redirect to='/profile'> </Redirect>;
		}

		return (
			<div className='container'>
				<div className='main'>
					<br />
					<h2 className='text-center'> Edit </h2>
					<div className='card'>
						<div className='card-body'>
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
										user: {
											id: values.id,
											name: values.name,
											email: values.email,
											country: values.country,
											password: values.password,
											password_confirmation: values.password_confirmation
										}
									};
									updateUserDetails(variables)
										.then((response) => {
											setSubmitting(false);
											this.setState({
												userDetails: response.data.user
											});
											// console.log(response.data.user);
											history.push('/profile');
										})
										.catch((error) => {
											// console.log(error);
											setSubmitting(false);
											this.setState({
												error
											});
											swal({
												title: 'User Update error',
												text: 'could not able to update user.. please try again or contact us',
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
									<form onSubmit={handleSubmit} className='form-wrap mt-4'>
										<div className='row'>
											<div className='col-md-6 d-flex align-items-end'>
												<label> Name </label>
											</div>
											<div className='col-md-6'>
												<Field
													type='text'
													name='name'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.name}
												/>
											</div>
										</div>
										<div className='row'>
											<div className='col-md-6 d-flex align-items-end'>
												<label> Email </label>
											</div>
											<div className='col-md-6'>
												<Field
													type='text'
													name='email'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.email}
												/>
											</div>
										</div>
										<div className='row'>
											<div className='col-md-6 d-flex align-items-end'>
												<label> Country </label>
											</div>
										
											<div className='col-md-6'>
												<Dropdown
													className='form-control'
													name='country'
													placeholder='Select Country'
													onBlur={handleBlur}
													onChange={(e, data) => {
														setFieldValue(
															`country`,
															data.value
														);
													}}
													value={values.country}
													Ffluid
													search
													selection
													options={countries.map((country) => {
														return {
															key: country.key,
															value: country.text,
															text: country.text,
															flag: country.flag
														};
													})}
												/>
											</div>
										</div>

										<div className='row'>
											<div className='col-md-6 d-flex align-items-center'>
												<label> Password </label>
												<span> (leave blank if you don 't want to change it)</span>
											</div>
											<div className='col-md-6'>
												<Field
													type='password'
													name='password'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.password}
												/>
											</div>
										</div>
										<div className='row'>
											<div className='col-md-6 d-flex align-items-end'>
												<label> Password Confirmation </label>
											</div>
											<div className='col-md-6'>
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
							<h3 className='text-center'> Cancel my account </h3>
							<p className='text-center'> Unhappy ? </p>
							<div className='text-center'>
								<button className='btn btn-danger m-2' type='submit'>
									Cancel my account
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
