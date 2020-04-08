import React, {Component} from 'react';
import Profile from '../users/Profile';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import PartnerProfile from '../partners/PartnerProfile';
import {showPartner, confirmPartner} from '../../api/partnerApi';

class PartnerDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partner: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPartner();
	}

	fetchPartner = () => {
		showPartner(this.props.match.params.id).then((response) => {
			this.setState({
				partner: response.data
			});
		});
	};

	callPartnerConfirm(id) {
		confirmPartner(id)
			.then((response) => {
				swal({
					title: 'Partner Approval Request!',
					text: 'partnership request is approved and email sent to partners',
					icon: 'success',
					button: 'Continue!'
				});
			})
			.catch((error) => {
				swal({
					title: 'Sorry!',
					text: error.response.data.errors.toString(),
					icon: 'error',
					button: 'Try Again!'
				});
			});
	}

	render() {
		const {partner} = this.state;
		return (
			<div className='row text-center'>
				<PartnerProfile partner={this.props.location.state.partner} />

				<div className='col-12 p-4'>
					{partner.status === 'approved' && <span className='text-info'>Partner Created</span>}
					{partner.status === 'processing' && (
						<span className='btn btn-secondary' onClick={() => this.callPartnerConfirm(partner.id)}>
							Confirm
						</span>
					)}
				</div>
			</div>
		);
	}
}
export default PartnerDetails;
