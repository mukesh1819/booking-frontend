import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {signIn} from '../../api/sessions';
import history from '../../history';
import {loginUser} from '../../redux/actions/sessions';
import {connect} from 'react-redux';
import NavBar from '../NavBar';
import {Link} from 'react-router-dom';

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {outboundFlights, inboundFlights, selectedInboundFlight, selectedOutboundFlight} = this.props;

		return (
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
							this.props.loginUser(response.data.user);
							localStorage.setItem('token', response.data.jwt);
							history.push('/');
							NavBar.forceUpdate();
							console.log(response.data);
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
					<div className='login-page'>
						<div className='login-form card p-2'>
							<div className='card-body'>
								<h4>Log in</h4>
								<div class='text-small'>
									Don't have an account? <Link to='/signup'>Create Account</Link>
								</div>
								<form onSubmit={handleSubmit} className='form-wrap'>
									<div className='input-section'>
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
									</div>
									<div class='text-small'>
										<Link to='/forgot'>Forgot Password?</Link>
									</div>
									<button
										className='btn btn-secondary my-2 w-100'
										type='submit'
										disabled={isSubmitting}
									>
										Sign In
									</button>
								</form>
							</div>
						</div>
					</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
