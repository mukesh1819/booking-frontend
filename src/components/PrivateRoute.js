import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserDetails} from '../api/userApi';
import {loginUser} from '../redux/actions';
import swal from 'sweetalert';

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (localStorage.token !== undefined && this.props.currentUser.email == undefined) {
			getUserDetails()
				.then((response) => {
					this.props.loginUser(response.data.user);
				})
				.catch((error) => {
					// console.log(error);
					debugger;
					swal({
						title: 'User fetch error',
						text: 'Something went wrong could not fetch user data. please try again',
						icon: 'error',
						button: 'Continue!'
					});
				});
		}
	}

	render() {
		const {component: Component, currentUser, location, ...rest} = this.props;
		const isLoggedIn = localStorage.token !== undefined;

		if (!isLoggedIn) {
			return <Redirect to={{pathname: '/login', state: {from: location}}} />;
		}

		// if (['Admin', 'Support'].indexOf(currentUser.role) === -1) {
		// 	return <Redirect to={{pathname: '/'}} />;
		// }

		return <Route {...rest} render={(props) => <Component {...props} />} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
