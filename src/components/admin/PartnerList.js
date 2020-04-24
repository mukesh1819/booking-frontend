import React, {component, Component} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPartners} from '../../api/partnerApi';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class PartnerList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partners: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPartners();
	}

	fetchPartners() {
		getPartners()
			.then((response) => {
				// console.log('response', response.data);
				this.setState({
					partners: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' partner fetch error', error);
			});
	}

	render() {
		const {partners} = this.state;
		return (
			<div className='container p-4'>
				<div className=''>
					<h3 className='title'>Partners</h3>
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
							{partners.map((partner) => {
								return (
									<tr>
										<td>
											{partner.first_name}&nbsp;
											{partner.last_name}
										</td>
										<td>{partner.email} </td>
										<td>{partner.company_name}</td>
										<td>{partner.contact_number}</td>

										<td>
											<Link
												to={{
													pathname: `/admin/partner/${partner.idx}`,
													state: {
														partner: partner
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='btn bg-none text-primary'>view</span>
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
export default PartnerList;
