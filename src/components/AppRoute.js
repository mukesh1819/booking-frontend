import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserDetails} from '../api/userApi';
import {loginUser} from '../redux/actions';
import swal from 'sweetalert';
import {ContentWrapper} from './content';

class AppRoute extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {component: Component, layout: Layout, ...rest} = this.props;
		return (
			<Route
				{...rest}
				render={(props) => (
					<Layout>
						<ContentWrapper {...props} component={Component} />
					</Layout>
				)}
			/>
		);
	}
}

export default AppRoute;
