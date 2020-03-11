import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserDetails} from '../api/userApi';
import {loginUser} from '../redux/actions/sessions';

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
					console.log(error);
				});
		}
	}

	render() {
		const {component: Component, currentUser, location, ...rest} = this.props;
		const isLoggedIn = localStorage.token !== undefined;
		return (
			<Route
				{...rest}
				render={(props) =>
					isLoggedIn ? (
						<Component {...props} />
					) : (
						<Redirect to={{pathname: '/login', state: {from: location}}} />
					)}
			/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
