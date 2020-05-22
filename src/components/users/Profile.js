import React, {Component} from 'react';
import {getUserDetails} from '../../api/userApi';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {passCsrfToken} from '../../helpers';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL} from '../../constants';
import UserDetailCard from './UserDetailCard';
import SocialButtonLinks from './SocialButtonLinks';
import swal from 'sweetalert';
import {Editable} from '../shared';
import {updateUserDetails, resendConfirmationCode} from '../../api/userApi';
import {Message, Button, Segment} from 'semantic-ui-react';
import ChangePasswordForm from './ChangePasswordForm';
import ModalExample from '../shared/Modal';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updating: false,
			loading: false,
			codeStatus: null,
			changePassword: false
		};
	}

	componentDidMount() {}

	togglePasswordModal = () => {
		this.setState((prevState) => ({
			changePassword: !prevState.changePassword
		}));
	};

	update(id, details) {
		this.setState({
			updating: true
		});
		updateUserDetails(id, details)
			.then((response) => {
				// console.log('details', response.data);
				swal({
					title: 'User Updated!',
					text: 'User updated successfully',
					icon: 'success',
					button: 'Continue!'
				}).then(function() {
					location.reload();
				});
				this.fetchDetails();
				this.setState({
					updating: false
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' user update error', error);
			});
	}

	render() {
		const {currentUser, countries = []} = this.props;
		var userCountry = countries.find((country) => country.value == currentUser.country);
		const {loading, codeStatus, changePassword, updating} = this.state;
		return (
			<Segment loading={currentUser.id == undefined || updating}>
				<div className='user-profile'>
					<div className='row'>
						<div className='col-12 p-0 list-view'>
							<Editable
								edit={!updating}
								label='Name'
								value={currentUser.name}
								onSubmit={(value) => this.update(currentUser.id, {name: value})}
							/>
							<Editable
								label='Email'
								value={currentUser.email}
								onSubmit={(value) => this.update(currentUser.id, {email: value})}
							/>

							{/* <Editable
						edit={!updating}
						label='code'
						value={currentUser.code}
						name='code'
						type='select'
						options={sortedCountries.map((country) => {
							return {
								key: country.id,
								flag: country.country_char.toLowerCase(),
								value: country.country_code,
								text: country.country_code
							};
						})}
						onSubmit={(value) => this.update({id: currentUser.id, code: value})}
					/> */}

							<Editable
								edit={!updating}
								label='Contact No'
								value={currentUser.phone_number}
								onSubmit={(value) => this.update(currentUser.id, {phone_number: value})}
							/>
							{/* <Editable
						edit={!updating}
						label='Currency'
						value={currentUser.currency}
						name='currency'
						type='select'
						options={sortedCountries
							.filter((country) => {
								return country.currency_char !== null;
							})
							.map((country) => {
								if (country.currency_char !== null) {
									return {
										...country,
										value: country.currency,
										text: country.currency
									};
								}
							})}
						onSubmit={(value) => this.update({id: currentUser.id, currency: value})}
					/> */}
							<Editable
								edit={!updating}
								label='Nationality'
								name='nationality'
								value={userCountry ? userCountry.text : ''}
								type='select'
								options={countries}
								onSubmit={(value) => this.update(currentUser.id, {country: value})}
							/>

							<div className='editable'>
								<div className='list'>
									<div className='label'>Password</div>
									<div className='value'>
										<span className='btn btn-primary mr-4' onClick={this.togglePasswordModal}>
											Change
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{!currentUser.verified && (
						<div className='row'>
							<div className='col-12 text-center'>
								<Message negative>
									<Message.Header>
										{!codeStatus && <div>Your Email has not been verified yet</div>}
										{codeStatus && <div>Confirmation token sent !!!</div>}
									</Message.Header>
									<p>Please check your mail to verify your account</p>
									<Button
										primary
										loading={loading}
										className='text-center'
										onClick={() => {
											this.setState({
												loading: true
											});
											resendConfirmationCode(currentUser.id).then((response) => {
												this.setState({
													loading: false,
													codeStatus: 'Code Sent'
												});
											});
										}}
									>
										Resend Code
									</Button>
								</Message>
							</div>
						</div>
					)}
					{/* <SocialButtonLinks /> */}
					<ModalExample
						title='Change Password'
						buttonLabel='Change'
						show={changePassword}
						toggle={this.togglePasswordModal}
						onSuccess={(value) => this.update(currentUser.id, value)}
					>
						{changePassword && (
							<ChangePasswordForm
								onChange={(value) => {
									this.update(currentUser.id, value);
									this.togglePasswordModal();
								}}
							/>
						)}
					</ModalExample>
				</div>
			</Segment>
		);
	}
}

const mapStateToProps = ({userStore, extras}) => ({
	currentUser: userStore.currentUser,
	countries: extras.countries
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
