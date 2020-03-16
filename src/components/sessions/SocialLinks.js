import React, {Component} from 'react';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL} from '../../constants';
import {connect} from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import {Link} from 'react-router-dom';
import {GoogleAPI, GoogleLogin, GoogleLogout} from 'react-google-oauth';
import FacebookAuth from 'react-facebook-auth';
import '../../styles/index.scss';
import {authorizeGoogle} from '../../api/userApi';
import {loginUser} from '../../redux/actions/sessions';
import {redirectUrl} from '../../utils/helpers';
import history from '../../history';

const FacebookButton = ({onClick}) => (
	<div className='btn-group col-6' onClick={onClick}>
		<a className='btn bg-fb disabled'>
			<i className='icon-facebook' />
		</a>
		<span className='btn bg-fb text-white'>Facebook</span>
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
				history.push(redirectUrl(this.props.location));
			})
			.catch((resp) => {
				console.log(resp, 'API Failure');
			});
	}

	fbAuthorize(data) {
		console.log('Google login', data);
		authorizeGoogle(data)
			.then((resp) => {
				console.log('Google Login Successfull', resp);
				this.props.loginUser(resp.data.user);
				localStorage.setItem('token', resp.data.jwt);
				history.push(redirectUrl(this.props.location));
			})
			.catch((resp) => {
				console.log(resp, 'API Failure');
			});
	}

	authorizeFailure(error) {
		console.log('Google login', data);
	}

	render() {
		return (
			<div className='row'>
				<div className='btn-group col-6'>
					<a className='btn btn-danger disabled'>
						<i className='icon-google' />
					</a>
					<a className='btn btn-danger' href={GOOGLE_AUTH_URL}>
						Google
					</a>
				</div>
				<GoogleAPI
					clientId='992913406489-fn9i74pm87a5iodelu298r1qh1fgl6vm.apps.googleusercontent.com'
					onUpdateSigninStatus={(f) => console.log('f', f)}
					onInitFailure={(data) => console.log('filed', data)}
				>
					<div>
						<div>
							<GoogleLogin
								onLoginSuccess={(data) => this.googleAuthorize(data)}
								onLoginFailure={(data) => failureAuthorize(data)}
								onRequest={(data) => console.log('request', data)}
							/>
						</div>
						<div>
							<GoogleLogout onLogoutSuccess={(data) => console.log('logout', data)} />
						</div>
					</div>
				</GoogleAPI>

				<FacebookAuth
					appId='861581940937199'
					callback={(data) => this.fbAuthorize(data)}
					component={FacebookButton}
					onFailure={(data) => failureAuthorize(data)}
				/>
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
