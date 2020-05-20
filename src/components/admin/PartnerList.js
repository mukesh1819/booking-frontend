import React, {component, Component} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPartners} from '../../api/partnerApi';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import FilterForm from './FilterForm';
import {Segment, Card} from 'semantic-ui-react';
import {CustomMenu} from './Menu';

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

	onFilter = (values) => {
		this.setState({
			partners: values
		});
	};

	render() {
		const {partners} = this.state;
		const filterFields = [
			{
				name: 'created_at_gteq',
				label: 'From Date',
				type: 'date'
			},
			{
				name: 'created_at_lteq',
				label: 'To Date',
				type: 'date'
			},
			{
				name: 'first_name_or_last_name_cont',
				label: 'Name',
				type: 'text'
			},

			{
				name: 'email_cont',
				label: 'email',
				type: 'text'
			},

			{
				name: 'contact_number_cont',
				label: 'Mobile Number',
				type: 'text'
			}
		];

		return (
			<div className='ui container'>
				{/* <FilterForm submitUrl='partners' fields={filterFields} onSubmit={(values) => this.onFilter(values)} /> */}
				<CustomMenu
					submitUrl='partners'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						{
							label: 'Status',
							type: 'dropdown',
							name: 'status_eq',
							objects: [
								{
									label: 'Pending',
									value: 'pending'
								},
								{
									label: 'Verified',
									value: 'verified'
								},
								{
									label: 'Processing',
									value: 'processing'
								}
							]
						}
					]}
				/>
				<Segment>
					<Card fluid>
						<Card.Content>
							<h3 className='title'>Partners</h3>
							<table className='table table-striped table-hover table-sm' ref='main'>
								<thead>
									<tr>
										<th>S. No.</th>
										<th>Name</th>
										<th>Email</th>
										<th>Company Name</th>
										<th>Contact Number</th>
										<th>Created At</th>
										<th>Actions</th>
									</tr>
								</thead>

								<tbody>
									{partners.map((partner, index) => {
										return (
											<tr>
												<td>{index + 1}</td>
												<td>
													{partner.first_name}&nbsp;
													{partner.last_name}
												</td>
												<td>{partner.email} </td>
												<td>{partner.company_name}</td>
												<td>{partner.contact_number}</td>
												<td>{partner.created_at} </td>

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
						</Card.Content>
					</Card>
				</Segment>
			</div>
		);
	}
}
export default PartnerList;
