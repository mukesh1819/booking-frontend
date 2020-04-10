import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';
import PartnerProfile from './PartnerProfile';
import Services from './Services';

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
	}

	componentDidUpdate(prevProps, prevState) { 
		if(this.props.currentUser.email != null  && prevState.partner.id == null){
			this.fetchPartner();
		}
	 } 

	fetchPartner = () => {
		showPartner(this.props.currentUser.partner.id)
		.then((response) => {
			this.setState({
				partner: response.data
			});
		})
		.catch((error) => console.log(error));
	};

	render() {
		const {partner} = this.state;
		const {user} = this.props.currentUser;
		return (
			<div>
				<div>
					<PartnerProfile partner={partner} />
				</div>
				<div className='my-3'>
					<Services partner={partner} />
				</div>
			</div>
		);
		
	}
}

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
