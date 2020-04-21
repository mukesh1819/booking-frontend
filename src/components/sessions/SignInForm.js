import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {signIn} from '../../api/sessions';
import history from '../../history';
import {loginUser} from '../../redux/actions';
import {connect} from 'react-redux';
import {NavBar} from '../shared';
import {Link, Redirect} from 'react-router-dom';
import SocialLinks from './SocialLinks';

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {currentUser} = this.props;
		var redirectUrl = '/';
		if (this.props.location.state !== undefined) {
			redirectUrl = this.props.location.state.from.pathname;
		}
		// if (currentUser.email !== undefined) {
		// 	return <Redirect to={redirectUrl} />;
		// }
		return (
			<div className='container login-page'>
				<div className='row justify-content-center align-items-center'>
					<div className='col-12 col-md-4 p-0'>
						<Formik
							initialValues={{
								email: '',
								password: ''
							}}
							onSubmit={async (values, {setSubmitting, setStatus}) => {
								const variables = {
									user: {
										email: values.email,
										password: values.password
									}
								};
								signIn(variables)
									.then((response) => {
										setSubmitting(false);
										// console.log('Sign IN response', response.data);
										if (response.data.user !== undefined) {
											// console.log('Logged In user', response);
											this.props.loginUser(response.data.user);
											localStorage.setItem('token', response.data.jwt);
											history.push(redirectUrl);
										} else {
											swal({
												title: 'Sign In Failed!',
												text: response.data.failure,
												icon: 'error',
												button: 'Try Again!'
											});
										}
									})
									.catch((error) => {
										// console.log('SIGN IN error', error);
										swal({
											title: 'Something Went Wrong!',
											text: '........!',
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
								<div className=''>
									<div className='login-form card p-2'>
										<div className='card-body'>
											<h3>Log in</h3>
											<div className='text-small'>
												Don't have an account? <Link to='/signup'>Create Account</Link>
											</div>
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
															placeholder='Password'
														/>
													</div>
													<div className='text-small'>
														<Link to='/forgot'>Forgot Password?</Link>
													</div>
												</div>
												<button
													className='btn btn-secondary my-2 w-100'
													type='submit'
													disabled={isSubmitting}
												>
													Sign In
												</button>
												<hr />
												<div className='text-center text-small mb-2'>Sign In with </div>
												<SocialLinks redirectUrl={redirectUrl} />
											</form>
										</div>
									</div>
								</div>
							)}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userStore}) => {
	return {
		currentUser: userStore.currentUser
	};
};

const mapDispatchToProps = {
	loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
