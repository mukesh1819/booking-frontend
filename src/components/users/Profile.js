import React, { Component } from 'react';
import { getUserDetails } from '../../api/userApi';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { passCsrfToken } from '../../utils/helpers';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../constants';
import UserDetailCard from './UserDetailCard';
import SocialButtonLinks from './SocialButtonLinks';


class Profile extends Component {
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
        return (
            <div className='card'>
				<div className='card-body'>
					<UserDetailCard user = {this.state.userDetails}></UserDetailCard>
					<SocialButtonLinks></SocialButtonLinks>
				</div>
			</div>
        );
    }
}

export default Profile;