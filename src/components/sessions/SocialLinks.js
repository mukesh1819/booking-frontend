import React, {Component} from 'react';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL} from '../../constants';
import {connect} from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import {Link} from 'react-router-dom';
// import {GoogleAPI, GoogleLogin, GoogleLogout} from 'react-google-oauth';
import {GoogleLogin} from 'react-google-login';
import FacebookAuth from 'react-facebook-auth';
import '../../styles/index.scss';
import {authorizeGoogle, authorizeFb} from '../../api/userApi';
import {loginUser} from '../../redux/actions';
import history from '../../history';
import swal from 'sweetalert';
import GoogleLogo from '../../images/google-logo.png';
import FacebookLogo from '../../images/facebook-logo.png';

const FacebookButton = ({onClick}) => (
	<div className='social-btn' onClick={onClick}>
		<img src={FacebookLogo} className='logo' />
		<span className='btn bg-none pl-4'>Facebook</span>
	</div>
);

const GoogleButton = ({onClick}) => (
	<div className='social-btn' onClick={onClick}>
		<img src={GoogleLogo} className='logo' />
		<span className='btn bg-none pl-4'>Google</span>
	</div>
);

class SocialLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.googleAuthorize = this.googleAuthorize.bind(this);
		this.fbAuthorize = this.fbAuthorize.bind(this);
	}

	googleAuthorize(data) {
		console.log('Google login', data);
		authorizeGoogle(data)
			.then((resp) => {
				console.log('Google Login Successfull', resp);
				this.props.loginUser(resp.data.user);
				localStorage.setItem('token', resp.data.jwt);
				history.push(this.props.redirectUrl);
			})
			.catch((error) => {
				// console.log(resp, 'API Failure');
				swal({
					title: 'Google login error',
					text: 'Something went wrong. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	fbAuthorize(data) {
		// console.log('Google login', data);
		authorizeFb(data)
			.then((resp) => {
				console.log('Google Login Successfull', resp);
				this.props.loginUser(resp.data.user);
				localStorage.setItem('token', resp.data.jwt);
				history.push(this.props.redirectUrl);
			})
			.catch((error) => {
				// console.log(resp, 'API Failure');
				swal({
					title: 'facebook login error',
					text: 'Something went wrong. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	authorizeFailure(error) {
		console.log('AUTHORIZE FAILURE', error);
	}

	render() {
		return (
			<div className='row justify-content-around align-items-center'>
				{/* <GoogleAPI
						clientId='992913406489-fn9i74pm87a5iodelu298r1qh1fgl6vm.apps.googleusercontent.com'
						onUpdateSigninStatus={(f) => console.log('f', f)}
						onInitFailure={(data) => console.log('filed', data)}
					>
						<div>
							<div>
								<GoogleLogin
									onLoginSuccess={(data) => this.googleAuthorize(data)}
									onLoginFailure={(data) => this.authorizeFailure(data)}
									onRequest={(data) => console.log('request', data)}
									text='Google'
								/>
							</div>
						</div>
					</GoogleAPI> */}
				{/* <div>
							<GoogleLogout onLogoutSuccess={(data) => console.log('logout', data)} />
						</div> */}
				<div className='mx-1'>
					<GoogleLogin
						clientId='992913406489-fn9i74pm87a5iodelu298r1qh1fgl6vm.apps.googleusercontent.com'
						render={(renderProps) => (
							<GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} />
						)}
						buttonText='Login'
						onSuccess={(data) => this.googleAuthorize(data)}
						onFailure={(data) => this.authorizeFailure(data)}
						cookiePolicy={'single_host_origin'}
					/>
				</div>

				<div className='mx-1'>
					<FacebookAuth
						appId='861581940937199'
						callback={(data) => this.fbAuthorize(data)}
						component={FacebookButton}
						onFailure={(data) => this.authorizeFailure(data)}
					/>
				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialLinks);
