import React, {Component} from 'react';
import {getInquiries} from '../../api/inquiryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers/helpers';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class InquiryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inquiries: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchInquiries();
	}

	fetchInquiries() {
		getInquiries()
			.then((response) => {
				// console.log('inquiries', response.data);
				this.setState({
					inquiries: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Inquiry fetch error',
					text: 'could not able to fetch inquiry. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	render() {
		const {inquiries} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<h5>Inquiry List</h5>
					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>phone Number</th>
								<th>Date</th>
								<th>No of passenger</th>
								<th>Status</th>
								<th>Package Name</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{inquiries.map((inquiry) => {
								return (
									<tr>
										<td>{inquiry.name}</td>
										<td>{inquiry.email_address} </td>
										<td>{inquiry.phone}</td>
										<td>{inquiry.preferred_date}</td>
										<td>{inquiry.no_of_pax}</td>
										<td>{inquiry.status}</td>
										<td>{inquiry.package_id}</td>
										<td>
											<Link
												to={{
													pathname: '/admin/inquiry_details',
													state: {
														inquiry: inquiry
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='px-1'>view</span>
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
export default InquiryList;
