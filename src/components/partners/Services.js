import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';
import PartnerProfile from './PartnerProfile';
import {getPartnerServices} from '../../api/partnerServiceApi';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

class Services extends Component {
	constructor(props) {
		super(props);
		this.state = {
			services: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchDetails();
	}

	fetchDetails = () => {
		getPartnerServices(`q[partner_id_eq]=${this.props.partner.id}`)
			.then((response) => {
				this.setState({
					services: response.data
				});
			})
			.catch((error) => console.log(error));
	};

	render() {
		const {services} = this.state;
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						<div className='row'>
							<div className='col-12 col-md-8 offset-md-2'>
								<h3 className='title'>Services</h3>
								<div className='list-view'>
									{services.map((service) => (
										<div className='list'>
											<div className='label'>{service.name}</div>
											<div className='value'>{service.details}</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
