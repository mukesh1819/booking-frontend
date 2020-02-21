import React, { Component } from 'react';
import { getUserDetails } from '../../api/userApi';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { passCsrfToken } from '../../utils/helpers';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../constants';


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
					<div className='row'>
						<div className='col-md-6'>
							<p>
								<small>Name - </small>
								{this.state.userDetails.name}
							</p>
						</div>
						<div className='col-md-6 d-flex justify-content-end'>
							<Link to={{
								  pathname: '/users/edit',
								  state: {
								    user: this.state.userDetails
								  }
								}}> Edit </Link>                                               
						</div>
					</div>

					<p>
						<small>Email - </small>
						{this.state.userDetails.email}
					</p>
					<p>
						<small>Mobile No - </small>
						{this.state.userDetails.phone_number}
					</p>
					<div>
						<div>Link your account with:</div>
						<div className='d-inline'>
							<div className='btn-group'>
								<a className='btn btn-danger disabled'>
									<i className='icon-google text-white' />
								</a>
								<a className='btn btn-danger text-white ' href={GOOGLE_AUTH_URL}>
									Google
								</a>
							</div>
							<div className='btn-group'>
								<a className='btn bg-fb disabled'>
									<i className='icon-facebook text-white' />
								</a>
								<a className='btn bg-fb text-white ' href={FACEBOOK_AUTH_URL}>
									Facebook
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default Profile;