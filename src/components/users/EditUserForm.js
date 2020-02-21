import React, {Component} from 'react';
import {getUserDetails, updateUserDetails} from '../../api/userApi';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {passCsrfToken} from '../../utils/helpers';
import {Formik, Form, Field} from 'formik';

class EditUserForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userDetails: {}
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchDetails();
	}

	fetchDetails = () => {
		getUserDetails()
			.then((response) => {
				debugger;
				this.setState({
					userDetails: response.data.user
				});
				console.log(response.data.user);
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					error
				});
			});
	};

	render() {
		// const { user } = this.props;
		const {user} = this.props.location.state;
		return (
			<div className='container'>
				<div className='main'>
					<br />
					<h2 className='text-center'>Edit</h2>
					<div className='card'>
						<div className='card-body'>
							<Formik
								initialValues={{
									id: 1,
									name: user.name,
									email: user.email,
									password: ''
								}}
								onSubmit={(values, {setSubmitting, setStatus}) => {
									const variables = {
										user: {
											id: 1,
											name: values.name,
											email: values.email,
											password: values.password
										}
									};
									updateUserDetails(variables)
										.then((response) => {
											this.setState({
												userDetails: response.data.user
											});
											console.log(response.data.user);
											<Redirect to='/profile' />;
										})
										.catch((error) => {
											console.log(error);
											this.setState({
												error
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
												<label>Name</label>
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
												<label>Email</label>
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
											<div className='col-md-6 d-flex align-items-center'>
												<label>Password</label>
												<span>(leave blank if you don't want to change it)</span>
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
												<label>Password Confirmation</label>
											</div>
											<div className='col-md-6'>
												<Field
													type='password'
													name='password'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.confirm_password}
												/>
											</div>
										</div>

										<br />
										<button
											className='btn btn-primary m-2 btn-block'
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

							<h3 className='text-center'>Cancel my account</h3>

							<p className='text-center'>Unhappy? </p>

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

export default EditUserForm;
