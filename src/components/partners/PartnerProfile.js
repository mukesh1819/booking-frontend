import React, {Component} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPackages} from '../../api/packageApi';
import {Package} from '../packages';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

class PartnerProfile extends Component {
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

	fetchPartner() {
		showPartner(this.props.match.params.id).then((response) => {
			this.setState({
				partner: response.data
			});
		});
	}

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
		var partner = {};
		if (this.props.location.state) {
			partner = this.props.location.state.partner;
		} else {
			partner = this.state.partner;
		}
		return (
			<div className='container'>
				<div className=''>
					<h5>Parnter</h5>
					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Company Name</th>
								<th>Contact Number</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>
									{partner.first_name} {partner.last_name}
								</td>
								<td>{partner.email} </td>
								<td>{partner.company_name}</td>
								<td>{partner.contact_number}</td>
								<td>{partner.status}</td>
								{partner.status === 'approved' && (
									<td>
										<span className='text-info'>Partner Created</span>
									</td>
								)}
								{partner.status === 'processing' && (
									<td>
										<span
											className='btn btn-primary'
											onClick={() => this.callPartnerConfirm(partner.id)}
										>
											Confirm
										</span>
									</td>
								)}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default PartnerProfile;
