import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Editable} from '../shared';
import {updateUserDetails} from '../../api/userApi';
import axios from 'axios';
import {passCsrfToken} from '../../helpers';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import {updateUser} from '../../redux/actions';
import {sortObjectBy} from '../../helpers';

class UserDetailCard extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		passCsrfToken(document, axios);
	}

	render() {
		const {user, countries} = this.props;
		const sortedCountries = sortObjectBy(countries, 'value');

		return <div />;
	}
}
const mapStateToProps = ({userStore, extras}) => ({
	user: userStore.currentUser,
	countries: extras.countries
});

const mapDispatchToProps = {
	updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailCard);
