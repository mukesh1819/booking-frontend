import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';
import PartnerProfile from './PartnerProfile';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partner: {}
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPartner();
	}

	fetchPartner = () => {
		showPartner(1).then((response) => {
			this.setState({
				partner: response.data
			});
		});
	};

	render() {
		const {partner} = this.state;
		return <PartnerProfile partner={partner} />;
	}
}

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
