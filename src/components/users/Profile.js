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
import {Message, Button} from 'semantic-ui-react';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updated: false,
			loading: false,
			codeStatus: null
		};
	}

	componentDidMount() {}

	update(id, details) {
		this.setState({
			updated: false
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
					updated: true
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' user update error', error);
			});
	}

	render() {
		const {currentUser, updated, countries} = this.props;
		const {loading, codeStatus} = this.state;
		return (
			<div className='user-profile'>
				<div className='row'>
					<div className='col-12 p-0 list-view'>
						<Editable
							edit={updated}
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
						edit={updated}
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
							edit={updated}
							label='Contact No'
							value={`${currentUser.code == null ? '' : currentUser.code} ${currentUser.phone_number}`}
							onSubmit={(value) => this.update(currentUser.id, {phone_number: value})}
						/>
						{/* <Editable
						edit={updated}
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
							edit={updated}
							label='Nationality'
							name='nationality'
							value={currentUser.country}
							type='select'
							options={countries}
							onSubmit={(value) => this.update(currentUser.id, {country: value})}
						/>
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
			</div>
		);
	}
}

const mapStateToProps = ({userStore, extras}) => ({
	currentUser: userStore.currentUser,
	countries: extras.countries
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
