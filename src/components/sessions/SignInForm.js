import React, {Component} from 'react';
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

class SignInForm extends Component {
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
		const {currentUser} = this.props;
		const {loading} = this.state;
		var redirectUrl = '/';
		const UsersSigninForm = yup.object().shape({
			email: yup.string().email().required('Required'),
			password: yup.string().required('Required')
		});
		if (this.props.location.state !== undefined) {
			redirectUrl = this.props.location.state.from.pathname;
		}
		// if (currentUser.email !== undefined) {
		// 	return <Redirect to={redirectUrl} />;
		// }
		return (
			<div className='container full-page'>
				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					validationSchema={UsersSigninForm}
					onSubmit={async (values, {setSubmitting, setStatus}) => {
						this.setState({
							loading: true
						});
						const variables = {
							user: {
								email: values.email,
								password: values.password
							}
						};
						signIn(variables)
							.then((response) => {
								setSubmitting(false);
								if (response.data.user !== undefined) {
									// console.log('Logged In user', response);
									this.props.loginUser(response.data.user);
									localStorage.setItem('token', response.data.jwt);
									var path = roleBasedUrl(response.data.user.role, redirectUrl);
									history.push(path);
								} else {
									console.log('sign in failed error');
								}
								this.setState({
									loading: false
								});
							})
							.catch((error) => {
								console.log('SIGN IN failed error', error);
								this.setState({
									loading: false
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
						<Segment loading={loading}>
							<div className='login-form card p-2'>
								<div className='card-body'>
									<h3>Login</h3>
									<div className='text-small'>
										Don't have an account?{' '}
										<Link to={{pathname: '/signup', state: {from: redirectUrl}}}>
											Create Account
										</Link>
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
														<ErrorMessage name='email' />
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
												<ErrorMessage name='password' />
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
										<div className='text-center text-small mb-2'>Sign in with </div>
										<SocialLinks
											redirectUrl={redirectUrl}
											setLoading={(status) => this.setLoading(status)}
										/>
									</form>
								</div>
							</div>
						</Segment>
					)}
				</Formik>
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
