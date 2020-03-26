import React, {Component} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers/helpers';
import {getPackages} from '../../api/packageApi';
import Package from '../packages/Package';
import swal from 'sweetalert';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

class PartnerProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			packages: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPackages();
	}

	fetchPackages() {
		getPackages(`q[partner_id_eq]=${this.props.location.state.partner.id}`).then((response) => {
			// console.log(response.data);
			this.setState({
				packages: response.data
			});
		})
		.catch((error) => {
			swal({
				title: 'Package fetch Error!',
				text: 'could not able to fetch package.. please try again or contact us',
				icon: 'error',
				button: 'Try Again!'
			});
		})
	}

	render() {
		const {partner} = this.props.location.state;
		const {packages} = this.state;
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
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>{partner.name}</td>
								<td>{partner.email} </td>
								<td>{partner.company_name}</td>
								<td>{partner.contact_number}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div>
					<h5 className='m-3'>Packages</h5>
					{packages.map((aPackage) => {
						return <Package aPackage={aPackage} />;
					})}
				</div>
			</div>
		);
	}
}

export default PartnerProfile;
