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

class Profile extends Component {
	constructor(props) {
		super(props);
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
					text: 'Something went wrong could not fetch user data. please try again',
					icon: 'error',
					button: 'Continue!'
				});
			});
	};

	render() {
		const {currentUser} = this.props;
		return (
			<div className='user-profile'>
				<UserDetailCard user={currentUser} />
				{/* <SocialButtonLinks /> */}
			</div>
		);
	}
}

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
