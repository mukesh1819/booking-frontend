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
		// this.fetchPackages();
		this.fetchPartner();
	}

	// fetchPackages() {
	// 	getPackages(`q[partner_id_eq]=${this.props.location.state.partner.id}`)
	// 		.then((response) => {
	// 			// console.log(response.data);
	// 			this.setState({
	// 				packages: response.data
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			swal({
	// 				title: 'Package fetch Error!',
	// 				text: 'could not able to fetch package.. please try again or contact us',
	// 				icon: 'error',
	// 				button: 'Try Again!'
	// 			});
	// 		});
	// }

	fetchPartner(){
		showPartner(this.props.match.params.id)
		.then((response) => {
			this.setState({
				partner: response.data
			})
		})
	}

	callPartnerConfirm(id){
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
				text: 'Partner request failure. could not able to create partner.please try again or contact us',
				icon: 'error',
				button: 'Try Again!'
			});
		})
	}

	render() {
		var partner = {}
		if(this.props.location.state){
			 partner = this.props.location.state.partner;
		}
		else{
			partner = this.state.partner;
		}
		
		// const {packages} = this.state;
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
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>{partner.first_name} {partner.last_name}</td>
								<td>{partner.email} </td>
								<td>{partner.company_name}</td>
								<td>{partner.contact_number}</td>
								<td><span className="btn btn-primary" onClick={() => this.callPartnerConfirm(partner.id)}>Confirm</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				{/* <div>
					<h5 className='m-3'>Packages</h5>
					{packages.map((aPackage) => {
						return <Package aPackage={aPackage} />;
					})}
				</div> */}
			</div>
		);
	}
}

export default PartnerProfile;
