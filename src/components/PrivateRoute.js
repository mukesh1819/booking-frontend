import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserDetails} from '../api/userApi';
import {loginUser} from '../redux/actions';
import swal from 'sweetalert';
import {Footer} from './shared';

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

					console.log(' user fetch error', error);
				});
		}
	}

	render() {
		const {component: Component, layout: Layout, currentUser, location, footer, ...rest} = this.props;
		const isLoggedIn = localStorage.token !== undefined;

		if (!isLoggedIn) {
			return <Redirect to={{pathname: '/login', state: {from: location}}} />;
		}

		return (
			<Route
				{...rest}
				render={(props) => (
					<Layout>
						<Component {...props} />
						{footer && <Footer />}
					</Layout>
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
